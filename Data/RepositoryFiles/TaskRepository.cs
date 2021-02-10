using AutoMapper;
using Microsoft.EntityFrameworkCore;
using react_crash_2021.Data.Entities;
using react_crash_2021.Data.Models;
using react_crash_2021.Data.RepositoryFiles;
using System;
using System.Collections.Generic;
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
        private DbSet<task> taskEntity;

        public TaskRepository(ReactCrashAppContext context)
        {
            this._context = context;
            taskEntity = context.Set<task>();
        }

        public Task<task> AddTask(task model)
        {
            throw new NotImplementedException();
        }

        public Task<task> Deletetask(long id)
        {
            throw new NotImplementedException();
        }

        public Task<task> GetTask(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<task>> GetTasks()
        {
            return await taskEntity.ToListAsync();
        }

        public Task<task> UpdateTask(long id, task task)
        {
            throw new NotImplementedException();
        }
    }
}
