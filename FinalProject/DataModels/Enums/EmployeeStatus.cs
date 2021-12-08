using System.Text.Json.Serialization;

namespace DataModels.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum EmployeeStatus
    {
        Working,
        Vacation,
        Left
    }
}
