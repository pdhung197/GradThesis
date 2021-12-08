using FinalProject.Handlers;
using Microsoft.AspNetCore.Mvc;

namespace FinalProject.Configs
{
    public static class FilterHelper
    {
        public static void Register(this MvcOptions options)
        {
            options.Filters.Add(typeof(HandledExceptionHandle));
            options.Filters.Add(typeof(ValidateModelAttribute));
        }
    }
}
