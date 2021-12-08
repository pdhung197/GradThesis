using BusinessLogic.Contract;
using BusinessLogic.Dtos.Material;
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
    [Route("api/materials")]
    [Authorize]
    public class MaterialController : ControllerBase
    {
        private readonly IGenericBusiness<Material> business;

        public MaterialController(IGenericBusiness<Material> business)
        {
            this.business = business;
        }

        [HttpGet]
        public async Task<PagedList<Material>> GetAll([FromQuery] SearchParams searchParams)
        {
            var materials = await business.GetAll<Material>(searchParams);
            Response.AddPagination(materials.CurrentPage, materials.PageSize, materials.TotalItems, materials.TotalPages);
            return materials;
        }

        [HttpGet]
        [Route("all")]
        public async Task<List<Material>> GetAll() => await business.GetAll<Material>();

        [HttpGet]
        [Route("{id}")]
        public async Task<Material> Get(int id) => await business.GetById<Material>(id);

        [HttpPost]
        [ValidateModel]
        [RequireStoreEmp]
        public async Task<Material> Create([FromBody] MaterialCreate material) => await business.Create<Material>(material);

        [HttpPut]
        [ValidateModel]
        [RequireStoreEmp]
        public async Task<Material> Update([FromBody] Material material) => await business.Update<Material>(material);

        [HttpDelete]
        [Route("{id}")]
        [RequireStoreEmp]
        public async Task Delete(int id) => await business.Delete(id);
    }
}
