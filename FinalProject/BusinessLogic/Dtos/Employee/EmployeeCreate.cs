using DataModels.Enums;

namespace BusinessLogic.Dtos.Employee
{
    public class EmployeeCreate
    {
        public string Name { get; set; }

        public bool Sex { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string IdCardNumber { get; set; }

        public string Address { get; set; }

        public EmployeeStatus Status { get; set; }

        public int? EmployeeCategoryId { get; set; }
    }
}
