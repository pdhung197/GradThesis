using BusinessLogic.Utils;
using DataModels.Entities;
using DataModels.Params;
using System.Threading.Tasks;

namespace BusinessLogic.Contract
{
    public interface IReceiptMaterialBusiness : IGenericBusiness<ReceiptMaterial>
    {
        Task<PagedList<TO>> SearchByDateAndType<TO>(SearchReceiptParams searchParams);
    }
}
