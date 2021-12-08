using System.ComponentModel.DataAnnotations;

namespace DataModels.Base
{
    public class IdBase
    {
        [Key]
        public int Id { get; set; }

        public bool Deleted { get; set; } = false;
    }
}
