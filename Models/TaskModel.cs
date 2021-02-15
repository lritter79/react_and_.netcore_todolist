using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Models
{
    public class TaskModel
    {
        public long Id { get; set; }
        [Required]
        [MaxLength(30)]
        public string Text { get; set; }
        [Required]
        public DateTime Day { get; set; }
        public Boolean Reminder { get; set; }
        public string Details { get; set; }
        public string Location { get; set; }
    }
}
