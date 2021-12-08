using BusinessLogic.Utils;
using DataModels;
using DataModels.Base;
using DataModels.Params;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Business
{
    public class SearchGenericBusiness<T> : GenericBusiness<T> where T : NameBase
    {
        public SearchGenericBusiness(DataContext context) : base(context)
        {
        }

        public override async Task<PagedList<TO>> GetAll<TO>(SearchParams searchParams)
        {
            var entries = Entries.Where(e => e.Deleted != true).AsQueryable();
            if (!string.IsNullOrWhiteSpace(searchParams.Name))
            {
                entries = entries.Where(x => x.Name.ToLower().StartsWith(searchParams.Name.ToLower()));
            }

            return (await PagedList<T>.Create(entries, searchParams.PageNumber, searchParams.PageSize))
                .ConvertTo<PagedList<TO>>();
        }
    }
}
