using DataModels.Entities;

namespace BusinessLogic.Contract
{
    public interface ITableBusiness : IGenericBusiness<Table>
    {
        void UpdateBookingStatus();
    }
}
