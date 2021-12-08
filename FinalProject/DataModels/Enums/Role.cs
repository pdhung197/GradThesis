using System.Text.Json.Serialization;

namespace DataModels.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Role
    {
        ADMIN,
        SALE_EMP,
        STORE_EMP
    }
}
