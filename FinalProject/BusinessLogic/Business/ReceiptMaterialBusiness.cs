using BusinessLogic.Contract;
using BusinessLogic.Utils;
using DataModels;
using DataModels.Entities;
using DataModels.Exceptions;
using DataModels.Params;
using Microsoft.EntityFrameworkCore;
using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Business
{
    public class ReceiptMaterialBusiness : GenericBusiness<ReceiptMaterial>, IReceiptMaterialBusiness
    {
        public ReceiptMaterialBusiness(DataContext context) : base(context)
        {
        }

        public override async Task<PagedList<TO>> GetAll<TO>(PaginationParams pagingParams)
        {
            var entries = Entries.Include(r => r.Provider).Include(r => r.Material);
            return (await PagedList<ReceiptMaterial>.Create(entries, pagingParams.PageNumber, pagingParams.PageSize))
                .ConvertTo<PagedList<TO>>();
        }

        public async Task<PagedList<TO>> SearchByDateAndType<TO>(SearchReceiptParams searchParams)
        {
            var entries = Entries.Include(r => r.Provider).Include(r => r.Material)
                .OrderByDescending(r => r.DateTime).ThenByDescending(r => r.Id)
                .AsQueryable();

            if (searchParams.Date != null)
            {
                var date = DateTime.ParseExact(searchParams.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                entries = entries.Where(r => r.DateTime.Date == date.Date);
            }

            if (!string.IsNullOrWhiteSpace(searchParams.Type))
            {
                if (string.Equals(searchParams.Type, "out"))
                {
                    entries = entries.Where(r => r.Amount < 0);
                }
                else
                {
                    entries = entries.Where(r => r.Amount > 0);
                }
            }

            return (await PagedList<ReceiptMaterial>.Create(entries, searchParams.PageNumber, searchParams.PageSize))
                .ConvertTo<PagedList<TO>>();
        }

        public override async Task<TO> GetById<TO>(int id)
        {
            return (await Entries.Include(r => r.Provider).Include(r => r.Material).FirstOrDefaultAsync(r => r.Id == id)
                ?? throw new BadRequestException("Không tìm thấy lịch sử này trong cơ sở dữ liệu."))
                .ConvertTo<TO>();
        }

        public override async Task<TO> Create<TO>(object o)
        {
            var entry = o.ConvertTo<ReceiptMaterial>();

            var material = await Context.Materials.FindAsync(entry.MaterialId)
                ?? throw new BadRequestException("Không tìm thấy nguyên liệu này trong cơ sở dữ liệu.");

            if (Math.Abs(entry.Amount) <= 0)
            {
                throw new BadRequestException("Vui lòng nhập lượng nguyên liệu nhập/xuất lớn hơn 0");
            }

            if (entry.Amount < 0 && (material.Inventory + entry.Amount) < 0)
            {
                throw new BadRequestException("Lượng nguyên liệu xuất ra lớn hơn lượng nguyên liệu hiện có trong kho");
            }

            AddEntry(entry);

            material.Inventory += entry.Amount;

            await Context.SaveChangesAsync();

            return entry.ConvertTo<TO>();
        }

        public override async Task Delete(int id)
        {
            var receipt = await Entries.FindAsync(id);
            await HardDelete(receipt);
        }
    }
}
