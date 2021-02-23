using Microsoft.AspNetCore.Identity;
using react_crash_2021.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Models
{
    public class ReactCrashUserModel : IdentityUser<Guid>
    {
        public IEnumerable<TaskModel> Tasks;
        public DateTime DateCreated;
    }
}
