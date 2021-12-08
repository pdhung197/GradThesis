using BusinessLogic.Handlers;
using Microsoft.AspNetCore.Http;
using System;

namespace BusinessLogic.Dtos.Attachment
{
    public class DishImageUpload
    {
        [AllowedExtensions(".png", ".jpeg", ".jpg", ".gif")]
        public IFormFile File { get; set; }

        public DateTime UploadDateTime { get; set; } = DateTime.Now;

        public string Folder { get; set; } = "Dishes";
    }
}
