using BusinessLogic.Contract;
using BusinessLogic.Utils;
using DataModels;
using DataModels.Base;
using DataModels.Entities;
using DataModels.Exceptions;
using DataModels.Params;
using DataModels.Utils;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Business
{
    public class UserBusiness : SearchGenericBusiness<User>, IGenericBusiness<User>
    {
        public UserBusiness(DataContext context) : base(context)
        {
        }

        public override async Task<PagedList<TO>> GetAll<TO>(SearchParams searchParams)
        {
            var entries = Entries.AsQueryable();
            if (!string.IsNullOrWhiteSpace(searchParams.Name))
            {
                entries = entries.Where(x => x.Name.ToLower().StartsWith(searchParams.Name.ToLower())
                                        || x.Username.ToLower().StartsWith(searchParams.Name.ToLower()));
            }

            return (await PagedList<User>.Create(entries, searchParams.PageNumber, searchParams.PageSize))
                .ConvertTo<PagedList<TO>>();
        }

        public override async Task<TO> Create<TO>(object o)
        {
            var entry = o.ConvertTo<User>();

            await CheckValidUsername(entry);

            entry.Password = entry.Password.Encode();

            AddEntry(entry);
            await Context.SaveChangesAsync();

            return entry.ConvertTo<TO>();
        }

        public override async Task<TO> Update<TO>(IdBase o)
        {
            var existing = await Entries.FirstOrDefaultAsync(x => x.Id == o.Id)
                ?? throw new BadRequestException("Không tìm thấy người dùng này trong cơ sở dữ liệu.");
            var updated = o.ConvertTo<User>();

            await CheckValidUsername(updated);
            
            if (updated.Password != null)
            {
                updated.Password = updated.Password.Encode();
            }
            else
            {
                updated.Password = existing.Password;
            }

            UpdateEntry(existing, updated);

            await Context.SaveChangesAsync();

            return existing.ConvertTo<TO>();
        }

        public override async Task Delete(int id)
        {
            var user = await Entries.FindAsync(id);
            await HardDelete(user);
        }

        private async Task CheckValidUsername(User user)
        {
            if (await Exist(u => string.Equals(u.Username, user.Username) && u.Id != user.Id))
            {
                throw new BadRequestException("Tên đăng nhập đã tồn tại trong cơ sở dữ liệu");
            }
        }
    }
}
