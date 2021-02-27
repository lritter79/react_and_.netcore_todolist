using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Models
{
    public interface IJwtAuthenticationManager
    {
        public string Authenticate(LoginModel loginModel);
    }
}
