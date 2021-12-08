using BusinessLogic.Dtos.Attachment;
using BusinessLogic.Dtos.Dish;
using BusinessLogic.Utils;
using DataModels.Entities;
using DataModels.Params;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Contract
{
    public interface IDishBusiness : IGenericBusiness<Dish>
    {
        Task<PagedList<TO>> SearchByCategoryAndName<TO>(SearchDishParams searchParams);

        List<TO> GetAllByCategory<TO>(SearchDishParams searchParams);

        Task UpdateRecipe(int id, List<RecipeUpdate> recipes);

        Task UploadImage(int id, DishImageUpload image);
    }
}
