using BusinessLogic.Contract;
using BusinessLogic.Dtos.Provider;
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
    [Route("api/providers")]
    [Authorize]
    public class ProviderController : ControllerBase
    {
        private readonly IGenericBusiness<Provider> business;

        public ProviderController(IGenericBusiness<Provider> business)
        {
            this.business = business;
        }

        [HttpGet]
        [RequireStoreEmp]
        public async Task<List<Provider>> GetAll([FromQuery] SearchParams searchParams)
        {
            var providers = await business.GetAll<Provider>(searchParams);
            Response.AddPagination(providers.CurrentPage, providers.PageSize, providers.TotalItems, providers.TotalPages);
            return providers;
        }

        [HttpGet]
        [Route("all")]
        [RequireStoreEmp]
        public async Task<List<Provider>> GetAll() => await business.GetAll<Provider>();


        [HttpGet]
        [Route("{id}")]
        [RequireStoreEmp]
        public async Task<Provider> Get(int id) => await business.GetById<Provider>(id);

        [HttpPost]
        [ValidateModel]
        [RequireAdmin]
        public async Task<Provider> Create([FromBody] ProviderCreate provider) => await business.Create<Provider>(provider);

        [HttpPut]
        [ValidateModel]
        [RequireAdmin]
        public async Task<Provider> Update([FromBody] Provider provider) => await business.Update<Provider>(provider);

        [HttpDelete]
        [Route("{id}")]
        [RequireAdmin]
        public async Task Delete(int id) => await business.Delete(id);
    }
}
