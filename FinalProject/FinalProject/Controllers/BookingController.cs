using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLogic.Contract;
using BusinessLogic.Dtos.Booking;
using BusinessLogic.Dtos.Table;
using BusinessLogic.Utils;
using DataModels.Entities;
using DataModels.Params;
using FinalProject.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinalProject.Controllers
{
    [Route("api/bookings")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingBusiness business;

        public BookingController(IBookingBusiness business)
        {
            this.business = business;
        }

        [HttpGet]
        [Authorize]
        [RequireSaleEmp]
        public async Task<PagedList<Booking>> GetAll([FromQuery] SearchBookingParams searchParams)
        {
            var bookings = await business.SearchBookings(searchParams);
            Response.AddPagination(bookings.CurrentPage, bookings.PageSize, bookings.TotalItems, bookings.TotalPages);
            return bookings;
        }

        [HttpGet]
        [Route("wedding")]
        [Authorize]
        [RequireSaleEmp]
        public async Task<PagedList<Booking>> GetAllWeddingBookings([FromQuery] SearchBookingParams searchParams)
        {
            var bookings = await business.SearchWeddingBookings(searchParams);
            Response.AddPagination(bookings.CurrentPage, bookings.PageSize, bookings.TotalItems, bookings.TotalPages);
            return bookings;
        }

        [HttpGet]
        [Route("all")]
        [Authorize]
        [RequireSaleEmp]
        public async Task<List<Booking>> GetAll() => await business.GetAll<Booking>();

        [HttpGet]
        [Route("tables/{id}")]
        [Authorize]
        [RequireSaleEmp]
        public async Task<List<TableForBooking>> GetTables(int id) => await business.GetTablesForBooking(id);


        [HttpGet]
        [Route("{id}")]
        public async Task<Booking> Get(int id) => await business.GetById<Booking>(id);

        [HttpGet]
        [Route("table/{tableId}")]
        [Authorize]
        [RequireSaleEmp]
        public async Task<Booking> GetByTableId(int tableId) => await business.GetByTableId(tableId);

        [HttpPost]
        [ValidateModel]
        public async Task<Booking> Create([FromBody] BookingCreate booking) => await business.CreateBooking(booking);

        [HttpPost]
        [Route("{bookingId}/orders")]
        [ValidateModel]
        public async Task AddOrders(int bookingId, [FromBody] List<BookingOrderCreate> orders) => await business.AddOrders(bookingId, orders);

        [HttpPut]
        [Route("{bookingId}/orders")]
        [ValidateModel]
        public async Task UpdateOrders(int bookingId, [FromBody] List<BookingOrderCreate> orders) => await business.UpdateOrders(bookingId, orders);

        [HttpGet]
        [Route("{bookingId}/orders")]
        [ValidateModel]
        public async Task GetOrders(int bookingId) => await business.GetOrders(bookingId);

        [HttpPut]
        [ValidateModel]
        [Authorize]
        [RequireSaleEmp]
        public async Task<Booking> Update([FromBody] Booking booking) => await business.Update<Booking>(booking);

        [HttpPut]
        [Route("{bookingId}/table/{tableId}")]
        [Authorize]
        [RequireSaleEmp]
        public async Task AssignTable(int bookingId, int tableId) => await business.AssignTable(bookingId, tableId);

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        [RequireAdmin]
        public async Task Delete(int id) => await business.Delete(id);
    }
}
