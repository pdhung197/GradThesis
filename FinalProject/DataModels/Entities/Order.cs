using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataModels.Entities
{
    public class Order
    {
        public int BillId { get; set; }

        [ForeignKey(nameof(BillId))]
        [JsonIgnore]
        public Bill Bill { get; set; }

        public int DishId { get; set; }

        [ForeignKey(nameof(DishId))]
        public Dish Dish { get; set; }

        public int Amount { get; set; }

        public int? PromotionId { get; set; }

        [ForeignKey(nameof(PromotionId))]
        public Promotion Promotion { get; set; }

        public long Total { get; set; } = 0L;
    }
}
