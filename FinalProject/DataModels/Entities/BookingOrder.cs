using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataModels.Entities
{
    public class BookingOrder
    {
        public int BookingId { get; set; }

        [ForeignKey(nameof(BookingId))]
        [JsonIgnore]
        public Booking Booking { get; set; }

        public int DishId { get; set; }

        [ForeignKey(nameof(DishId))]
        public Dish Dish { get; set; }

        public int Amount { get; set; }
    }
}
