using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataModels.Entities
{
    public class DishPromotion
    {
        public int DishId { get; set; }

        [ForeignKey(nameof(DishId))]
        public Dish Dish { get; set; }

        public int PromotionId { get; set; }

        [ForeignKey(nameof(PromotionId))]
        [JsonIgnore]
        public Promotion Promotion { get; set; }
    }
}
