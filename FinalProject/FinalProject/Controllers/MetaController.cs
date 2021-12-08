using BusinessLogic.Configurable;
using DataModels.Configurable;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace FinalProject.Controllers
{
    [Route("api/meta")]
    public class MetaController : Controller
    {
        private readonly IConfigurableBusiness business;

        public MetaController(IConfigurableBusiness business)
        {
            this.business = business;
        }

        [HttpGet("employee-categories")]
        public List<EmployeeCategory> GetEmployeeCategories() => business.GetAll<EmployeeCategory>();
    }
}
