using BusinessLogic.Contract;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace FinalProject.Handlers
{
    public class UpdateBookingStatus : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var service = context.HttpContext.RequestServices.GetService<ITableBusiness>();
            service.UpdateBookingStatus();
        }
    }
}
