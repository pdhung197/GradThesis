using BusinessLogic.Contract;
using BusinessLogic.Dtos.Customer;
using BusinessLogic.Utils;
using DataModels.Entities;
using DataModels.Params;
using FinalProject.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinalProject.Controllers
{
    [Route("api/customers")]
    [Authorize]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerBusiness business;

        public CustomerController(ICustomerBusiness business)
        {
            this.business = business;
        }

        [HttpGet]
        public async Task<PagedList<Customer>> GetAll([FromQuery] SearchParams searchParams)
        {
            var customers = await business.GetAll<Customer>(searchParams);
            Response.AddPagination(customers.CurrentPage, customers.PageSize, customers.TotalItems, customers.TotalPages);
            return customers;
        }

        [HttpGet]
        [Route("all")]
        public async Task<List<Customer>> GetAll() => await business.GetAll<Customer>();

        [HttpGet]
        [Route("{id}")]
        public async Task<Customer> Get(int id) => await business.GetById<Customer>(id);

        [HttpGet]
        [Route("{id}/bills")]
        public async Task<List<Bill>> GetBills(int id) => await business.GetBills(id);

        [HttpPost]
        [ValidateModel]
        [RequireAdmin]
        public async Task<Customer> Create([FromBody] CustomerCreate customer) => await business.Create<Customer>(customer);

        [HttpPut]
        [ValidateModel]
        [RequireSaleEmp]
        public async Task<Customer> Update([FromBody] Customer customer) => await business.Update<Customer>(customer);

        [HttpDelete]
        [Route("{id}")]
        [RequireAdmin]
        public async Task Delete(int id) => await business.Delete(id);
    }
}
