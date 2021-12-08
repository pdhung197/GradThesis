using DataModels.Base;

namespace BusinessLogic.Dtos.Dish
{
    public class DishUpdate : IdBase
    {
        public string Name { get; set; }

        public string Unit { get; set; }

        public long Price { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }
    }
}
