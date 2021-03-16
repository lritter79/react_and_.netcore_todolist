using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace react_crash_2021.Data.Entities
{
    public class TaskEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }
        public string text { get; set; }
        public DateTime task_date { get; set; }
        public bool reminder { get; set; }
        public bool is_completed {get; set;}
        public DateTime? date_completed { get; set; }
        public string details { get; set; }
        public string location { get; set; }
        public string category { get; set; }
        public reactCrashUser user { get; set; }
 

        public IEnumerable<Collaboration> collaboratorations { get; set; }
        public IEnumerable<comment> comments { get; set; }
        

    }
}
