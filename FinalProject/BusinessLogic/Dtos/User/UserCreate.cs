using DataModels.Enums;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.Dtos.User
{
    public class UserCreate
    {
        public string Name { get; set; }

        [Required(ErrorMessage = "Tên tài khoản không được rỗng")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Mật khẩu không được rỗng")]
        public string Password { get; set; }

        public Role Role { get; set; }

        public int? EmployeeId { get; set; }
    }
}
