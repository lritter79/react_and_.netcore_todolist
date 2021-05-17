using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Entities
{
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }
        public string name { get; set; }
        public IEnumerable<TaskEntity> tasks { get; set; }
        [ForeignKey("user_id")]
        public reactCrashUser user { get; set; }
        public string color { get; set; }
    }
}
