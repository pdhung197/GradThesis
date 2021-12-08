using DataModels.Entities;
using DataModels.Enums;
using Microsoft.AspNetCore.Http;

namespace BusinessLogic.Handlers
{
    public interface IIdentityProvider
    {
        User GetCurrentUser();

        string GetUsername();

        Role GetUserRole();

        int GetUserId();
    }

    public class IdentityProvider : IIdentityProvider
    {
        private readonly IHttpContextAccessor accessor;

        public IdentityProvider(IHttpContextAccessor accessor)
        {
            this.accessor = accessor;
        }

        public User GetCurrentUser()
        {
            if (accessor.HttpContext.User is UserClaimsPrincipal user)
            {
                return user.UserIdentity?.User;
            }

            return null;
        }

        public int GetUserId() => GetCurrentUser().Id;

        public string GetUsername() => GetCurrentUser().Username;

        public Role GetUserRole() => GetCurrentUser().Role;
    }
}
