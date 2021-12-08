using BusinessLogic.Contract;
using BusinessLogic.Dtos.Authentication;
using DataModels;
using DataModels.Entities;
using DataModels.Exceptions;
using DataModels.Utils;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BusinessLogic.Business
{
    public class AuthBusiness : BaseBusiness, IAuthBusiness
    {
        public AuthBusiness(DataContext context) : base(context)
        {
        }

        public async Task<User> Login(UserLogin userLogin)
        {
            var user = await Login(userLogin.Username);

            if(!userLogin.Password.Verify(user.Password))
            {
                throw new BadRequestException("Mật khẩu không hợp lệ");
            }

            return user;
        }

        public async Task<User> Login(string username)
        {
            var user = await GetUser(username)
                ?? throw new BadRequestException("Sai tên đăng nhập");

            return user;
        }

        private async Task<User> GetUser(string username)
        {
            return await Context.Users.FirstOrDefaultAsync(u => string.Equals(u.Username, username));
        }
    }
}
