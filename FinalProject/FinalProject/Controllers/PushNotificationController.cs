using System.Linq;
using System.Threading.Tasks;
using BusinessLogic.Contract;
using DataModels.Entities;
using FinalProject.Handlers;
using Microsoft.AspNetCore.Mvc;
using Refit;

namespace FinalProject.Controllers
{
    [Route("api/push-notif")]
    public class PushNotificationController : ControllerBase
    {
        private readonly IGenericBusiness<PushNotifToken> business;

        public PushNotificationController(IGenericBusiness<PushNotifToken> business)
        {
            this.business = business;
        }

        [HttpPost]
        [Route("token")]
        public async Task<PushNotifToken> SubscribeToken([FromBody] PushNotifToken pushNotifToken) => await business.Create<PushNotifToken>(pushNotifToken);

        [HttpPost]
        [Microsoft.AspNetCore.Authorization.Authorize]
        [RequireAdmin]
        public async Task SendPushNotification([FromBody] Notification notification)
        {
            var tokens = (await business.GetAll<PushNotifToken>()).Select(t => t.Token).ToList();
            var pushNotif = new PushNotification
            {
                RegistrationIds = tokens,
                Notification = notification
            };

            var client = RestService.For<IFirebaseService>("https://fcm.googleapis.com");
            await client.SendPushNotif(pushNotif);
        }

    }
}
