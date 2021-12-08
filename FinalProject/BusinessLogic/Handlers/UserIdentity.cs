using DataModels.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using System.Security.Principal;

namespace BusinessLogic.Handlers
{
    public class UserIdentity : IIdentity
    {
        public User User { get; }

        public UserIdentity(User user)
        {
            User = user;
        }

        public string Name => User.Username;

        public string AuthenticationType => JwtBearerDefaults.AuthenticationScheme;

        public bool IsAuthenticated => true;
    }

    public class UserClaimsPrincipal : ClaimsPrincipal
    {
        public UserIdentity UserIdentity { get; set; }

        public UserClaimsPrincipal(UserIdentity userIdentity) : base(userIdentity)
        {
            UserIdentity = userIdentity;
        }
    }
}
