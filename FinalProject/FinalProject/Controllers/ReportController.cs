using BusinessLogic.Contract;
using BusinessLogic.Dtos.Report;
using BusinessLogic.Utils;
using DataModels.Params;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace FinalProject.Controllers
{
    [Route("api/reports")]
    public class ReportController : ControllerBase
    {
        private readonly IReportBusiness business;

        public ReportController(IReportBusiness business)
        {
            this.business = business;
        }

        [HttpGet]
        [Route("summary")]
        [Authorize]
        public SummaryReport GetSummary([FromQuery] ReportParams reportParams) => business.GetSummary(reportParams);

        [HttpGet]
        [Route("detail/material")]
        [Authorize]
        public async Task<List<ReceiptMaterialDetail>> GetMaterialDetails([FromQuery] ReportParams reportParams) => await business.GetReceiptMaterials(reportParams);

        [HttpGet]
        [Route("detail/bill")]
        [Authorize]
        public PagedList<BillDetail> GetBillDetails([FromQuery] ReportParams reportParams)
        {
            var bills = business.GetBills(reportParams);
            Response.AddPagination(bills.CurrentPage, bills.PageSize, bills.TotalItems, bills.TotalPages);
            return bills;
        }

        [HttpGet]
        [Route("detail/file")]
        public async Task<FileContentResult> GenerateReport([FromQuery] ReportParams reportParams)
        {
            if (string.IsNullOrWhiteSpace(reportParams.DateFrom) && string.IsNullOrWhiteSpace(reportParams.DateTo))
            {
                return null;
            }

            var receipts = await business.GetReceiptMaterials(reportParams);
            var bills = await business.GetBillsList(reportParams);

            using (var stream = new MemoryStream())
            {
                ExcelUtils.GenerateReport(reportParams, receipts, bills).SaveAs(stream);
                var content = stream.ToArray();
                return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    $"BaoCao_{reportParams.DateFrom}_{reportParams.DateTo}.xlsx");
            }
        }
    }
}
