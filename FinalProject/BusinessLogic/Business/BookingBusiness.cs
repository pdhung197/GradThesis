using BusinessLogic.Contract;
using BusinessLogic.Dtos.Bill;
using BusinessLogic.Dtos.Booking;
using BusinessLogic.Dtos.Table;
using BusinessLogic.Handlers;
using BusinessLogic.Mail;
using BusinessLogic.Utils;
using DataModels;
using DataModels.Base;
using DataModels.Entities;
using DataModels.Enums;
using DataModels.Exceptions;
using DataModels.Params;
using Microsoft.EntityFrameworkCore;
using Refit;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Business
{
    public class BookingBusiness : GenericBusiness<Booking>, IBookingBusiness
    {
        private readonly IMailService mailService;
        private readonly IIdentityProvider provider;

        public BookingBusiness(DataContext context, IMailService mailService, IIdentityProvider provider) : base(context)
        {
            this.mailService = mailService;
            this.provider = provider;
        }

        public async Task<PagedList<Booking>> SearchBookings(SearchBookingParams searchParams)
        {
            var entries = Entries.Include(b => b.Orders).ThenInclude(o => o.Dish)
                .Where(b => b.Deleted != true && b.ForWedding != true)
                .OrderBy(b => b.Status).ThenByDescending(b => b.BookingTime)
                .AsQueryable();

            if (!string.IsNullOrEmpty(searchParams.Name))
            {
                entries = entries.Where(b => b.CustomerName.ToLower().Contains(searchParams.Name.ToLower())
                                            || b.Phone.StartsWith(searchParams.Name));
            }

            if (searchParams.Date != null)
            {
                var date = DateTime.ParseExact(searchParams.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                entries = entries.Where(r => r.BookingTime.Date == date.Date);
            }

            return await PagedList<Booking>.Create(entries, searchParams.PageNumber, searchParams.PageSize);
        }

        public async Task<PagedList<Booking>> SearchWeddingBookings(SearchBookingParams searchParams)
        {
            var entries = Entries.Include(b => b.Orders).ThenInclude(o => o.Dish)
                .Where(b => b.Deleted != true && b.ForWedding == true)
                .OrderBy(b => b.Status).ThenByDescending(b => b.BookingTime)
                .AsQueryable();

            if (!string.IsNullOrEmpty(searchParams.Name))
            {
                entries = entries.Where(b => b.CustomerName.ToLower().Contains(searchParams.Name.ToLower())
                                            || b.Phone.StartsWith(searchParams.Name));
            }

            if (searchParams.Date != null)
            {
                var date = DateTime.ParseExact(searchParams.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                entries = entries.Where(r => r.BookingTime.Date == date.Date);
            }

            return await PagedList<Booking>.Create(entries, searchParams.PageNumber, searchParams.PageSize);
        }

        public async Task<Booking> GetByTableId(int tableId)
        {
            var booking = await Entries.Include(b => b.Orders).ThenInclude(o => o.Dish)
                .FirstOrDefaultAsync(b => b.TableId == tableId && b.Status == BookingStatus.NotArrived);

            return booking;
        }

        public async Task<List<TableForBooking>> GetTablesForBooking(int bookingId)
        {
            var booking = await Entries.FindAsync(bookingId)
                ?? throw new BadRequestException("Lịch đặt bàn này không tồn tại trong cơ sở dữ liệu");

            var tables = (await Context.Tables.ToListAsync()).ConvertTo<List<TableForBooking>>();

            foreach (var t in tables)
            {
                if (Entries.AsEnumerable()
                    .Any((b => b.TableId == t.Id && Math.Abs((b.BookingTime - booking.BookingTime).TotalHours) < 8d )))
                {
                    t.CanBook = false;
                }
                else
                {
                    t.CanBook = true;
                }

                if (booking.TableId == t.Id)
                {
                    t.CanBook = true;
                }

                if (Math.Abs((booking.BookingTime - DateTime.Now).TotalHours) < 8d && t.Status != TableStatus.Available)
                {
                    t.CanBook = false;
                }
            }

            return tables;
        }

        public async Task<Booking> CreateBooking(BookingCreate booking)
        {
            if (booking.ForWedding == true && booking.BookingTime <= DateTime.Now && Math.Abs((DateTime.Now - booking.BookingTime).TotalDays) < 20d)
            {
                throw new BadRequestException("Thời gian đặt tiệc cưới phải lớn hơn thời gian hiện tại ít nhất 20 ngày");
            }

            if (booking.BookingTime <= DateTime.Now && Math.Abs((DateTime.Now - booking.BookingTime).TotalHours) < 1d)
            {
                throw new BadRequestException("Thời gian đặt bàn phải lớn hơn thời gian hiện tại ít nhất 1 tiếng");
            }

            var createdBooking = await Create<Booking>(booking);

            if (provider.GetCurrentUser() == null)
            {
                await SendPushNotification();
            }

            if (!string.IsNullOrWhiteSpace(createdBooking.Email))
            {
                await mailService.Send(createdBooking.Email, "ConfirmBooking.html", new Dictionary<string, string>()
                {
                    { "name", createdBooking.CustomerName },
                    { "phone", createdBooking.Phone },
                    { "bookingTime", createdBooking.BookingTime.ToString("dd/MM/yyyy HH:mm") },
                    { "numberOfPeople", $"{createdBooking.NumberOfPeople}" },
                    { "note", createdBooking.Note }
                });
            }

            return createdBooking;
        }

        public override async Task<TO> Update<TO>(IdBase o)
        {
            var existing = await Entries.Include(b => b.Table).Include(b => b.Orders).FirstOrDefaultAsync(x => x.Id == o.Id)
                ?? throw new BadRequestException("Không tìm thấy lịch đặt bàn này trong cơ sở dữ liệu");

            var timeLeft = Math.Abs((DateTime.Now - existing.BookingTime).TotalHours);

            if (existing.BookingTime >= DateTime.Now && timeLeft > 8d
                && existing.Status == BookingStatus.Cancelled || existing.Status == BookingStatus.Finished)
            {
                throw new BadRequestException("Lịch đặt bàn này đã hoàn thành và không thể chỉnh sửa");
            }

            var updated = o.ConvertTo<Booking>();

            if (updated.TableId == 0)
            {
                updated.TableId = null;
            }    

            if (updated.TableId == null && existing.TableId != null)
            {
                updated.TableId = existing.TableId;
            }

            if (existing.Orders.Count > 0 && updated.Orders.Count == 0)
            {
                updated.Orders = existing.Orders;
            }

            UpdateEntry(existing, updated);

            if (existing.TableId != null && existing.TableId > 0)
            {
                var table = await Context.Tables.FindAsync(existing.TableId)
                ?? throw new BadRequestException("Bàn này không tồn tại trong cơ sở dữ liệu");

                if (existing.Status == BookingStatus.Cancelled && table.Status == TableStatus.Booked)
                {
                    table.Status = TableStatus.Available;
                }

                if (existing.Status == BookingStatus.Finished)
                {
                    if (existing.TableId == null)
                    {
                        throw new BadRequestException("Lịch đặt bàn này chưa được chọn bàn. Vui lòng chọn bàn cho lịch đặt bàn này");
                    }

                    table.Status = TableStatus.Seated;

                    await CreateBillOnBooking(existing);
                }
            }

            await Context.SaveChangesAsync();

            return existing.ConvertTo<TO>();
        }

        public async Task AssignTable(int bookingId, int tableId)
        {
            var booking = await Entries.Include(b => b.Table).FirstOrDefaultAsync(b => b.Id == bookingId)
                ?? throw new BadRequestException("Không tìm thấy lịch đặt bàn này trong cơ sở dữ liệu");

            if (booking.TableId != null)
            {
                if ((booking.Status != BookingStatus.Finished || booking.Status != BookingStatus.Cancelled) && Math.Abs((booking.BookingTime - DateTime.Now).TotalHours) < 8d)
                {
                    booking.Table.Status = TableStatus.Available;
                }
            }

            booking.TableId = tableId;

            await Context.SaveChangesAsync();
        }

        public async Task AddOrders(int bookingId, List<BookingOrderCreate> orders)
        {
            var existing = await Entries.FindAsync(bookingId)
                ?? throw new BadRequestException("Không tìm thấy lịch đặt bàn này trong cơ sở dữ liệu");

            foreach (var order in orders)
            {
                var entry = order.ConvertTo<BookingOrder>();
                entry.BookingId = existing.Id;
                AddEntry(entry);
            }

            await Context.SaveChangesAsync();
        }

        public async Task UpdateOrders(int bookingId, List<BookingOrderCreate> orders)
        {
            var existing = await Entries.Include(b => b.Orders).FirstOrDefaultAsync(b => b.Id == bookingId)
                ?? throw new BadRequestException("Không tìm thấy lịch đặt bàn này trong cơ sở dữ liệu");

            Context.UpdateManyToMany(existing.Orders, orders
                .Select(x => new BookingOrder
                {
                    BookingId = existing.Id,
                    DishId = x.DishId,
                    Amount = x.Amount
                }), x => x);

            await Context.SaveChangesAsync();
        }

        public async Task<List<BookingOrderCreate>> GetOrders(int bookingId)
        {
            var booking = await Entries.Include(b => b.Orders).ThenInclude(o => o.Dish).FirstOrDefaultAsync(b => b.Id == bookingId)
                ?? throw new BadRequestException("Không tìm thấy lịch đặt bàn này trong cơ sở dữ liệu");
            return booking.Orders.ConvertTo<List<BookingOrderCreate>>();
        }

        public override async Task Delete(int id)
        {
            var booking = await Entries.FindAsync(id)
                ?? throw new BadRequestException("Không tìm thấy lịch đặt bàn này trong cơ sở dữ liệu");

            if (booking.Status != BookingStatus.Cancelled && booking.Status != BookingStatus.Finished)
            {
                throw new BadRequestException("Lịch đặt bàn này chưa hoàn thành");
            }

            if (await Context.Bills.AnyAsync(b => b.BookingId == id))
            {
                throw new BadRequestException("Lịch đặt bàn này hiện đang có hóa đơn");
            }

            if (booking.Status == BookingStatus.Cancelled)
            {
                await HardDelete(booking);
                return;
            }

            await base.Delete(id);
        }

        private async Task CreateBillOnBooking(Booking booking)
        {
            if (await Context.Bills.AnyAsync(b => b.TableId == booking.TableId && b.Completed == false))
            {
                throw new BadRequestException("Bàn này hiện đang có hóa đơn khác chưa hoàn thành");
            }

            var bill = new Bill
            {
                TableId = booking.TableId,
                BookingId = booking.Id,
                DateTime = DateTime.Now,
                Total = 0L,
                Completed = false
            };

            AddEntry(bill);
            await Context.SaveChangesAsync();
            var createdBill = bill.ConvertTo<BillResponse>();

            foreach (var order in booking.Orders)
            {
                var entry = order.ConvertTo<Order>();
                entry.BillId = createdBill.Id;

                var promotion = await Context.DishPromotions.Include(dp => dp.Promotion).Include(dp => dp.Dish)
                    .FirstOrDefaultAsync(dp => dp.DishId == entry.DishId && dp.Promotion.StartTime.Date <= DateTime.Now.Date && dp.Promotion.EndTime.Date >= DateTime.Now.Date);
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

                bill.Total += entry.Total;
            }
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

        private async Task SendPushNotification()
        {
            var tokens = Context.PushNotifTokens.Select(t => t.Token).ToList();
            var pushNotif = new PushNotification
            {
                RegistrationIds = tokens,
                Notification = new Notification { Title = "Có đơn đặt bàn mới!", Body = "Vừa có một đơn đặt bàn mới trong hệ thống!" }
            };

            var client = RestService.For<IFirebaseService>("https://fcm.googleapis.com");
            await client.SendPushNotif(pushNotif);
        }
    }
}
