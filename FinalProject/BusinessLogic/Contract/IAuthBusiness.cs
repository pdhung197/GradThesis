using BusinessLogic.Dtos.Authentication;
using DataModels.Entities;
using System.Threading.Tasks;

namespace BusinessLogic.Contract
{
    public interface IAuthBusiness
    {
        Task<User> Login(UserLogin userLogin);

        Task<User> Login(string username);
    }
}
