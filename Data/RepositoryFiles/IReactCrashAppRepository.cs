using react_crash_2021.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.RepositoryFiles
{
    public interface IReactCrashAppRepository
    {
        IEnumerable<TaskModel> GetTasks();
        TaskModel GetTask(long id);
        bool TaskExists(long id);
        TaskModel UpdateTask (long id, TaskModel task);
        TaskModel AddTask(TaskModel model);
        TaskModel Deletetask(long id);
    }

}
