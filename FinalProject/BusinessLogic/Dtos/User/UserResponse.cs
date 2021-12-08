using DataModels.Enums;

namespace BusinessLogic.Dtos.User
{
    public class UserResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Username { get; set; }

        public Role Role { get; set; }

        public int? EmployeeId { get; set; }
    }
}
