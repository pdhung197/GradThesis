using DataModels.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace BusinessLogic.Utils
{
    public static class AttachmentUtils
    {
        private static readonly string RootFolder = "Attachments";

        public static async Task CreateFile(this Attachment attachment, IFormFile file, string folder)
        {
            var folderPath = Path.Combine(RootFolder, folder);

            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var filePath = GenerateFilePath(folderPath, file.FileName);

            if (file.Length > 0)
            {
                using (var stream = File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }
            }

            attachment.Name = Path.GetFileName(filePath);
            attachment.ContentType = file.ContentType;
        }

        public static void DeleteFile(string fileName, string folder)
        {
            var filePath = Path.Combine(RootFolder, folder, fileName);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }

        private static string GenerateFilePath(string path, string fileName)
        {
            var originalPath = Path.Combine(path, fileName);
            if (File.Exists(originalPath))
            {
                var newFileName = $"{Guid.NewGuid()}{Path.GetExtension(originalPath)}";
                return Path.Combine(path, newFileName);
            }
            return originalPath;
        }
    }
}
