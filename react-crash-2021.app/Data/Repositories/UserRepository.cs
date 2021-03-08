using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using react_crash_2021.Data.Entities;
using react_crash_2021.Data.Models;
using react_crash_2021.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Repositories
{
    public class ReactCrashUserRepository : IReactCrashUserRepository
    {

        private ReactCrashAppContext _context;

        public ReactCrashUserRepository(ReactCrashAppContext context)
        {
            _context = context;
        }

        public void DeleteUserTasks(Guid userId)
        {
            List<TaskEntity> userTasks = _context.Tasks.Where(t => t.user.Id == userId).ToList();
            _context.RemoveRange(userTasks);
        }

        public async Task<reactCrashUser> GetUser(string userName)
        {
            return await _context.Users.Where(user => user.UserName == userName).FirstOrDefaultAsync();
        }
        
        public async Task<reactCrashUser> GetUser(Guid id)
        {
            return await _context.Users.Where(user => user.Id == id).FirstOrDefaultAsync();
        }

        public async Task<int> ToggleCollab(Guid id, bool isOpen)
        {
            var user = await  _context.Users.FirstAsync(u => u.Id == id);
            user.isOpenToCollaboration = isOpen;
            var t = _context.Users.Attach(user);
            t.State = EntityState.Modified;
            return await _context.SaveChangesAsync();

        }

        public async Task<int> UpdateUser(reactCrashUser user)
        {
            var t = _context.Users.Attach(user);
            t.State = EntityState.Modified;
            return await _context.SaveChangesAsync();
        }
    }
}
