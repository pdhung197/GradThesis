using DataModels.Enums;
using System;

namespace BusinessLogic.Dtos.Booking
{
    public class BookingCreate
    {
        public string CustomerName { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public DateTime BookingTime { get; set; }

        public int NumberOfPeople { get; set; }

        public long? Deposit { get; set; }

        public BookingStatus Status { get; set; } = BookingStatus.NotConfirmed;

        public string Note { get; set; }

        public bool ForWedding { get; set; } = false;
    }
}
