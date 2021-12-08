using BusinessLogic.Contract;
using BusinessLogic.Dtos.Attachment;
using BusinessLogic.Dtos.Dish;
using BusinessLogic.Utils;
using DataModels.Params;
using FinalProject.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinalProject.Controllers
{
    [Route("api/dishes")]
    public class DishController : ControllerBase
    {
        private readonly IDishBusiness business;

        public DishController(IDishBusiness business)
        {
            this.business = business;
        }

        [HttpGet]
        public async Task<PagedList<DishResponse>> GetAll([FromQuery] SearchDishParams searchParams)
        {
            var dishes = await business.SearchByCategoryAndName<DishResponse>(searchParams);
            Response.AddPagination(dishes.CurrentPage, dishes.PageSize, dishes.TotalItems, dishes.TotalPages);
            return dishes;
        }

        [HttpGet]
        [Route("all")]
        public List<DishResponse> GetAllByCategory([FromQuery] SearchDishParams searchParams) => business.GetAllByCategory<DishResponse>(searchParams);

        [HttpGet]
        [Route("{id}")]
        public async Task<DishRecipeResponse> Get(int id) => await business.GetById<DishRecipeResponse>(id);

        [HttpPost]
        [ValidateModel]
        [Authorize]
        [RequireAdmin]
        public async Task<DishResponse> Create([FromBody] DishCreate dish) => await business.Create<DishResponse>(dish);

        [HttpPut]
        [ValidateModel]
        [Authorize]
        [RequireAdmin]
        public async Task<DishResponse> Update([FromBody] DishUpdate dish) => await business.Update<DishResponse>(dish);

        [HttpPut]
        [Route("{id}")]
        [ValidateModel]
        [Authorize]
        public async Task UpdateRecipe(int id, [FromBody] List<RecipeUpdate> recipes) => await business.UpdateRecipe(id, recipes);

        [HttpPut]
        [Route("{id}/files")]
        [ValidateModel]
        [Authorize]
        [RequireSaleEmp]
        public async Task UploadImage(int id, [FromForm] DishImageUpload image) => await business.UploadImage(id, image);

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        [RequireAdmin]
        public async Task Delete(int id) => await business.Delete(id);
    }
}
