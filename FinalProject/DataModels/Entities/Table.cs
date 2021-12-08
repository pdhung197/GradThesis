using DataModels.Base;
using DataModels.Enums;

namespace DataModels.Entities
{
    public class Table : IdBase
    {
        public string TableIndex { get; set; }

        public int? Capacity { get; set; }

        public TableStatus Status { get; set; } = TableStatus.Available;
    }
}
