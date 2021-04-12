using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace react_crash_2021.TimeManagers
{
    /// <summary>
    /// Source: https://code-maze.com/netcore-signalr-angular/
    /// THe purpose of this class is to use in combination with signal r to perform a function on a time interval
    /// that's called via a get request in te controller
    /// </summary>
    public class TimerManager:ITimeManager
    {
        private Timer _timer;
        private AutoResetEvent _autoResetEvent;
        /// <summary>
        /// An example of an action that gets passed in: 
        /// () => _hub.Clients.All.SendAsync("transferchartdata", DataManager.GetData()
        /// </summary>
        private Action _action;

        public DateTime TimerStarted { get; }

        public TimerManager(Action action)
        {
            _action = action;
            _autoResetEvent = new AutoResetEvent(false);
            _timer = new Timer(Execute, _autoResetEvent, 1000, 2000);
            TimerStarted = DateTime.Now;
        }

        public void Execute(object stateInfo)
        {
            _action();

            if ((DateTime.Now - TimerStarted).Seconds > 60)
            {
                _timer.Dispose();
            }
        }
    }
}
