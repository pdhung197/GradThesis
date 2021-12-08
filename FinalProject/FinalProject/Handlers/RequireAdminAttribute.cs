using DataModels.Enums;
using BusinessLogic.Handlers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using FinalProject.Models;

namespace FinalProject.Handlers
{
    public class RequireAdminAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var user = context.HttpContext.User as UserClaimsPrincipal;

            if (user.UserIdentity.User.Role != Role.ADMIN)
            {
                context.Result = new UnauthorizedObjectResult(new ErrorModel("Bạn không có quyền truy cập trang này"));
            }
        }
    }

    public class RequireSaleEmpAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var user = context.HttpContext.User as UserClaimsPrincipal;

            if (user.UserIdentity.User.Role != Role.SALE_EMP && user.UserIdentity.User.Role != Role.ADMIN)
            {
                context.Result = new UnauthorizedObjectResult(new ErrorModel("Bạn không có quyền truy cập trang này"));
            }
        }
    }

    public class RequireStoreEmpAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var user = context.HttpContext.User as UserClaimsPrincipal;

            if (user.UserIdentity.User.Role != Role.STORE_EMP && user.UserIdentity.User.Role != Role.ADMIN)
            {
                context.Result = new UnauthorizedObjectResult(new ErrorModel("Bạn không có quyền truy cập trang này"));
            }
        }
    }
}
