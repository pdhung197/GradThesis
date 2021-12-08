using BusinessLogic;
using BusinessLogic.Business;
using BusinessLogic.Contract;
using FinalProject.Handlers;
using FinalProject.Providers;
using Microsoft.Extensions.DependencyInjection;

namespace FinalProject.Configs
{
    public static class DIConfig
    {
        public static void RegisterDI(this IServiceCollection services)
        {
            services.RegisterBusinessDI();
            services.AddHttpContextAccessor();
            services.AddSingleton<TokenProviderMiddleware>();

            services.AddScoped<ValidateModelAttribute>();
            services.AddScoped<UpdateBookingStatus>();
            services.AddScoped<ITokenGenerator, TokenGenerator>();

            services.AddScoped(typeof(IGenericBusiness<>), typeof(GenericBusiness<>));
        }
    }
}
