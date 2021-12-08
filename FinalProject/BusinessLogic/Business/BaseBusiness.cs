using DataModels;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Business
{
    public class BaseBusiness
    {
        protected DataContext Context;

        protected BaseBusiness(DataContext context)
        {
            Context = context;
        }

        protected void AddEntry<T>(T entry)
        {
            Context.Entry(entry).State = EntityState.Added;
        }

        protected void UpdateEntry<T>(T existing, T updated)
        {
            Context.Entry(existing).CurrentValues.SetValues(updated);
        }

        protected void DeleteEntry<T>(T entry)
        {
            Context.Entry(entry).State = EntityState.Deleted;
        }
    }
}
