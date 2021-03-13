using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Models
{
    public class AlertModel
    {
        public long Id { get; set; }

        public Guid UserId { get; set; }

        public string Message { get; set; }
        public DateTime Date { get; set; }
    }
}
