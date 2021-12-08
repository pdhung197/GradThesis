using DataModels.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Contract
{
    public interface ICustomerBusiness : IGenericBusiness<Customer>
    {
        Task<List<Bill>> GetBills(int customerId);
    }
}
