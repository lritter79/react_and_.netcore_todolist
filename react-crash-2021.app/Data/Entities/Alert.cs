using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Entities
{
    public class alert
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }
        [ForeignKey("user_id")]
        [Required]
        public reactCrashUser user { get; set; }
        public string message { get; set; }
        public DateTime data { get; set; }
    }
}
