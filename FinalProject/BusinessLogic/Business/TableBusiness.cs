using BusinessLogic.Contract;
using DataModels;
using DataModels.Entities;
using DataModels.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace BusinessLogic.Business
{
    public class TableBusiness : GenericBusiness<Table>, ITableBusiness
    {
        public TableBusiness(DataContext context) : base(context)
        {
        }

        public void UpdateBookingStatus()
        {
            var bookings = Context.Bookings.Include(b => b.Table)
                .Where(b => b.Status < BookingStatus.Cancelled && b.Deleted != true && b.ForWedding != true)
                .AsEnumerable();
            var currentTime = DateTime.Now;

            foreach (var booking in bookings)
            {
                var timeLeft = Math.Abs((booking.BookingTime - currentTime).TotalHours);

                if ((booking.Status == BookingStatus.Confirmed || booking.Status == BookingStatus.NotArrived) && timeLeft < 8d)
                {
                    booking.Status = BookingStatus.NotArrived;

                    if (booking.TableId != null && booking.Table.Status == TableStatus.Available) booking.Table.Status = TableStatus.Booked;
                }

                if (booking.BookingTime < currentTime && timeLeft > 8d)
                {
                    //if (booking.Status == BookingStatus.NotConfirmed) booking.Status = BookingStatus.Cancelled;
                    //else if (booking.Status != BookingStatus.Cancelled) booking.Status = BookingStatus.Finished;
                    if (booking.Status != BookingStatus.Finished)
                    {
                        booking.Status = BookingStatus.Cancelled;
                        if (booking.TableId != null)
                        {
                            booking.Table.Status = TableStatus.Available;
                        }
                    }
                    if (booking.TableId == null) booking.Status = BookingStatus.Cancelled;
                }
            }

            Context.SaveChanges();
        }
    }
}
