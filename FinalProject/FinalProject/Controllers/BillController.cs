using BusinessLogic.Contract;
using BusinessLogic.Dtos.Bill;
using BusinessLogic.Utils;
using DataModels.Entities;
using FinalProject.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace FinalProject.Controllers
{
    [Route("api/bills")]
    public class BillController : ControllerBase
    {
        private readonly IBillBusiness business;

        public BillController(IBillBusiness business)
        {
            this.business = business;
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize]
        [RequireSaleEmp]
        public async Task<BillResponse> Get(int id) => await business.GetById<BillResponse>(id);

        [HttpGet]
        [Route("table/{tableId}")]
        [Authorize]
        [RequireSaleEmp]
        public async Task<BillResponse> GetByTableId(int tableId) => await business.GetByTableId(tableId);

        [HttpGet]
        [Route("{id}/file")]
        public async Task<FileContentResult> GenerateBillFile(int id)
        {
            var bill = await business.GetById<Bill>(id);
            using (var stream = new MemoryStream())
            {
                bill.GenerateBill().SaveAs(stream);
                var content = stream.ToArray();
                return File(content, 
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
                    $"PhieuTinhTien_Ban{bill.TableId}_{bill.DateTime:ddMMyyyyHHmm}.xlsx");
            }
        }

        [HttpPost]
        [ValidateModel]
        [Authorize]
        [RequireSaleEmp]
        public async Task<BillResponse> Create([FromBody] BillCreate bill) => await business.CreateBill(bill);

        [HttpPut]
        [ValidateModel]
        [Authorize]
        [RequireSaleEmp]
        public async Task<BillResponse> Update([FromBody] BillUpdate bill) => await business.Update<BillResponse>(bill);

        [HttpPut]
        [Route("{tableId}")]
        [ValidateModel]
        [Authorize]
        [RequireSaleEmp]
        public async Task AddOrders(int tableId, [FromBody] List<OrderCreate> orders) => await business.AddOrders(tableId, orders);

        [HttpPut]
        [Route("{id}/customer/{customerId}")]
        [ValidateModel]
        [Authorize]
        [RequireSaleEmp]
        public async Task AddCustomer(int id, int customerId) => await business.AddCustomer(id, customerId);

        [HttpPut]
        [Route("checkout/{tableId}")]
        [ValidateModel]
        [Authorize]
        [RequireSaleEmp]
        public async Task CheckoutBill(int tableId) => await business.CheckoutBill(tableId);


        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        [RequireAdmin]
        public async Task Delete(int id) => await business.Delete(id);
    }
}
