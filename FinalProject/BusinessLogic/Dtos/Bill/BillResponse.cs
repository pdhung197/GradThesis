using DataModels.Entities;
using System;
using System.Collections.Generic;

namespace BusinessLogic.Dtos.Bill
{
    public class BillResponse
    {
        public int Id { get; set; }

        public int? TableId { get; set; }

        public DataModels.Entities.Table Table { get; set; }

        public int? BookingId { get; set; }

        public DataModels.Entities.Booking Booking { get; set; }

        public int? CustomerId { get; set; }

        public DataModels.Entities.Customer Customer { get; set; }

        public List<Order> Orders { get; set; }

        public DateTime DateTime { get; set; }

        public long? Total { get; set; }

        public bool Completed { get; set; }

        public DataModels.Entities.Promotion Promotion { get; set; }
    }
}
