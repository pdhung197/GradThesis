using DataModels.Base;
using DataModels.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels.Entities
{
    public class User : NameBase
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public Role Role { get; set; }

        public int? EmployeeId { get; set; }

        [ForeignKey(nameof(EmployeeId))]
        public Employee Employee { get; set; }
    }
}
