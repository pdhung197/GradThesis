using BusinessLogic.Contract;
using BusinessLogic.Dtos.Attachment;
using BusinessLogic.Dtos.Dish;
using BusinessLogic.Utils;
using DataModels;
using DataModels.Base;
using DataModels.Entities;
using DataModels.Exceptions;
using DataModels.Params;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Business
{
    public class DishBusiness : GenericBusiness<Dish>, IDishBusiness
    {
        public DishBusiness(DataContext context) : base(context)
        {
        }

        public override async Task<List<TO>> GetAll<TO>()
        {
            var dishes = await Entries.Where(d => d.Deleted != true).Include(d => d.Category).ToListAsync();

            return dishes.ConvertTo<List<TO>>();
        }

        public async Task<PagedList<TO>> SearchByCategoryAndName<TO>(SearchDishParams searchParams)
        {
            var entries = Entries.Where(d => d.Deleted != true).OrderBy(d => d.CategoryId).ThenBy(d => d.Name).AsQueryable();

            if (searchParams.CategoryId != null)
            {
                entries = entries.Where(d => d.CategoryId == searchParams.CategoryId);
            }

            if (!string.IsNullOrWhiteSpace(searchParams.Name))
            {
                entries = entries.Where(d => d.Name.ToLower().StartsWith(searchParams.Name.ToLower()));
            }

            return (await PagedList<Dish>.Create(entries, searchParams.PageNumber, searchParams.PageSize))
                .ConvertTo<PagedList<TO>>();
        }

        public List<TO> GetAllByCategory<TO>(SearchDishParams searchParams)
        {
            var entries = Entries.Where(d => d.Deleted != true).OrderBy(d => d.CategoryId).ThenBy(d => d.Name).AsQueryable();
            if (searchParams.CategoryId != null && searchParams.CategoryId != 0)
            {
                entries = entries.Where(d => d.CategoryId == searchParams.CategoryId);
            }

            return entries.ConvertTo<List<TO>>();
        }

        public override async Task<TO> GetById<TO>(int id)
        {
            var dish = await Entries.Include(d => d.Recipes).ThenInclude(r => r.Material).FirstOrDefaultAsync(d => d.Id == id)
                ?? throw new BadRequestException("Không tìm thấy món ăn này trong cơ sở dữ liệu");

            return dish.ConvertTo<TO>();
        }

        public override async Task<TO> Update<TO>(IdBase o)
        {
            var existing = await Entries.FirstOrDefaultAsync(x => x.Id == o.Id)
                ?? throw new BadRequestException("Không tìm thấy đối tượng này trong cơ sở dữ liệu.");

            var updated = o.ConvertTo<Dish>();
            updated.AttachmentId = existing.AttachmentId;

            UpdateEntry(existing, updated);

            await Context.SaveChangesAsync();

            return existing.ConvertTo<TO>();
        }

        public async Task UpdateRecipe(int id, List<RecipeUpdate> recipes)
        {
            var existing = await Entries.Include(d => d.Recipes).FirstOrDefaultAsync(d => d.Id == id)
                ?? throw new BadRequestException("Không tìm thấy món ăn này trong cơ sở dữ liệu");

            Context.UpdateManyToMany(existing.Recipes, recipes
                .Select(x => new DishRecipe
                {
                    MaterialId = x.MaterialId,
                    DishId = existing.Id,
                    Amount = x.Amount
                }), x => x);

            await Context.SaveChangesAsync();            
        }

        public async Task UploadImage(int id, DishImageUpload image)
        {
            var dish = await Entries.Include(d => d.Attachment).FirstOrDefaultAsync(d => d.Id == id)
                ?? throw new BadRequestException("Không tìm thấy món ăn này trong cơ sở dữ liệu");

            DeleteImage(dish);

            var attachment = image.ConvertTo<Attachment>();

            await attachment.CreateFile(image.File, image.Folder);
            attachment.Dish = dish;

            AddEntry(attachment);

            await Context.SaveChangesAsync();
        }

        public override async Task Delete(int id)
        {
            var dish = await Entries.Include(d => d.Attachment).FirstOrDefaultAsync(d => d.Id == id)
                   ?? throw new BadRequestException("Không tìm thấy món ăn này trong cơ sở dữ liệu");
            
            DeleteImage(dish);

            await base.Delete(id);
        }

        private void DeleteImage(Dish dish)
        {
            var existingAttachment = dish.Attachment;

            if (existingAttachment != null)
            {
                AttachmentUtils.DeleteFile(existingAttachment.Name, existingAttachment.Folder);
                DeleteEntry(existingAttachment);
            }
        }
    }
}
