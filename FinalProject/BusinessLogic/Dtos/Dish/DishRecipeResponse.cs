using System.Collections.Generic;

namespace BusinessLogic.Dtos.Dish
{
    public class DishRecipeResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<RecipeResponse> Recipes { get; set; }

        public int? AttachmentId { get; set; }
    }

    public class RecipeResponse
    {
        public int MaterialId { get; set; }

        public DataModels.Entities.Material Material { get; set; }

        public string Amount { get; set; }
    }
}
