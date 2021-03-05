using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Models
{
    /// <summary>
    /// Represents an instance of a task that the user will interact with
    /// </summary>
    public class TaskModel
    {
        public long Id { get; set; }
        [Required]
        [MaxLength(30)]
        public string Text { get; set; }
        [Required]
        public DateTime Day { get; set; }
        public bool Reminder { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime DateCompleted { get; set; }
        public string Details { get; set; }
        public string Location { get; set; }
        public Guid UserId { get; set; }
    }
}
