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

        public async Task<IEnumerable<reactCrashUser>> GetUsersByTask(TaskEntity task)
        {
            //var taskWithCollabs = await _context.Tasks.Join(_context.Collaborations, t => t.id, collab => collab.task_id, 
            //                        (t, collab) => new  TaskEntity {
            //                            collaboratorations = col
            //                        })

            var users = await _context.Users.Join(_context.Collaborations, user => user.Id, collab => collab.user_id, (user, collab) => new { user, collab })
                                            .Join(_context.Tasks, cu => cu.collab.task_id, taskE => taskE.id, (cu, taskE) => new { taskE, cu })
                                            .Select(m => new
                                                  {
                                                      User = m.cu.user,                                                    
                                                      Collab = m.cu.collab,
                                                      Task = m.taskE
                                                  }).Where(o => o.Task.id == task.id || o.Collab.task_id == task.id)   
                                                  .Select(res => res.User)
                                                  .ToListAsync();
            //        var categorizedProducts = product
            //.Join(productcategory, p => p.Id, pc => pc.ProdId, (p, pc) => new { p, pc })
            //.Join(category, ppc => ppc.pc.CatId, c => c.Id, (ppc, c) => new { ppc, c })
            //.Select(m => new {
            //    ProdId = m.ppc.p.Id, // or m.ppc.pc.ProdId
            //    CatId = m.c.CatId
            //    // other assignments
            //});


            return users;
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
