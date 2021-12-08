using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLogic.Contract;
using BusinessLogic.Dtos.Attachment;
using BusinessLogic.Dtos.Promotion;
using BusinessLogic.Utils;
using DataModels.Entities;
using DataModels.Params;
using FinalProject.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinalProject.Controllers
{
    [Route("api/promotions")]
    [ApiController]
    public class PromotionController : ControllerBase
    {
        private readonly IPromotionBusiness business;

        public PromotionController(IPromotionBusiness business)
        {
            this.business = business;
        }

        [HttpGet]
        public async Task<List<Promotion>> GetAll([FromQuery] SearchDateParams dateParams)
        {
            var promotions = await business.SearchByDate<Promotion>(dateParams);
            Response.AddPagination(promotions.CurrentPage, promotions.PageSize, promotions.TotalItems, promotions.TotalPages);
            return promotions;
        }

        [HttpGet]
        [Route("all")]
        public async Task<List<Promotion>> GetAll() => await business.GetAll<Promotion>();

        [HttpGet]
        [Route("{id}")]
        public async Task<Promotion> Get(int id) => await business.GetById<Promotion>(id);

        [HttpPost]
        [ValidateModel]
        [Authorize]
        [RequireSaleEmp]
        public async Task<Promotion> Create([FromBody] PromotionCreate promotion) => await business.CreatePromotion(promotion);

        [HttpPut]
        [ValidateModel]
        [Authorize]
        [RequireSaleEmp]
        public async Task<Promotion> Update([FromBody] PromotionUpdate promotion) => await business.UpdatePromotion(promotion);


        [HttpPut]
        [Route("{id}/files")]
        [ValidateModel]
        [Authorize]
        [RequireSaleEmp]
        public async Task UploadImage(int id, [FromForm] PromotionImageUpload image) => await business.UploadImage(id, image);

        [HttpPut]
        [Route("{id}/confirm")]
        [Authorize]
        [RequireAdmin]
        public async Task ConfirmPromotion(int id) => await business.ConfirmPromotion(id);

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        [RequireSaleEmp]
        public async Task Delete(int id) => await business.Delete(id);
    }
}
