using BusinessLogic.Contract;
using BusinessLogic.Dtos.Table;
using DataModels.Entities;
using FinalProject.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinalProject.Controllers
{
    [Route("api/tables")]
    [Authorize]
    public class TableController : ControllerBase
    {
        private readonly ITableBusiness business;

        public TableController(ITableBusiness business)
        {
            this.business = business;
        }

        [HttpGet]
        [ServiceFilter(typeof(UpdateBookingStatus))]
        public async Task<List<Table>> GetAll() => await business.GetAll<Table>();

        [HttpGet]
        [Route("{id}")]
        public async Task<Table> Get(int id) => await business.GetById<Table>(id);

        [HttpPost]
        [ValidateModel]
        [RequireAdmin]
        public async Task<Table> Create([FromBody] TableCreate table) => await business.Create<Table>(table);

        [HttpPut]
        [ValidateModel]
        [RequireSaleEmp]
        public async Task<Table> Update([FromBody] Table table) => await business.Update<Table>(table);

        [HttpDelete]
        [Route("{id}")]
        [RequireAdmin]
        public async Task Delete(int id) => await business.Delete(id);
    }
}
