using DataModels.Base;
using System;
using System.Text.Json.Serialization;

namespace DataModels.Entities
{
    public class Attachment : IdBase
    {
        public string Name { get; set; }

        public DateTime UploadDateTime { get; set; }

        public string Folder { get; set; }

        public string ContentType { get; set; }

        [JsonIgnore]
        public Dish Dish { get; set; }

        [JsonIgnore]
        public Promotion Promotion { get; set; }
    }
}
