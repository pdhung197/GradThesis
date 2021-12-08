using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Mail
{
    public interface IMailService
    {
        Task Send(string to, string body, string title);

        Task Send(string to, string templateName, Dictionary<string, string> values);
    }
}
