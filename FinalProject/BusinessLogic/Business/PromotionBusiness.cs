using BusinessLogic.Contract;
using BusinessLogic.Dtos.Attachment;
using BusinessLogic.Dtos.Promotion;
using BusinessLogic.Handlers;
using BusinessLogic.Utils;
using DataModels;
using DataModels.Entities;
using DataModels.Enums;
using DataModels.Exceptions;
using DataModels.Params;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Business
{
    public class PromotionBusiness : GenericBusiness<Promotion>, IPromotionBusiness
    {
        private readonly IIdentityProvider provider;
        public PromotionBusiness(DataContext context, IIdentityProvider provider) : base(context)
        {
            this.provider = provider;
        }

        public override async Task<List<TO>> GetAll<TO>()
        {
            return (await Entries.Where(p => p.Confirmed == true && p.Deleted != true).ToListAsync()).OrderBy(p => Math.Abs((p.StartTime - DateTime.Now).TotalDays))
                .ConvertTo<List<TO>>();
        }

        public async Task<PagedList<TO>> SearchByDate<TO>(SearchDateParams dateParams)
        {
            var entries = Entries.Include(p => p.Attachment).Where(p => p.Deleted != true)
                .OrderByDescending(p => p.StartTime).ThenBy(p => p.EndTime)
                .AsQueryable();

            if (dateParams.Date != null)
            {
                var date = DateTime.ParseExact(dateParams.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                entries = entries.Where(p => p.StartTime.Date <= date.Date && p.EndTime.Date >= date.Date);
            }

            return (await PagedList<Promotion>.Create(entries, dateParams.PageNumber, dateParams.PageSize))
                .ConvertTo<PagedList<TO>>();
        }

        public override async Task<TO> GetById<TO>(int id)
        {
            return (await Entries.Include(p => p.Dishes).Include(p => p.Customers).FirstOrDefaultAsync(p => p.Id == id)
                ?? throw new BadRequestException("Không tìm thấy chương trình ưu đãi này trong cơ sở dữ liệu."))
                .ConvertTo<TO>();
        }

        public async Task<Promotion> CreatePromotion(PromotionCreate promotionCreate)
        {
            if (promotionCreate.StartTime.Date < DateTime.Now.Date || promotionCreate.StartTime.Date > promotionCreate.EndTime.Date)
            {
                throw new BadRequestException("Vui lòng chọn ngày bắt đầu lớn hơn thời điểm hiện tại và nhỏ hơn ngày kết thúc");
            }

            var promotion = promotionCreate.ConvertTo<Promotion>();

            var createdPromotion = await Create<Promotion>(promotion);

            if (createdPromotion.PromotionType == PromotionType.DishPromo)
            {
                createdPromotion.BillCondition = null;

                foreach (var dish in promotionCreate.Dishes)
                {
                    var entry = dish.ConvertTo<DishPromotion>();
                    entry.PromotionId = createdPromotion.Id;
                    AddEntry(entry);
                }
            }
            if (createdPromotion.PromotionType == PromotionType.CustomerPromo)
            {
                createdPromotion.BillCondition = null;

                foreach (var customer in promotionCreate.Customers)
                {
                    var entry = customer.ConvertTo<CustomerPromotion>();
                    entry.PromotionId = createdPromotion.Id;
                    AddEntry(entry);
                }
            }

            await Context.SaveChangesAsync();

            return createdPromotion;
        }

        public async Task<Promotion> UpdatePromotion(PromotionUpdate promotion)
        {
            var existing = await Entries.Include(p => p.Dishes).Include(p => p.Customers).FirstOrDefaultAsync(p => p.Id == promotion.Id)
                   ?? throw new BadRequestException("Không tìm thấy chương trình ưu đãi này trong cơ sở dữ liệu.");
            if (existing.Confirmed == true)
            {
                throw new BadRequestException("Không thể thay đổi chương trình ưu đãi sau khi đã xác nhận");
            }

            var updated = promotion.ConvertTo<Promotion>();

            if (updated.PromotionType != existing.PromotionType)
            {
                existing.BillCondition = null;
                if (existing.Dishes.Count > 0)
                {
                    Context.DishPromotions.RemoveRange(Context.DishPromotions.Where(x => x.PromotionId == promotion.Id));
                }
                if (existing.Customers.Count > 0)
                {
                    Context.CustomerPromotions.RemoveRange(Context.CustomerPromotions.Where(x => x.PromotionId == promotion.Id));
                }
            }

            UpdateEntry(existing, updated);

            if (updated.PromotionType == PromotionType.DishPromo)
            {
                Context.UpdateManyToMany(existing.Dishes, promotion.Dishes
                    .Select(x => new DishPromotion
                    {
                        DishId = x.DishId,
                        PromotionId = existing.Id
                    }), x => x);
            }

            if (updated.PromotionType == PromotionType.CustomerPromo)
            {
                Context.UpdateManyToMany(existing.Customers, promotion.Customers
                    .Select(x => new CustomerPromotion
                    {
                        CustomerId = x.CustomerId,
                        PromotionId = existing.Id
                    }), x => x);
            }

            await Context.SaveChangesAsync();

            return existing.ConvertTo<Promotion>();
        }

        public async Task UploadImage(int id, PromotionImageUpload image)
        {
            if (image.File == null)
            {
                return;
            }

            var promotion = await Entries.Include(p => p.Attachment).FirstOrDefaultAsync(p => p.Id == id)
                ?? throw new BadRequestException("Không tìm thấy chương trình ưu đãi này trong cơ sở dữ liệu");

            DeleteImage(promotion);

            var attachment = image.ConvertTo<Attachment>();

            await attachment.CreateFile(image.File, image.Folder);
            attachment.Promotion = promotion;

            AddEntry(attachment);

            await Context.SaveChangesAsync();
        }

        public async Task ConfirmPromotion(int id)
        {
            var promotion = await Entries.FindAsync(id)
                ?? throw new BadRequestException("Không tìm thấy ưu đãi này trong cơ sở dữ liệu");
            promotion.Confirmed = true;

            await Context.SaveChangesAsync();
        }

        public override async Task Delete(int id)
        {
            var role = provider.GetUserRole();

            var promotion = await Entries.Include(p => p.Attachment).FirstOrDefaultAsync(p => p.Id == id)
                   ?? throw new BadRequestException("Không tìm thấy ưu đãi này trong cơ sở dữ liệu");

            if (promotion.Confirmed == true && promotion.StartTime.Date >= DateTime.Now.Date && promotion.EndTime.Date <= DateTime.Now.Date)
            {
                throw new BadRequestException("Chương trình ưu đãi này chưa kết thúc");
            }

            if (promotion.Confirmed == true && role != Role.ADMIN)
            {
                throw new ForbiddenException("Bạn không có quyền xóa chương trình ưu đãi đã được duyệt và sử dụng");
            }

            //DeleteImage(promotion);

            await base.Delete(id);
        }

        private void DeleteImage(Promotion promotion)
        {
            var existingAttachment = promotion.Attachment;

            if (existingAttachment != null)
            {
                AttachmentUtils.DeleteFile(existingAttachment.Name, existingAttachment.Folder);
                DeleteEntry(existingAttachment);
            }
        }
    }
}
