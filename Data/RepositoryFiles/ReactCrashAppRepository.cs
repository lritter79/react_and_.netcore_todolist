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
    public class ReactCrashAppRepository : IReactCrashAppRepository
    {
        private ReactCrashAppContext _context;
        private DbSet<task> taskEntity;
        private IMapper _mapper;

        public ReactCrashAppRepository(ReactCrashAppContext context, IMapper mapper)
        {
            this._context = context;
            taskEntity = context.Set<task>();
            _mapper = mapper;
        }

        public TaskModel AddTask(TaskModel model)
        {
            throw new NotImplementedException();
        }

        public TaskModel Deletetask(long id)
        {
            throw new NotImplementedException();
        }

        public TaskModel GetTask(long id)
        {
            throw new NotImplementedException();
        }


        public bool TaskExists(long id)
        {
            throw new NotImplementedException();
        }

        public TaskModel UpdateTask(long id, TaskModel task)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TaskModel> GetTasks()
        {
            throw new NotImplementedException();
        }
    }
}
