using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataModels.Entities
{
    public class CustomerPromotion
    {
        public int CustomerId { get; set; }

        [ForeignKey(nameof(CustomerId))]
        public Customer Customer { get; set; }

        public int PromotionId { get; set; }

        [ForeignKey(nameof(PromotionId))]
        [JsonIgnore]
        public Promotion Promotion { get; set; }
    }
}
