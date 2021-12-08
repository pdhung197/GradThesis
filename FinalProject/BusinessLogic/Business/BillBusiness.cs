using BusinessLogic.Contract;
using BusinessLogic.Dtos.Bill;
using BusinessLogic.Utils;
using DataModels;
using DataModels.Entities;
using DataModels.Enums;
using DataModels.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Business
{
    public class BillBusiness : GenericBusiness<Bill>, IBillBusiness
    {
        public BillBusiness(DataContext context) : base(context)
        {
        }

        public override async Task<TO> GetById<TO>(int id)
        {
            var bill = await Entries.Include(b => b.Customer).Include(b => b.Promotion).Include(b => b.Booking).Include(b => b.Table).Include(b => b.Orders).ThenInclude(o => o.Dish).Include(b => b.Orders).ThenInclude(o => o.Promotion)
                .FirstOrDefaultAsync(b => b.Id == id)
                ?? throw new BadRequestException("Không tìm thấy hóa đơn này trong cơ sở dữ liệu.");
            
            return bill.ConvertTo<TO>();
        }

        public async Task<BillResponse> GetByTableId(int tableId)
        {
            var bill = await Entries.Include(b => b.Customer).Include(b => b.Promotion).Include(b => b.Booking).Include(b => b.Table).Include(b => b.Orders).ThenInclude(o => o.Dish).Include(b => b.Orders).ThenInclude(o => o.Promotion)
                    .FirstOrDefaultAsync(b => b.TableId == tableId && b.Completed == false);

            if (bill == null)
            {
                return null;
            }

            var total = bill.Total;

            var promotion = await Context.Promotions.FirstOrDefaultAsync(p =>
                p.StartTime.Date <= DateTime.Now.Date &&
                p.EndTime.Date >= DateTime.Now.Date &&
                p.PromotionType == PromotionType.BillPromo &&
                p.BillCondition != null && p.BillCondition <= total &&
                p.Confirmed == true);

            if (promotion != null && bill.PromotionId == null)
            {
                bill.PromotionId = promotion.Id;
                bill.Promotion = promotion;
                if (promotion.DiscountType == DiscountType.Amount)
                { 
                    total -= promotion.DiscountAmount;
                }
                else if (promotion.DiscountType == DiscountType.Percent)
                {
                    total = total - (total * promotion.DiscountAmount / 100);
                }
            }

            bill.Total = total;

            await Context.SaveChangesAsync();

            return bill.ConvertTo<BillResponse>();
        }

        public async Task<BillResponse> CreateBill(BillCreate billCreate)
        {
            if (await Entries.AnyAsync(b => b.TableId == billCreate.TableId && b.Completed == false))
            {
                throw new BadRequestException("Bàn này hiện đang có hóa đơn khác chưa hoàn thành");
            }

            var table = await Context.Tables.FindAsync(billCreate.TableId)
                ?? throw new BadRequestException("Không tìm thấy bàn này trong cơ sở dữ liệu");
            table.Status = TableStatus.Seated;

            var bill = billCreate.ConvertTo<Bill>();

            var createdBill = await Create<Bill>(bill);

            foreach (var order in billCreate.Orders)
            {
                var entry = order.ConvertTo<Order>();
                entry.BillId = createdBill.Id;

                var promotion = await Context.DishPromotions.Include(dp => dp.Promotion).Include(dp => dp.Dish)
                    .FirstOrDefaultAsync(dp => dp.DishId == entry.DishId && dp.Promotion.StartTime.Date <= DateTime.Now.Date && dp.Promotion.EndTime.Date >= DateTime.Now.Date && dp.Promotion.Confirmed == true);
                if (promotion != null)
                {
                    entry.PromotionId = promotion.PromotionId;
                    entry.Total = CalculateTotal(entry, promotion.Dish, promotion.Promotion);
                }
                else
                {
                    var price = (await Context.Dishes.FindAsync(entry.DishId)
                                    ?? throw new BadRequestException("Không tìm thấy món ăn này trong cơ sở dữ liệu")).Price;
                    entry.Total = entry.Amount * price;
                }

                AddEntry(entry);

                createdBill.Total += entry.Total;
                UpdateEntry(bill, createdBill);
            }

            await Context.SaveChangesAsync();

            return createdBill.ConvertTo<BillResponse>();
        }

        public async Task AddOrders(int tableId, List<OrderCreate> orders)
        {
            var bill = await Entries.Include(b => b.Orders).ThenInclude(o => o.Promotion).Include(b => b.Orders).ThenInclude(o => o.Dish)
                .FirstOrDefaultAsync(b => b.TableId == tableId && b.Completed == false)
                ?? throw new BadRequestException("Không tìm thấy hóa đơn này trong cơ sở dữ liệu");

            foreach (var order in orders)
            {
                var existingOrder = bill.Orders.FirstOrDefault(o => o.DishId == order.DishId);

                if (existingOrder != null)
                {
                    bill.Total -= existingOrder.Total;

                    existingOrder.Amount += order.Amount;
                    existingOrder.Total = CalculateTotal(existingOrder, existingOrder.Dish, existingOrder.Promotion);

                    bill.Total += existingOrder.Total;
                }
                else
                {
                    var promotion = await Context.DishPromotions.Include(dp => dp.Promotion).Include(dp => dp.Dish)
                        .FirstOrDefaultAsync(dp => dp.DishId == order.DishId && dp.Promotion.StartTime.Date <= DateTime.Now.Date && dp.Promotion.EndTime.Date >= DateTime.Now.Date && dp.Promotion.Confirmed == true);

                    var entry = new Order
                    {
                        DishId = order.DishId,
                        BillId = bill.Id,
                        Amount = order.Amount
                    };

                    if (promotion != null)
                    {
                        entry.PromotionId = promotion.PromotionId;
                        entry.Total = CalculateTotal(entry, promotion.Dish, promotion.Promotion);
                    }
                    else
                    {
                        var price = (await Context.Dishes.FindAsync(entry.DishId)
                                        ?? throw new BadRequestException("Không tìm thấy món ăn này trong cơ sở dữ liệu")).Price;
                        entry.Total = entry.Amount * price;
                    }

                    bill.Total += entry.Total;

                    AddEntry(entry);
                }

            }

            await Context.SaveChangesAsync();
        }

        public async Task AddCustomer(int id, int customerId)
        {
            var bill = await Entries.FindAsync(id)
                ?? throw new BadRequestException("Không tìm thấy hóa đơn này trong cơ sở dữ liệu");
            bill.CustomerId = customerId;

            var promotion = await Context.Promotions.Include(p => p.Customers).FirstOrDefaultAsync(p =>
                p.StartTime.Date <= DateTime.Now.Date &&
                p.EndTime.Date >= DateTime.Now.Date &&
                p.PromotionType == PromotionType.CustomerPromo &&
                p.Customers.Any(pc => pc.CustomerId == customerId) &&
                p.Confirmed == true);

            if (promotion != null)
            {
                bill.PromotionId = promotion.Id;
                bill.Promotion = promotion;
                if (promotion.DiscountType == DiscountType.Amount)
                {
                    bill.Total -= promotion.DiscountAmount;
                }
                else if (promotion.DiscountType == DiscountType.Percent)
                {
                    bill.Total -= (bill.Total * promotion.DiscountAmount / 100);
                }
            }

            await Context.SaveChangesAsync();
        }

        public async Task CheckoutBill(int tableId)
        {
            var bill = await Entries.FirstOrDefaultAsync(b => b.TableId == tableId && b.Completed == false)
                ?? throw new BadRequestException("Không tìm thấy hóa đơn này trong cơ sở dữ liệu");

            bill.Completed = true;
            bill.DateTime = DateTime.Now;

            var table = await Context.Tables.FindAsync(bill.TableId)
                ?? throw new BadRequestException("Không tìm thấy bàn này trong cơ sở dữ liệu");
            table.Status = TableStatus.Available;

            await Context.SaveChangesAsync();
        }

        public override async Task Delete(int id)
        {
            var bill = await Entries.FindAsync(id)
                ?? throw new BadRequestException("Không tìm thấy hóa đơn này trong cơ sở dữ liệu");
            if (bill.Completed == false)
            {
                throw new BadRequestException("Hóa đơn này chưa được thanh toán");
            }

            await Delete(bill);
        }

        private long CalculateTotal(Order order, Dish dish, Promotion promotion)
        {
            if (promotion != null)
            {
                if (promotion.DiscountType == DiscountType.Amount)
                {
                    return order.Amount * (dish.Price - promotion.DiscountAmount);
                }
                else
                {
                    return order.Amount * (dish.Price - dish.Price * promotion.DiscountAmount / 100);
                }
            }
            else
            {
                return order.Amount * dish.Price;
            }
        }
    }
}
