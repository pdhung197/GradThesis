using DataModels.Base;
using System;

namespace BusinessLogic.Dtos.ReceiptMaterial
{
    public class ReceiptMaterialUpdate : IdBase
    {
        public int? ProviderId { get; set; }

        public int MaterialId { get; set; }

        public DateTime DateTime { get; set; }

        public int Amount { get; set; }

        public int UnitPrice { get; set; }

        public string Unit { get; set; }
    }
}
