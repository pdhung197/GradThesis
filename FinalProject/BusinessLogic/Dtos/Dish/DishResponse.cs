namespace BusinessLogic.Dtos.Dish
{
    public class DishResponse : DishCreate
    {
        public int Id { get; set; }

        public DataModels.Entities.DishCategory Category { get; set; }

        public int? AttachmentId { get; set; }
    }
}
