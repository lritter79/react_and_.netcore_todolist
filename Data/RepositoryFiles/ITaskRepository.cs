using react_crash_2021.Data.Entities;
using react_crash_2021.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.RepositoryFiles
{
    public interface ITaskRepository
    {
        Task<IEnumerable<task>> GetTasks();
        Task<task> GetTask(long id);
        Task<task> UpdateTask (long id, task task);
        Task<task> AddTask(task model);
        Task<task> Deletetask(long id);
    }

}
