using DataModels.Base;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels.Entities
{
    public class Dish : NameBase
    {
        public string Unit { get; set; }

        public long Price { get; set; }

        public string Description { get; set; }

        public int? CategoryId { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public DishCategory Category { get; set; }

        public virtual List<DishRecipe> Recipes { get; set; } = new List<DishRecipe>();

        public int? AttachmentId { get; set; }

        [ForeignKey(nameof(AttachmentId))]
        public Attachment Attachment { get; set; }
    }
}
