using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Models
{
    public class CategoryModel
    {
        public long Id { get; set; }
        [Required]
        [MaxLength(40)]
        public string Name { get; set; }
        public Guid UserId { get; set; }
    }
}
