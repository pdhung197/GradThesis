using BusinessLogic.Dtos.Bill;
using System;
using System.Collections.Generic;

namespace BusinessLogic.Dtos.Report
{
    public class BillDetail
    {
        public DateTime DateTime { get; set; }

        public long? Total { get; set; }

        public List<BillResponse> Bills { get; set; }
    }
}
