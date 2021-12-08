using BusinessLogic.Business;
using BusinessLogic.Configurable;
using BusinessLogic.Contract;
using BusinessLogic.Handlers;
using BusinessLogic.Mail;
using DataModels.Entities;
using Microsoft.Extensions.DependencyInjection;

namespace BusinessLogic
{
    public static class ConfigServices
    {
        public static void RegisterBusinessDI(this IServiceCollection services)
        {
            services.AddTransient<IAuthBusiness, AuthBusiness>();
            services.AddTransient<IConfigurableBusiness, ConfigurableBusiness>();
            services.AddTransient<IGenericBusiness<Attachment>, GenericBusiness<Attachment>>();
            services.AddTransient<IMailService, MailService>();
            services.AddTransient<IIdentityProvider, IdentityProvider>();

            services.AddTransient<IGenericBusiness<Provider>, SearchGenericBusiness<Provider>>();
            services.AddTransient<IGenericBusiness<Material>, SearchGenericBusiness<Material>>();
            services.AddTransient<IReceiptMaterialBusiness, ReceiptMaterialBusiness>();

            services.AddTransient<IGenericBusiness<DishCategory>, GenericBusiness<DishCategory>>();
            services.AddTransient<IDishBusiness, DishBusiness>();

            services.AddTransient<IEmployeeBusiness, EmployeeBusiness>();
            services.AddTransient<IGenericBusiness<User>, UserBusiness>();

            services.AddTransient<ICustomerBusiness, CustomerBusiness>();

            services.AddTransient<IBookingBusiness, BookingBusiness>();
            services.AddTransient<ITableBusiness, TableBusiness>();
            services.AddTransient<IBillBusiness, BillBusiness>();
            services.AddTransient<IPromotionBusiness, PromotionBusiness>();

            services.AddTransient<IReportBusiness, ReportBusiness>();
            services.AddTransient<IGenericBusiness<PushNotifToken>, PushNotificationBusiness>();
        }
    }
}
