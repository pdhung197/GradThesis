using DataModels.Base;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

namespace BusinessLogic.Configurable
{
    public class ConfigurableBusiness : IConfigurableBusiness
    {
        public List<T> GetAll<T>() where T : IdBase
        {
            var filePath = Path.Combine("Configurable", $"{typeof(T).Name}.json");
            var data = File.ReadAllText(filePath);

            return JsonConvert.DeserializeObject<List<T>>(data);
        }
    }
}
