using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLogic.Contract;
using BusinessLogic.Dtos.DishCategory;
using DataModels.Entities;
using FinalProject.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinalProject.Controllers
{
    [Route("api/dish-categories")]
    public class DishCategoryController : ControllerBase
    {
        private readonly IGenericBusiness<DishCategory> business;

        public DishCategoryController(IGenericBusiness<DishCategory> business)
        {
            this.business = business;
        }

        [HttpGet]
        public async Task<List<DishCategory>> GetAll() => await business.GetAll<DishCategory>();

        [HttpGet]
        [Route("{id}")]
        public async Task<DishCategory> Get(int id) => await business.GetById<DishCategory>(id);

        [HttpPost]
        [ValidateModel]
        [Authorize]
        [RequireAdmin]
        public async Task<DishCategory> Create([FromBody] DishCategoryCreate category) => await business.Create<DishCategory>(category);

        [HttpPut]
        [ValidateModel]
        [Authorize]
        [RequireAdmin]
        public async Task<DishCategory> Update([FromBody] DishCategory category) => await business.Update<DishCategory>(category);

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        [RequireAdmin]
        public async Task Delete(int id) => await business.Delete(id);
    }
}
