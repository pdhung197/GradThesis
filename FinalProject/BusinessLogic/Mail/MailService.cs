using DataModels.Utils;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace BusinessLogic.Mail
{
    public class MailService : IMailService
    {
        private readonly string templatePath = "EmailTemplates";

        private readonly EmailSettings emailSettings;

        public MailService(EmailSettings emailSettings)
        {
            this.emailSettings = emailSettings;
        }

        public async Task Send(string to, string body, string title)
        {
            var mail = new MailMessage
            {
                From = new MailAddress(emailSettings.EmailAccount, emailSettings.DisplayName),
                Subject = title,
                Body = body,
                IsBodyHtml = true,
                Priority = MailPriority.High
            };

            mail.To.Add(new MailAddress(to));

            using var smtp = new SmtpClient(emailSettings.Host, emailSettings.Port)
            {
                Credentials = new NetworkCredential(emailSettings.EmailAccount, emailSettings.Password),
                EnableSsl = true
            };

            await smtp.SendMailAsync(mail);
        }

        public async Task Send(string to, string templateName, Dictionary<string, string> values)
        {
            var html = await File.ReadAllTextAsync(Path.Combine(this.templatePath, templateName));

            html = values.Aggregate(html, (current, item) => current.Replace(item));

            var title = html.FindFirst("<title>(.*)<\\/title>");

            await Send(to, html, title);
        }
    }
}
