using DataModels.Base;

namespace DataModels.Entities
{
    public class DishCategory : IdBase
    {
        public string Name { get; set; }

        public string Detail { get; set; }
    }
}
