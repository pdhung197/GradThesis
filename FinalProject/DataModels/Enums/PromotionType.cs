using System.Text.Json.Serialization;

namespace DataModels.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum PromotionType
    {
        DishPromo,
        CustomerPromo,
        BillPromo
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum DiscountType
    {
        Percent,
        Amount
    }
}
