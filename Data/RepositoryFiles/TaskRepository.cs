using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using react_crash_2021.Data.Entities;
using react_crash_2021.Data.Models;
using react_crash_2021.Data.RepositoryFiles;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data
{
    /// <summary>
    /// Provides a layer of business logic between API and database context
    /// </summary>
    public class TaskRepository : ITaskRepository
    {
        private ReactCrashAppContext _context;

        public TaskRepository(ReactCrashAppContext context)
        {
            this._context = context;
        }

        public async Task<task> AddTask(task model)
        {
            await _context.Tasks.AddAsync(model);
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<task> Deletetask(long id)
        {

            var task = _context.Tasks.Find(id);

            if (task != null)
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }

            return task;
        }

        public async Task<task> GetTask(long id)
        {
            //throw new NotImplementedException();
            return await _context.Tasks.Where(task => task.id == id).FirstAsync();
        }

        public async Task<IEnumerable<task>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<task> UpdateTask(long id, task task)
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

            return await _context.FindAsync<task>(id);
        }


    }
}