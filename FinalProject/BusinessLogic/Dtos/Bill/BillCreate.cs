using System;
using System.Collections.Generic;

namespace BusinessLogic.Dtos.Bill
{
    public class BillCreate
    {
        public int? TableId { get; set; }

        public int? BookingId { get; set; }

        public List<OrderCreate> Orders { get; set; }

        public DateTime DateTime { get; set; } = DateTime.Now;

        public long? Total { get; set; } = 0L;

        public bool Completed { get; set; } = false;
    }

    public class OrderCreate
    {
        public int DishId { get; set; }

        public int Amount { get; set; }

        public long Total { get; set; } = 0L;
    }
}
