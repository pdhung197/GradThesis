using DataModels.Base;
using DataModels.Enums;
using System;
using System.Collections.Generic;

namespace BusinessLogic.Dtos.Promotion
{
    public class PromotionUpdate : IdBase
    {
        public string Describe { get; set; }

        public string Detail { get; set; }

        public int? AttachmentId { get; set; }

        public DiscountType DiscountType { get; set; }

        public int DiscountAmount { get; set; }

        public PromotionType PromotionType { get; set; }

        public long? BillCondition { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public List<DishPromotionCreate> Dishes { get; set; }

        public List<CustomerPromotionCreate> Customers { get; set; }
    }
}
