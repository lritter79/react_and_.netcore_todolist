using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using react_crash_2021.Data.Entities;
using react_crash_2021.Data.Repositories;
using react_crash_2021.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021
{
    public class AlertHub : Hub
    {
        /// <summary>
        ///  returns the connectionId of the client
        /// Source https://code-maze.com/how-to-send-client-specific-messages-using-signalr/
        /// </summary>
        /// <returns></returns>
        //public string GetConnectionId() => Context.ConnectionId;
        //private UserManager<reactCrashUser> _userManager;
        private IAlertRepository _alertRepository;
        public AlertHub(IAlertRepository alertRepository)
        {
            
            _alertRepository = alertRepository;
        }
        public async Task GetUserAlerts(Guid userId)
        {
            var alerts = await _alertRepository.GetAlertsByUser(userId);
            await Clients.User(userId.ToString()).SendAsync("getUserAlerts", alerts);
        }

    }
}
