using BusinessLogic.Dtos.User;

namespace FinalProject.Models
{
    public class TokenResponse
    {
        public string Token { get; set; }

        public UserResponse User { get; set; }
    }
}
