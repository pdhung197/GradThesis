namespace FinalProject.Models
{
    public class ErrorModel
    {
        public string Message { get; }

        public ErrorModel(string message)
        {
            Message = message;
        }
    }
}
