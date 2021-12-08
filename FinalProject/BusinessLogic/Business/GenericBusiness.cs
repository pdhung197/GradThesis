using BusinessLogic.Contract;
using BusinessLogic.Utils;
using DataModels;
using DataModels.Base;
using DataModels.Exceptions;
using DataModels.Params;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BusinessLogic.Business
{
    public class GenericBusiness<T> : BaseBusiness, IGenericBusiness<T> where T : IdBase
    {
        protected readonly DbSet<T> Entries;

        public GenericBusiness(DataContext context) : base(context)
        {
            Entries = Context.Set<T>();
        }

        public virtual async Task<List<TO>> GetAll<TO>()
        {
            return (await Entries.Where(e => e.Deleted != true).ToListAsync()).ConvertTo<List<TO>>();
        }

        public virtual async Task<PagedList<TO>> GetAll<TO>(PaginationParams pagingParams)
        {
            return (await PagedList<T>.Create(Entries.Where(e => e.Deleted != true), pagingParams.PageNumber, pagingParams.PageSize))
                .ConvertTo<PagedList<TO>>();
        }

        public virtual async Task<PagedList<TO>> GetAll<TO>(SearchParams searchParams)
        {
            return (await PagedList<T>.Create(Entries.Where(e => e.Deleted != true), searchParams.PageNumber, searchParams.PageSize))
                .ConvertTo<PagedList<TO>>();
        }

        public virtual async Task<TO> GetById<TO>(int id)
        {
            return (await Entries.FindAsync(id)
                ?? throw new BadRequestException("Không tìm thấy đối tượng này trong cơ sở dữ liệu."))
                .ConvertTo<TO>();
        }

        public virtual async Task<TO> Create<TO>(object o)
        {
            var entry = o.ConvertTo<T>();
            Context.Entry(entry).State = EntityState.Added;
            await Context.SaveChangesAsync();

            return entry.ConvertTo<TO>();
        }

        public virtual async Task<TO> Update<TO>(IdBase o)
        {
            var existing = await Entries.FirstOrDefaultAsync(x => x.Id == o.Id)
                ?? throw new BadRequestException("Không tìm thấy đối tượng này trong cơ sở dữ liệu.");
            var updated = o.ConvertTo<T>();

            Context.Entry(existing).CurrentValues.SetValues(updated);

            await Context.SaveChangesAsync();

            return existing.ConvertTo<TO>();
        }

        public virtual async Task Delete(int id)
        {
            await Delete(await Entries.FindAsync(id));
        }

        public async Task Delete(T entry)
        {
            entry = entry ?? throw new BadRequestException("Không tìm thấy đối tượng này trong cơ sở dữ liệu");
            //DeleteEntry(entry);
            entry.Deleted = true;
            await Context.SaveChangesAsync();
        }

        public async Task HardDelete(T entry)
        {
            entry = entry ?? throw new BadRequestException("Không tìm thấy đối tượng này trong cơ sở dữ liệu");
            DeleteEntry(entry);
            await Context.SaveChangesAsync();
        }

        public async Task<bool> Exist(Expression<Func<T, bool>> predicate)
        {
            return await Entries.AnyAsync(predicate);
        }

        public async Task SaveAll()
        {
            await Context.SaveChangesAsync();
        }
    }
}
