using DataModels.Base;

namespace DataModels.Entities
{
    public class Material : NameBase
    {
        public string Unit { get; set; }

        public long? UnitPrice { get; set; }

        public int? Inventory { get; set; }
    }
}
