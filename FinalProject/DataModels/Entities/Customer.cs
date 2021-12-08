using DataModels.Base;
using System;

namespace DataModels.Entities
{
    public class Customer : NameBase
    {
        public DateTime Birthday { get; set; }

        public string Address { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Note { get; set; }
    }
}
