using BusinessLogic.Utils;
using DataModels.Base;
using DataModels.Params;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Contract
{
    public interface IGenericBusiness<in T> where T : IdBase
    {
        Task<TO> GetById<TO>(int id);

        Task<PagedList<TO>> GetAll<TO>(PaginationParams pagingParams);

        Task<PagedList<TO>> GetAll<TO>(SearchParams searchParams);

        Task<List<TO>> GetAll<TO>();

        Task<TO> Update<TO>(IdBase o);

        Task<TO> Create<TO>(object o);

        Task Delete(int id);

        Task Delete(T entry);

        Task HardDelete(T entry);

        Task SaveAll();
    }
}
