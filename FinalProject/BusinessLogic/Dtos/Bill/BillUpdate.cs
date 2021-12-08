using DataModels.Base;
using DataModels.Entities;
using System;
using System.Collections.Generic;

namespace BusinessLogic.Dtos.Bill
{
    public class BillUpdate : IdBase
    {
        public int? TableId { get; set; }

        public int? BookingId { get; set; }

        public List<Order> Orders { get; set; }

        public DateTime DateTime { get; set; } = DateTime.Now;

        public bool Completed { get; set; } = false;
    }
}
