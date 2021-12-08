using DataModels.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels.Entities
{
    public class Bill : IdBase
    {
        public int? TableId { get; set; }

        [ForeignKey(nameof(TableId))]
        public Table Table { get; set; }

        public int? BookingId { get; set; }

        [ForeignKey(nameof(BookingId))]
        public Booking Booking { get; set; }

        public int? CustomerId { get; set; }

        [ForeignKey(nameof(CustomerId))]
        public Customer Customer { get; set; }

        public virtual List<Order> Orders { get; set; } = new List<Order>();

        public DateTime DateTime { get; set; }

        public long? Total { get; set; }

        public bool Completed { get; set; } = false;

        public int? PromotionId { get; set; }

        [ForeignKey(nameof(PromotionId))]
        public Promotion Promotion { get; set; }
    }
}
