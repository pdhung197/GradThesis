using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels.Entities
{
    public class DishRecipe
    {
        public int DishId { get; set; }

        [ForeignKey(nameof(DishId))]
        public Dish Dish { get; set; }

        public int MaterialId { get; set; }

        [ForeignKey(nameof(MaterialId))]
        public Material Material { get; set; }

        public string Amount { get; set; }
    }
}
