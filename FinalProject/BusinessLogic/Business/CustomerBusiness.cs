using BusinessLogic.Contract;
using BusinessLogic.Utils;
using DataModels;
using DataModels.Entities;
using DataModels.Params;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Business
{
    public class CustomerBusiness : SearchGenericBusiness<Customer>, ICustomerBusiness
    {
        public CustomerBusiness(DataContext context) : base(context)
        {
        }

        public override async Task<PagedList<TO>> GetAll<TO>(SearchParams searchParams)
        {
            var entries = Entries.Where(c => c.Deleted != true).AsQueryable();
            if (!string.IsNullOrWhiteSpace(searchParams.Name))
            {
                entries = entries.Where(x => x.Name.ToLower().StartsWith(searchParams.Name.ToLower()) ||
                                            x.Phone.StartsWith(searchParams.Name));
            }

            return (await PagedList<Customer>.Create(entries, searchParams.PageNumber, searchParams.PageSize))
                .ConvertTo<PagedList<TO>>();
        }

        public async Task<List<Bill>> GetBills(int customerId)
        {
            var bills = await Context.Bills.Include(b => b.Table)
                .Where(b => b.CustomerId == customerId)
                .OrderByDescending(b => b.DateTime)
                .ToListAsync();
            return bills;
        }
    }
}
