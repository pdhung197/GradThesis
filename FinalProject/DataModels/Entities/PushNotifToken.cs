using DataModels.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels.Entities
{
    public class PushNotifToken : IdBase
    {
        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        public string Token { get; set; }
    }
}
