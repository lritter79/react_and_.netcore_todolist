using react_crash_2021.Data.Entities;
using System;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Repositories
{
    public interface IReactCrashUserRepository
    {
        public Task<reactCrashUser> GetUser(string userName);
        public Task<reactCrashUser> GetUser(Guid id);
        public Task<int> ToggleCollab(Guid id, bool isOpen);
        void DeleteUserTasks(Guid userId);
    }
}