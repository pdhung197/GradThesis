using BusinessLogic.Contract;
using DataModels.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace FinalProject.Controllers
{
    [Route("api/attachments")]
    public class AttachmentController : ControllerBase
    {
        private readonly IGenericBusiness<Attachment> business;

        public AttachmentController(IGenericBusiness<Attachment> business)
        {
            this.business = business;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<FileStreamResult> Get(int id)
        {
            var file = await business.GetById<Attachment>(id);
            var filePath = Path.Combine("Attachments", file.Folder, file.Name);
            var stream = System.IO.File.OpenRead(filePath);

            return File(stream, file.ContentType);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task Delete(int id) => await business.Delete(id);
    }
}
