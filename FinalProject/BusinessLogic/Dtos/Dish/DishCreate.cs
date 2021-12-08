namespace BusinessLogic.Dtos.Dish
{
    public class DishCreate
    {
        public string Name { get; set; }

        public string Unit { get; set; }

        public long Price { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }
    }
}
