using BusinessLogic.Utils;
using DataModels.Entities;
using DataModels.Params;
using System.Threading.Tasks;

namespace BusinessLogic.Contract
{
    public interface IEmployeeBusiness : IGenericBusiness<Employee>
    {
        Task<PagedList<TO>> SearchByCategoryAndName<TO>(SearchEmployeeParams searchParams);
    }
}
