using BusinessLogic.Contract;
using BusinessLogic.Dtos.Employee;
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
    [Route("api/employees")]
    [Authorize]
    [RequireAdmin]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeBusiness business;

        public EmployeeController(IEmployeeBusiness business)
        {
            this.business = business;
        }

        [HttpGet]
        public async Task<List<Employee>> GetAll([FromQuery] SearchEmployeeParams searchParams)
        {
            var employees = await business.SearchByCategoryAndName<Employee>(searchParams);
            Response.AddPagination(employees.CurrentPage, employees.PageSize, employees.TotalItems, employees.TotalPages);
            return employees;
        }

        [HttpGet]
        [Route("all")]
        public async Task<List<Employee>> GetAll() => await business.GetAll<Employee>();


        [HttpGet]
        [Route("{id}")]
        public async Task<Provider> Get(int id) => await business.GetById<Provider>(id);

        [HttpPost]
        [ValidateModel]
        public async Task<Employee> Create([FromBody] EmployeeCreate employee) => await business.Create<Employee>(employee);

        [HttpPut]
        [ValidateModel]
        public async Task<Employee> Update([FromBody] Employee employee) => await business.Update<Employee>(employee);

        [HttpDelete]
        [Route("{id}")]
        public async Task Delete(int id) => await business.Delete(id);
    }
}
