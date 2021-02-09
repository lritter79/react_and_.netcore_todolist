using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace react_crash_2021.Data.Entities
{
    public class task
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }
        public string text { get; set; }
        public DateTime task_date{ get; set; }
        public Boolean reminder { get; set; }
        public string details { get; set; }
        public string location { get; set; }
    }
}
