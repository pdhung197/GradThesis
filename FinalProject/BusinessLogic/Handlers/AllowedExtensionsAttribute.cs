using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;

namespace BusinessLogic.Handlers
{
    public class AllowedExtensionsAttribute : ValidationAttribute
    {
        private readonly string[] extensions;

        private string extension;

        public AllowedExtensionsAttribute(params string[] extensions)
        {
            this.extensions = extensions;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value is IFormFile file)
            {
                extension = Path.GetExtension(file.FileName);

                if (string.IsNullOrEmpty(extension))
                {
                    return new ValidationResult("Không định dạng được file");
                }

                if (!extensions.Any(x => string.Equals(x, extension, StringComparison.CurrentCultureIgnoreCase)))
                {
                    return new ValidationResult($"Định dạng file ({extension}) không được phép! Các định dạng file được phép: ({string.Join(", ", extensions)})");
                }
            }

            return ValidationResult.Success;
        }
    }
}
