using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Models
{
    public class TaskModel
    {
        public long Id { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public Boolean Reminder { get; set; }
        public string Details { get; set; }
        public string Location { get; set; }
    }
}
