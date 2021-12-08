using DataModels.Base;
using DataModels.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels.Entities
{
    public class Booking : IdBase
    {
        public string CustomerName { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public DateTime BookingTime { get; set; }

        public int NumberOfPeople { get; set; }

        public long? Deposit { get; set; }

        public BookingStatus Status { get; set; }

        public string Note { get; set; }

        public virtual List<BookingOrder> Orders { get; set; } = new List<BookingOrder>();

        public int? TableId { get; set; }

        [ForeignKey(nameof(TableId))]
        public Table Table { get; set; }

        public bool ForWedding { get; set; } = false;
    }
}
