using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Entities
{
    public class comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }
        [ForeignKey("task_id")]
        [Required]
        public TaskEntity task { get; set; }
        [ForeignKey("user_id")]
        [Required]
        public reactCrashUser user { get; set; }

        public string text { get; set; }
        public DateTime date { get; set; }
    }
}
