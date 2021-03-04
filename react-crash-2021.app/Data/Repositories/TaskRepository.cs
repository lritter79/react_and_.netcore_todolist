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
    /// <summary>
    /// Provides a layer of business logic between API and database context
    /// </summary>
    public class TaskRepository : ITaskRepository
    {
        private ReactCrashAppContext _context;

        public TaskRepository(ReactCrashAppContext context)
        {
            _context = context;
        }

        public async Task<TaskEntity> AddTask(TaskEntity model)
        {
            _context.Entry(model.user).State = EntityState.Unchanged;
            await _context.Tasks.AddAsync(model);
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<IEnumerable<TaskEntity>> AddTasks(IEnumerable<TaskEntity> model)
        {

            await _context.Tasks.AddRangeAsync(model);

            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<TaskEntity> Deletetask(long id)
        {

            var task = _context.Tasks.Find(id);

            if (task != null)
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }

            return task;
        }

        public async Task<TaskEntity> GetTask(long id)
        {
            //throw new NotImplementedException();
            return await _context.Tasks.Where(task => task.id == id).FirstAsync();
        }

        public async Task<TaskEntity> GetTaskByUser(Guid userId, long id)
        {
            var queryable = _context.Tasks
                        .Join(_context.Users,
                        task => task.user.Id,
                        user => user.Id,
                        (task, user) => new TaskEntity
                        {
                            id = task.id,
                            details = task.details,
                            reminder = task.reminder,
                            location = task.location,
                            task_date = task.task_date,
                            text = task.text,
                            user = user
                        })
                        .Where(t => t.user.Id == userId);

            return await queryable.Where(t => t.id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<TaskEntity>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }
        
        public async Task<IEnumerable<TaskEntity>> GetTasksByUser(Guid userId)
        {

            return await _context.Tasks
                                    .Join(_context.Users,
                                    task => task.user.Id,
                                    user => user.Id,
                                    (task, user) => new TaskEntity
                                    {
                                        id = task.id,
                                        details = task.details,
                                        reminder = task.reminder,
                                        location = task.location,
                                        task_date = task.task_date,
                                        text = task.text,
                                        user = user
                                    })
                                    .Where(t => t.user.Id == userId)
                                    .ToListAsync();
        }

        public async Task<TaskEntity> UpdateTask(long id, TaskEntity task)
        {
            if (_context.Tasks.Any(t => t.id == id))
            {
                var t = _context.Tasks.Attach(task);
                t.State = EntityState.Modified;
            } 
            else 
            {
                var t = _context.Tasks.Add(task);
                t.State = EntityState.Added;
            }

            await _context.SaveChangesAsync();

            return await _context.FindAsync<TaskEntity>(id);
        }
        

    }
}