using System.Text.Json.Serialization;

namespace DataModels.Enums
{

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum BookingStatus
    {
        NotConfirmed,
        Confirmed,
        NotArrived,
        Cancelled,
        Finished
    }
}
