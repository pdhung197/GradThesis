using BusinessLogic.Contract;
using BusinessLogic.Dtos.Bill;
using BusinessLogic.Dtos.Report;
using BusinessLogic.Utils;
using DataModels;
using DataModels.Exceptions;
using DataModels.Params;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Business
{
    public class ReportBusiness : BaseBusiness, IReportBusiness
    {
        public ReportBusiness(DataContext context) : base(context)
        {
        }

        public SummaryReport GetSummary(ReportParams reportParams)
        {
            if (!string.IsNullOrWhiteSpace(reportParams.DateFrom) && !string.IsNullOrWhiteSpace(reportParams.DateTo))
            {
                var dateFrom = DateTime.ParseExact(reportParams.DateFrom, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                var dateTo = DateTime.ParseExact(reportParams.DateTo, "yyyy-MM-dd", CultureInfo.InvariantCulture);

                if (dateFrom > dateTo)
                {
                    throw new BadRequestException("Ngày bắt đầu phải bé hơn hoặc bằng ngày kết thúc");
                }    

                var mTotal = Context.ReceiptMaterials.Where(r => r.DateTime.Date >= dateFrom && r.DateTime.Date <= dateTo)
                        .Sum(r => (r.Amount > 0) ? r.Amount * r.UnitPrice : 0L);
                var bTotal = Context.Bills.Where(b => b.Completed == true && b.DateTime.Date >= dateFrom && b.DateTime.Date <= dateTo)
                        .Sum(b => b.Total);

                return new SummaryReport
                {
                    MaterialTotal = mTotal,
                    BillTotal = bTotal
                };
            }

            return null;
        }

        public async Task<List<ReceiptMaterialDetail>> GetReceiptMaterials(ReportParams reportParams)
        {
            if (!string.IsNullOrWhiteSpace(reportParams.DateFrom) && !string.IsNullOrWhiteSpace(reportParams.DateTo))
            {
                var dateFrom = DateTime.ParseExact(reportParams.DateFrom, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                var dateTo = DateTime.ParseExact(reportParams.DateTo, "yyyy-MM-dd", CultureInfo.InvariantCulture);

                if (dateFrom > dateTo)
                {
                    throw new BadRequestException("Ngày bắt đầu phải bé hơn hoặc bằng ngày kết thúc");
                }

                var receipts = await Context.ReceiptMaterials.Include(r => r.Material)
                    .Where(r => r.DateTime.Date >= dateFrom && r.DateTime.Date <= dateTo && r.Amount > 0 && r.Deleted != true)
                    .ToListAsync();
                return receipts.ConvertTo<List<ReceiptMaterialDetail>>();
            }

            return null;
        }

        public PagedList<BillDetail> GetBills(ReportParams reportParams)
        {
            if (!string.IsNullOrWhiteSpace(reportParams.DateFrom) && !string.IsNullOrWhiteSpace(reportParams.DateTo))
            {
                var dateFrom = DateTime.ParseExact(reportParams.DateFrom, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                var dateTo = DateTime.ParseExact(reportParams.DateTo, "yyyy-MM-dd", CultureInfo.InvariantCulture);

                if (dateFrom > dateTo)
                {
                    throw new BadRequestException("Ngày bắt đầu phải bé hơn hoặc bằng ngày kết thúc");
                }

                var bills = Context.Bills.Include(b => b.Customer).Include(b => b.Promotion).Include(b => b.Booking).Include(b => b.Table).Include(b => b.Orders).ThenInclude(o => o.Dish).Include(b => b.Orders).ThenInclude(o => o.Promotion)
                    .Where(b => b.Completed == true && b.DateTime.Date >= dateFrom && b.DateTime.Date <= dateTo && b.Deleted != true)
                    .AsNoTracking()
                    .AsEnumerable()
                    .GroupBy(b => b.DateTime.Date)
                    .Select(b => new BillDetail
                    {
                        DateTime = b.Key,
                        Total = b.Sum(b => b.Total),
                        Bills = b.ToList().OrderBy(b => b.DateTime).ConvertTo<List<BillResponse>>()
                    })
                    .ToList();
                return PagedList<BillDetail>.Create(bills, reportParams.PageNumber, reportParams.PageSize);
            }

            return null;
        }

        public async Task<List<BillDetail>> GetBillsList(ReportParams reportParams)
        {
            if (!string.IsNullOrWhiteSpace(reportParams.DateFrom) && !string.IsNullOrWhiteSpace(reportParams.DateTo))
            {
                var dateFrom = DateTime.ParseExact(reportParams.DateFrom, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                var dateTo = DateTime.ParseExact(reportParams.DateTo, "yyyy-MM-dd", CultureInfo.InvariantCulture);

                if (dateFrom > dateTo)
                {
                    throw new BadRequestException("Ngày bắt đầu phải bé hơn hoặc bằng ngày kết thúc");
                }

                var bills = await Context.Bills
                    .Where(b => b.Completed == true && b.DateTime.Date >= dateFrom && b.DateTime.Date <= dateTo && b.Deleted != true)
                    .GroupBy(b => b.DateTime.Date)
                    .Select(b => new BillDetail
                    {
                        DateTime = b.Key,
                        Total = b.Sum(b => b.Total)
                    })
                    .ToListAsync();

                return bills;
            }

            return null;
        }
    }
}
