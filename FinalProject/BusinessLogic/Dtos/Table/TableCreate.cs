using DataModels.Enums;

namespace BusinessLogic.Dtos.Table
{
    public class TableCreate
    {
        public string TableIndex { get; set; }

        public int? Capacity { get; set; }

        public TableStatus Status { get; set; } = TableStatus.Available;
    }
}
