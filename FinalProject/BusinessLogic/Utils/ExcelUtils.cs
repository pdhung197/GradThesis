using BusinessLogic.Dtos.Report;
using ClosedXML.Excel;
using DataModels.Entities;
using DataModels.Enums;
using DataModels.Params;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace BusinessLogic.Utils
{
    public static class ExcelUtils
    {
        public static XLWorkbook GenerateBill(this Bill bill)
        {
            var workbook = new XLWorkbook();

            var worksheet = workbook.Worksheets.Add("Hóa đơn");

            worksheet.ColumnWidth = 18;
            worksheet.RowHeight = 18;
            worksheet.Style.Font.FontName = "Times New Roman";
            worksheet.Style.Font.Bold = true;

            worksheet.Cell(1, 5).Value = $"BÀN SỐ: {bill.Table.TableIndex}";
            worksheet.Cell(2, 5).Value = $"Ngày: {bill.DateTime:dd - MM - yyyy HH:mm}";
            worksheet.Cell(3, 5).Value = (bill.Customer == null) ? "" : $"Khách hàng: {bill.Customer.Name} - {bill.Customer.Phone}";
            worksheet.Cell(5, 3).Value = "PHIẾU TÍNH TIỀN";

            worksheet.Cell(7, 1).Value = "STT";
            worksheet.Cell(7, 1).Style.Border.SetOutsideBorder(XLBorderStyleValues.Thick);
            worksheet.Cell(7, 2).Value = "Món ăn";
            worksheet.Cell(7, 2).Style.Border.SetOutsideBorder(XLBorderStyleValues.Thick);
            worksheet.Cell(7, 3).Value = "Số lượng";
            worksheet.Cell(7, 3).Style.Border.SetOutsideBorder(XLBorderStyleValues.Thick);
            worksheet.Cell(7, 4).Value = "Đơn giá";
            worksheet.Cell(7, 4).Style.Border.SetOutsideBorder(XLBorderStyleValues.Thick);
            worksheet.Cell(7, 5).Value = "Khuyến mãi";
            worksheet.Cell(7, 5).Style.Border.SetOutsideBorder(XLBorderStyleValues.Thick);
            worksheet.Cell(7, 6).Value = "Thành tiền";
            worksheet.Cell(7, 6).Style.Border.SetOutsideBorder(XLBorderStyleValues.Thick);

            int index = 10;
            long? total = 0L;

            for (var i = 1; i <= bill.Orders.Count; i++)
            {
                worksheet.Cell(i + 7, 1).Value = i;
                worksheet.Cell(i + 7, 2).Value = bill.Orders[i - 1].Dish.Name;
                worksheet.Cell(i + 7, 3).Value = bill.Orders[i - 1].Amount;
                worksheet.Cell(i + 7, 4).Value = bill.Orders[i - 1].Dish.Price;
                worksheet.Cell(i + 7, 5).Value = (bill.Orders[i - 1].Promotion == null) ? "" :
                                            (bill.Orders[i - 1].Promotion.DiscountType == DiscountType.Percent) ?
                                                $"{bill.Orders[i - 1].Promotion.DiscountAmount} %" :
                                                $"{bill.Orders[i - 1].Promotion.DiscountAmount}";
                worksheet.Cell(i + 7, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);
                worksheet.Cell(i + 7, 6).Value = bill.Orders[i - 1].Total;

                total += bill.Orders[i - 1].Total;

                index = i + 7 + 10;
            }

            worksheet.Range(worksheet.Cell(8, 1), worksheet.Cell(index, 6)).Style.Border.SetOutsideBorder(XLBorderStyleValues.Thick);
            for (var i = 1; i <= 6; i++)
            {
                worksheet.Range(worksheet.Cell(8, i), worksheet.Cell(index, i)).Style.Border.SetOutsideBorder(XLBorderStyleValues.Thick);
            }

            worksheet.Cell(index, 2).Value = "TỔNG CỘNG";
            worksheet.Cell(index, 6).Value = total;
            worksheet.Range(worksheet.Cell(index, 1), worksheet.Cell(index, 6)).Style.Border.SetOutsideBorder(XLBorderStyleValues.Thick);

            worksheet.Cell(index + 2, 2).Value = "KHUYẾN MÃI";
            worksheet.Cell(index + 2, 4).Value = (bill.Promotion == null) ? "" :
                                            (bill.Promotion.DiscountType == DiscountType.Percent) ?
                                                $"{bill.Promotion.DiscountAmount} %" :
                                                $"{bill.Promotion.DiscountAmount}";
            worksheet.Cell(index + 2, 4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

            worksheet.Cell(index + 3, 2).Value = "THÀNH TIỀN";
            worksheet.Cell(index + 3, 4).Value = bill.Total;

            worksheet.Cell(index + 7, 3).Value = "Xin cảm ơn và hẹn gặp lại Quý Khách!";

            return workbook;
        }

        public static XLWorkbook GenerateReport(ReportParams reportParams, List<ReceiptMaterialDetail> receipts, List<BillDetail> bills)
        {

            var from = DateTime.ParseExact(reportParams.DateFrom, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            var to = DateTime.ParseExact(reportParams.DateTo, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            var workbook = new XLWorkbook();

            var worksheet1 = workbook.Worksheets.Add("Chi - Nguyên liệu");
            worksheet1.GenerateMaterialSheet(from, to, receipts);

            var worksheet2 = workbook.Worksheets.Add("Doanh thu");
            worksheet2.GenerateBillSheet(from, to, bills);

            return workbook;
        }

        private static void GenerateMaterialSheet(this IXLWorksheet worksheet, DateTime from, DateTime to, List<ReceiptMaterialDetail> receipts)
        {
            worksheet.ColumnWidth = 18;
            worksheet.RowHeight = 18;
            worksheet.Style.Font.FontName = "Times New Roman";
            worksheet.Style.Font.Bold = true;

            worksheet.Cell(2, 3).Value = "NHẬP NGUYÊN LIỆU";
            worksheet.Cell(3, 2).Value = $"Từ ngày: {from: dd - MM - yyyy}";
            worksheet.Cell(3, 5).Value = $"Đến ngày: {to: dd - MM - yyyy}";

            worksheet.Cell(5, 2).Value = "Ngày nhập";
            worksheet.Cell(5, 3).Value = "Tên nguyên liệu";
            worksheet.Cell(5, 4).Value = "Đơn vị tính";
            worksheet.Cell(5, 5).Value = "Số lượng";
            worksheet.Cell(5, 6).Value = "Đơn giá";
            worksheet.Cell(5, 7).Value = "Thành tiền";

            int index = 5;
            long? total = 0L;

            for (var i = 1; i <= receipts.Count; i++)
            {
                worksheet.Cell(i + 5, 2).Value = receipts[i - 1].DateTime.ToString("dd/MM/yyyy");
                worksheet.Cell(i + 5, 2).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);
                worksheet.Cell(i + 5, 3).Value = receipts[i - 1].MaterialName;
                worksheet.Cell(i + 5, 4).Value = receipts[i - 1].Unit;
                worksheet.Cell(i + 5, 5).Value = receipts[i - 1].Amount;
                worksheet.Cell(i + 5, 6).Value = receipts[i - 1].UnitPrice;
                worksheet.Cell(i + 5, 7).Value = receipts[i - 1].Total;

                index = i + 5;
                total += receipts[i - 1].Total;
            }

            worksheet.Cell(index + 2, 6).Value = "Tổng chi";
            worksheet.Cell(index + 2, 7).Value = total;
        }

        private static void GenerateBillSheet(this IXLWorksheet worksheet, DateTime from, DateTime to, List<BillDetail> bills)
        {
            worksheet.ColumnWidth = 18;
            worksheet.RowHeight = 18;
            worksheet.Style.Font.FontName = "Times New Roman";
            worksheet.Style.Font.Bold = true;

            worksheet.Cell(2, 3).Value = "DOANH THU";
            worksheet.Cell(3, 2).Value = $"Từ ngày: {from: dd - MM - yyyy}";
            worksheet.Cell(3, 5).Value = $"Đến ngày: {to: dd - MM - yyyy}";

            worksheet.Cell(5, 2).Value = "Ngày lập hóa đơn";
            worksheet.Cell(5, 3).Value = "Doanh thu";

            int index = 5;
            long? total = 0L;

            for (var i = 1; i <= bills.Count; i++)
            {
                worksheet.Cell(i + 5, 2).Value = bills[i - 1].DateTime.ToString("dd/MM/yyyy");
                worksheet.Cell(i + 5, 2).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);
                worksheet.Cell(i + 5, 3).Value = bills[i - 1].Total;

                index = i + 5;
                total += bills[i - 1].Total;
            }

            worksheet.Cell(index + 2, 3).Value = "Tổng doanh thu";
            worksheet.Cell(index + 2, 4).Value = total;
        }
    }
}
