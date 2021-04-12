using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Entities
{
    public class reactCrashUser : IdentityUser<Guid>
    {
        public IEnumerable<TaskEntity> tasks { get; set; }
        public DateTime? dateCreated { get; set; }
        public bool isOpenToCollaboration { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zip { get; set; }
        public string bio { get; set; }
        public string organization { get; set; }
        public IEnumerable<Collaboration> collaboratorations { get; set; }
        public IEnumerable<alert> alerts { get; set; }
    }
}
