using BusinessLogic.Dtos.Authentication;
using FinalProject.Models;
using FinalProject.Providers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FinalProject.Controllers
{
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ITokenGenerator tokenGenerator;

        public AuthController(ITokenGenerator tokenGenerator)
        {
            this.tokenGenerator = tokenGenerator;
        }

        [HttpPost]
        public async Task<TokenResponse> Login([FromBody] UserLogin userLogin) => await tokenGenerator.GenerateToken(userLogin);
    }
}
