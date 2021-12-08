using DataModels.Base;
using System;

namespace BusinessLogic.Dtos.Report
{
    public class ReceiptMaterialDetail : IdBase
    {
        public DateTime DateTime { get; set; }

        public string MaterialName { get; set; }

        public int Amount { get; set; }

        public string Unit { get; set; }

        public long? UnitPrice { get; set; }

        public long? Total { get; set; }
    }
}
