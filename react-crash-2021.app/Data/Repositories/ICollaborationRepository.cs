using react_crash_2021.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Repositories
{
    public interface ICollaborationRepository
    {
        public Task<IEnumerable<Collaboration>> GetCollaborationsByTask(long id);
        public Task<IEnumerable<Collaboration>> GetCollaborationsByUser(Guid id);
        public Task<int> AddCollaboration(reactCrashUser user, TaskEntity task);
        public Task<int> RemoveCollaboration(reactCrashUser user, TaskEntity task);
        public Task<int> RemoveCollaboration(Guid userId);
        public Task<int> RemoveCollaboration(long taskId);
    }
}
