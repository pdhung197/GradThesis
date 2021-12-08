using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.Contract;
using BusinessLogic.Dtos.Authentication;
using BusinessLogic.Dtos.User;
using BusinessLogic.Utils;
using FinalProject.Configs;
using FinalProject.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace FinalProject.Providers
{
    public interface ITokenGenerator
    {
        Task<TokenResponse> GenerateToken(UserLogin userLogin);
    }

    public class TokenGenerator : ITokenGenerator
    {
        private readonly AppSettings options;
        private readonly IAuthBusiness authBusiness;

        public readonly SigningCredentials SigningCredentials;

        public TokenGenerator(
            IOptions<AppSettings> options,
            IAuthBusiness authBusiness)
        {
            this.options = options.Value;
            this.authBusiness = authBusiness;

            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(this.options.Secret));
            SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
        }

        private static Claim CreateClaim(string type, string value)
        {
            return new Claim(type, value, null, ClaimsIdentity.DefaultIssuer, "Provider");
        }

        /*
        private async Task<ClaimsIdentity> GetIdentity(UserLogin userLogin)
        {
            var user = await authBusiness.Login(userLogin);

            var claims = new List<Claim>
            {
                CreateClaim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                CreateClaim(ClaimTypes.Name, user.Username)
            };

            return new ClaimsIdentity(claims, "Bearer");
        }
        */

        public async Task<TokenResponse> GenerateToken(UserLogin userLogin)
        {
            var user = await authBusiness.Login(userLogin);

            var claims = new List<Claim>
            {
                CreateClaim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                CreateClaim(ClaimTypes.Name, user.Username)
            };

            var identity = new ClaimsIdentity(claims, "Bearer");

            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                claims: identity.Claims,
                notBefore: now,
                expires: now.AddSeconds(options.Expiration),
                signingCredentials: SigningCredentials);

            return new TokenResponse
            {
                Token = new JwtSecurityTokenHandler().WriteToken(jwt),
                User = user.ConvertTo<UserResponse>()
            };
        }
    }
}