using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Models
{
    public class LoginModel
    {
        [Required]
        [StringLength(256)]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
