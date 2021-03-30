using react_crash_2021.Data.Entities;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using react_crash_2021.Extensions;

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

        public async Task<IEnumerable<alert>> GetTaskRemindersByUser(Guid id)
        {
            var reminders = await _context.Tasks.Where(t => t.reminder && !t.is_completed && t.task_date.HasValue).Join(_context.Users.Where(u => u.Id == id),
                task => task.user,
                u => u,
                (task, u) => new alert
                {
                    date = DateTime.Now,
                    id = task.id,
                    message = GetTaskMessage(task),
                    user = u
                })
                .ToListAsync();
            await _context.Alerts.AddRangeAsync(reminders);
            return reminders;
        }

        public string GetTaskMessage(TaskEntity task)
        {
            string message = "";
            if (task.task_date.HasValue)
            {
                TimeSpan span = task.task_date.Value - DateTime.Now;
                if (span.TotalMinutes > 0)
                {
                    message = $"{task.text} is due in {String.Format("{0} days, {1} hours, {2} minutes", span.Days, span.Hours, span.Minutes)}";
                }
                else
                {
                    message = $"{ task.text} is overdue";
                }
            }

            return message;
        }
    }
}
