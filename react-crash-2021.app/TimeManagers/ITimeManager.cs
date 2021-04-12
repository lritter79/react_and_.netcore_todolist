using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace react_crash_2021.TimeManagers
{
    public interface ITimeManager
    {
        public void Execute(object stateInfo);
    }
}
