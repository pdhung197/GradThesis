namespace BusinessLogic.Dtos.Material
{
    public class MaterialCreate
    {
        public string Name { get; set; }

        public string Unit { get; set; }

        public long? UnitPrice { get; set; }

        public int? Inventory { get; set; }
    }
}
