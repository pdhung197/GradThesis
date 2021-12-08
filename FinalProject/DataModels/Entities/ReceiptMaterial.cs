using DataModels.Base;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels.Entities
{
    public class ReceiptMaterial : IdBase
    {
        public int? ProviderId { get; set; }

        [ForeignKey(nameof(ProviderId))]
        public Provider Provider { get; set; }

        public int MaterialId { get; set; }

        [ForeignKey(nameof(MaterialId))]
        public Material Material { get; set; }

        public DateTime DateTime { get; set; }

        public int Amount { get; set; }

        public long? UnitPrice { get; set; }

        public string Unit { get; set; }

        public string Note { get; set; }
    }
}
