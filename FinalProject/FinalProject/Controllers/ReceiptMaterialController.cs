using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLogic.Contract;
using BusinessLogic.Dtos.ReceiptMaterial;
using BusinessLogic.Utils;
using DataModels.Entities;
using DataModels.Params;
using FinalProject.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinalProject.Controllers
{
    [Route("api/receipts")]
    [Authorize]
    [RequireStoreEmp]
    public class ReceiptMaterialController : ControllerBase
    {
        private readonly IReceiptMaterialBusiness business;

        public ReceiptMaterialController(IReceiptMaterialBusiness business)
        {
            this.business = business;
        }

        [HttpGet]
        public async Task<List<ReceiptMaterial>> GetAll([FromQuery] SearchReceiptParams searchParams)
        {
            var receipts = await business.SearchByDateAndType<ReceiptMaterial>(searchParams);
            Response.AddPagination(receipts.CurrentPage, receipts.PageSize, receipts.TotalItems, receipts.TotalPages);
            return receipts;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ReceiptMaterial> Get(int id) => await business.GetById<ReceiptMaterial>(id);

        [HttpPost]
        [ValidateModel]
        public async Task<ReceiptMaterial> Create([FromBody] ReceiptMaterialCreate receipt) => await business.Create<ReceiptMaterial>(receipt);

        [HttpPut]
        [ValidateModel]
        public async Task<ReceiptMaterial> Update([FromBody] ReceiptMaterialUpdate receipt) => await business.Update<ReceiptMaterial>(receipt);

        [HttpDelete]
        [Route("{id}")]
        [RequireAdmin]
        public async Task Delete(int id) => await business.Delete(id);
    }
}
