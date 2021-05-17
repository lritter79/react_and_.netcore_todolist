using Microsoft.AspNetCore.Identity;
using react_crash_2021.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Models
{
    /// <summary>
    /// Represent an app user
    /// </summary>
    public class ReactCrashUserModel : IdentityUser<Guid>
    {
        public IEnumerable<TaskModel> Tasks { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsOpenToCollaboration { get; set; }
        public IEnumerable<CategoryModel> Categories { get; set; }
        public IEnumerable<TaskModel> Collaborations { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Bio { get; set; }
        public string Organization { get; set; }
    }
}
