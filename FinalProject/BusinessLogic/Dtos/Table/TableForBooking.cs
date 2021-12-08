using DataModels.Enums;

namespace BusinessLogic.Dtos.Table
{
    public class TableForBooking
    {
        public int Id { get; set; }

        public string TableIndex { get; set; }

        public int? Capacity { get; set; }

        public TableStatus Status { get; set; }

        public bool CanBook { get; set; }
    }
}
