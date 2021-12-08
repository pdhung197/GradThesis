using DataModels.Base;
using System.Collections.Generic;

namespace BusinessLogic.Configurable
{
    public interface IConfigurableBusiness
    {
        List<T> GetAll<T>() where T : IdBase;
    }
}
