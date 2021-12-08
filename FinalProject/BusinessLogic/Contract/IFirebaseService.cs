using Newtonsoft.Json;
using Refit;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Contract
{
    public interface IFirebaseService
    {
        /*
        [Post("/{token}/rel/topics/{topic}")]
        [Headers("Authorization: key=AAAA1CalqVg:APA91bG7uyuDvLrj5DhKeKwPLGN2gyIsmDlUPtYHAGcQOalj3s2_jQR5EpmwBDbLG9IVeYPqKa5fyfNR-_k8nZPMwiepGn31K8S6ooO0I2Yblbm3JBRhD0vvlsghR43vw_ds4lkbAhHp")]
        Task<object> SubscribeTokenToTopic(string token, string topic);
        */

        [Post("/fcm/send")]
        [Headers("Authorization: key=AAAAeGNuq-w:APA91bFWb6riP3zUTfjQqjqmT76oePo9298RBvcaubKo5pg6s8GAnQPLwNknJfpSsRCYpeWPqw4osdMlWP0AzmAA8FHEshGykafpAK2tY_YgObHzsHvbeqdjnR4G_juZQqT7pFGKx7Eh")]
        Task<object> SendPushNotif(PushNotification notif);
    }

    public class PushNotification
    {
        //[JsonProperty("to")]
        //public string To { get; set; } = "/topics/WebsiteUpdates";

        [JsonProperty("registration_ids")]
        public List<string> RegistrationIds { get; set; }

        [JsonProperty("notification")]
        public Notification Notification { get; set; }

        [JsonProperty("priority")]
        public string Priority { get; set; } = "high";
    }

    public class Notification
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("body")]
        public string Body { get; set; }

        [JsonProperty("icon")]
        public string Icon { get; set; } = "https://res.cloudinary.com/hhnga/image/upload/v1606050482/logo_q4lh9x.png";
    }
}
