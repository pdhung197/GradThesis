using BusinessLogic.Dtos.Report;
using BusinessLogic.Utils;
using DataModels.Params;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Contract
{
    public interface IReportBusiness
    {
        SummaryReport GetSummary(ReportParams reportParams);

        Task<List<ReceiptMaterialDetail>> GetReceiptMaterials(ReportParams reportParams);

        PagedList<BillDetail> GetBills(ReportParams reportParams);

        Task<List<BillDetail>> GetBillsList(ReportParams reportParams);
    }
}
