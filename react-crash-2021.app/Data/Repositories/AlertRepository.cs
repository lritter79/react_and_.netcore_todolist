using react_crash_2021.Data.Entities;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Repositories
{
    public class AlertRepository : IAlertRepository
    {
        private ReactCrashAppContext _context;


        public AlertRepository(ReactCrashAppContext context)
        {
            _context = context;
        }
        public async Task<long> CreateAlert(alert a)
        {
            var user = await  _context.Users.Where(u => u.Id == a.user.Id).FirstOrDefaultAsync();
            if (user != null)
            {
                a.user = user;
            }
            await _context.Alerts.AddAsync(a);
            await _context.SaveChangesAsync();

            return a.id;
        }

        public async Task<int> CreateAlerts(IEnumerable<alert> a)
        {
            await _context.Alerts.AddRangeAsync(a);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteAlert(long id)
        {
            var entity =  await _context.Alerts.Where(a => a.id == id).FirstAsync();
            _context.Alerts.Remove(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<alert>> GetAlertsByUser(Guid id)
        {
            return await _context.Alerts.Join(_context.Users, 
                a => a.user.Id, 
                u => u.Id, 
                (a, u) => new alert { 
                    date = a.date,
                    id = a.id,
                    message = a.message,
                    user = u
                })
                .Where(alert => alert.user.Id == id)
                .ToListAsync();
        }
    }
}
