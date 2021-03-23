using react_crash_2021.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Repositories
{
    public interface IAlertRepository
    {
        public Task<IEnumerable<alert>> GetAlertsByUser(Guid id);
        public Task<int> DeleteAlert(long id);
        public Task<long> CreateAlert(alert a);
        public Task<int> CreateAlerts(IEnumerable<alert> a);
    }
}
