using BusinessLogic.Contract;
using BusinessLogic.Utils;
using DataModels;
using DataModels.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BusinessLogic.Business
{
    public class PushNotificationBusiness : GenericBusiness<PushNotifToken>, IGenericBusiness<PushNotifToken>
    {
        public PushNotificationBusiness(DataContext context) : base(context)
        {
        }

        public override async Task<TO> Create<TO>(object o)
        {
            var entry = o.ConvertTo<PushNotifToken>();

            if (await Entries.AnyAsync(t => t.UserId == entry.UserId && string.Equals(entry.Token, t.Token)))
            {
                return default;
            }

            AddEntry(entry);
            await Context.SaveChangesAsync();

            return entry.ConvertTo<TO>();
        }
    }
}
