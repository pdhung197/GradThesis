using DataModels.Exceptions;
using FinalProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FinalProject.Handlers
{
    public class HandledExceptionHandle : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is BaseException exception)
            {
                context.Result = new ObjectResult(new ErrorModel(exception.Message))
                {
                    StatusCode = (int)exception.StatusCode
                };
            }
        }
    }
}