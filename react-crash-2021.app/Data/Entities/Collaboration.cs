using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Entities
{
    public class Collaboration
    {
        public long task_id { get; set; }
        public TaskEntity task { get; set; }
        public Guid user_id { get; set; }
        public reactCrashUser user { get; set; }
    }
}
