using BusinessLogic.Dtos.Booking;
using BusinessLogic.Dtos.Table;
using BusinessLogic.Utils;
using DataModels.Entities;
using DataModels.Params;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Contract
{
    public interface IBookingBusiness : IGenericBusiness<Booking>
    {
        Task<PagedList<Booking>> SearchBookings(SearchBookingParams searchParams);

        Task<PagedList<Booking>> SearchWeddingBookings(SearchBookingParams searchParams);

        Task<Booking> GetByTableId(int tableId);

        Task<List<TableForBooking>> GetTablesForBooking(int bookingId);

        Task<Booking> CreateBooking(BookingCreate booking);

        Task AssignTable(int bookingId, int tableId);

        Task AddOrders(int bookingId, List<BookingOrderCreate> orders);

        Task UpdateOrders(int bookingId, List<BookingOrderCreate> orders);

        Task<List<BookingOrderCreate>> GetOrders(int bookingId);
    }
}
