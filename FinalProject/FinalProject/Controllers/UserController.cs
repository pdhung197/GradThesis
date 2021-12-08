using BusinessLogic.Contract;
using BusinessLogic.Dtos.User;
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
    [Route("api/users")]
    [Authorize]
    [RequireAdmin]
    public class UserController : ControllerBase
    {
        private readonly IGenericBusiness<User> business;

        public UserController(IGenericBusiness<User> business)
        {
            this.business = business;
        }

        [HttpGet]
        public async Task<PagedList<UserResponse>> GetAll([FromQuery] SearchParams searchParams)
        {
            var users = await business.GetAll<UserResponse>(searchParams);
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalItems, users.TotalPages);
            return users;
        }

        [HttpGet]
        [Route("all")]
        public async Task<List<UserResponse>> GetAll() => await business.GetAll<UserResponse>();

        [HttpGet]
        [Route("{id}")]
        public async Task<UserResponse> Get(int id) => await business.GetById<UserResponse>(id);

        [HttpPost]
        [ValidateModel]
        //[Authorize]
        public async Task<UserResponse> Create([FromBody] UserCreate user) => await business.Create<UserResponse>(user);

        [HttpPut]
        [ValidateModel]
        //[Authorize]
        public async Task<UserResponse> Update([FromBody] User user) => await business.Update<UserResponse>(user);

        [HttpDelete]
        [Route("{id}")]
        //[Authorize]
        public async Task Delete(int id) => await business.Delete(id);
    }
}
