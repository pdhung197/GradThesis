using System;

namespace BusinessLogic.Dtos.Customer
{
    public class CustomerCreate
    {
        public string Name { get; set; }

        public DateTime Birthday { get; set; }

        public string Address { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Note { get; set; }
    }
}
