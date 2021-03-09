using Microsoft.EntityFrameworkCore;
using react_crash_2021.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Repositories
{
    public class CollaborationRepository : ICollaborationRepository
    {
        private ReactCrashAppContext _context;
        public CollaborationRepository(ReactCrashAppContext context)
        {
            _context = context;
        }


        public async Task<int> AddCollaboration(reactCrashUser user, TaskEntity task)
        {
            await _context.Collaborations.AddAsync(new Collaboration { task = task, user = user });
            alert a = new alert
            {
                date = DateTime.Now,
                message = $"{user.UserName} has been added a collaborator to {task.text}",
                user = task.user
            };
            await _context.Alerts.AddAsync(a);
            return await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Collaboration>> GetCollaborationsByTask(long id)
        {
            return await _context.Collaborations.Where(c => c.task_id == id).ToListAsync();
        }

        public async Task<IEnumerable<Collaboration>> GetCollaborationsByUser(Guid id)
        {
            return await _context.Collaborations.Where(c => c.user_id == id).ToListAsync();
        }

        public async Task<int> RemoveCollaboration(reactCrashUser user, TaskEntity task)
        {
            var result = await _context.Collaborations.Where(c => c.user == user).Where(c => c.task == task).ToListAsync();
            _context.Collaborations.RemoveRange(result);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> RemoveCollaboration(Guid userId)
        {
            var result = await _context.Collaborations.Where(c => c.user_id == userId).ToListAsync();
            _context.Collaborations.RemoveRange(result);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> RemoveCollaboration(long taskId)
        {
            var result = await _context.Collaborations.Where(c => c.task_id == taskId).ToListAsync();
            _context.Collaborations.RemoveRange(result);
            return await _context.SaveChangesAsync();
        }
    }
}
