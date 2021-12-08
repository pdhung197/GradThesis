using DataModels.Base;

namespace DataModels.Entities
{
    public class Provider : NameBase
    {
        public string Phone { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public string Note { get; set; }
    }
}
