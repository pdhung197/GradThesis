using DataModels.Base;
using DataModels.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels.Entities
{
    public class Promotion : IdBase
    {
        public string Describe { get; set; }

        public string Detail { get; set; }

        public int? AttachmentId { get; set; }

        [ForeignKey(nameof(AttachmentId))]
        public Attachment Attachment { get; set; }

        public DiscountType DiscountType { get; set; }

        public int DiscountAmount { get; set; }

        public PromotionType PromotionType { get; set; }

        public long? BillCondition { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public bool Confirmed { get; set; } = false;

        public virtual List<DishPromotion> Dishes { get; set; } = new List<DishPromotion>();

        public virtual List<CustomerPromotion> Customers { get; set; } = new List<CustomerPromotion>();
    }
}
