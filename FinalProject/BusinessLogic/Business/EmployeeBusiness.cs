using BusinessLogic.Contract;
using BusinessLogic.Utils;
using DataModels;
using DataModels.Entities;
using DataModels.Exceptions;
using DataModels.Params;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Business
{
    public class EmployeeBusiness : GenericBusiness<Employee>, IEmployeeBusiness
    {
        public EmployeeBusiness(DataContext context) : base(context)
        {
        }

        public async Task<PagedList<TO>> SearchByCategoryAndName<TO>(SearchEmployeeParams searchParams)
        {
            var entries = Entries.AsQueryable();

            if (searchParams.CategoryId != null)
            {
                entries = entries.Where(d => d.EmployeeCategoryId == searchParams.CategoryId);
            }

            if (!string.IsNullOrWhiteSpace(searchParams.Name))
            {
                entries = entries.Where(d => d.Name.ToLower().StartsWith(searchParams.Name.ToLower()));
            }

            return (await PagedList<Employee>.Create(entries, searchParams.PageNumber, searchParams.PageSize))
                .ConvertTo<PagedList<TO>>();
        }

        public override async Task Delete(int id)
        {
            if (await Context.Users.AnyAsync(u => u.EmployeeId == id))
            {
                throw new BadRequestException("Nhân viên này hiện đang có tài khoản trong hệ thống");
            }

            var employee = await Entries.FindAsync(id);

            await HardDelete(employee);
        }
    }
}
