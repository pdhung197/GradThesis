using System.Text.Json.Serialization;

namespace DataModels.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TableStatus
    {
        Available,
        Booked,
        Seated
    }
}
