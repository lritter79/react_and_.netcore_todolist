using Microsoft.AspNetCore.SignalR;
using react_crash_2021.Data.Entities;
using react_crash_2021.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Providers
{
    public class UserProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            //throw new NotImplementedException();
            //return connection.User.FindFirst("sub").Value;
            //var userId = MyCustomUserClass.FindUserId(request.User.Identity.Name);
            //return userId.ToString();

            return connection.User?.Identity?.Name;
            
        }
    }
}
