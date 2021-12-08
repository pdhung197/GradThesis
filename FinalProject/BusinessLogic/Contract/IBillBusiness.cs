using BusinessLogic.Dtos.Bill;
using DataModels.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Contract
{
    public interface IBillBusiness : IGenericBusiness<Bill>
    {
        Task<BillResponse> CreateBill(BillCreate billCreate);

        Task<BillResponse> GetByTableId(int tableId);

        Task AddOrders(int tableId, List<OrderCreate> orders);

        Task AddCustomer(int id, int customerId);

        Task CheckoutBill(int tableId);
    }
}
