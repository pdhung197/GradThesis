using System.Net;

namespace DataModels.Exceptions
{
    public class ForbiddenException : BaseException
    { 
        public ForbiddenException(string msg) : base(HttpStatusCode.Forbidden, msg)
        {
        }
    }
}
