using System.Net;

namespace DataModels.Exceptions
{
    public class BadRequestException : BaseException
    {
        public BadRequestException(string msg) : base(HttpStatusCode.BadRequest, msg)
        {
        }
    }
}
