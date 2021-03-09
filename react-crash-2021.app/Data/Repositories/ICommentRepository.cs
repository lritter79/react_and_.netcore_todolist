using react_crash_2021.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Repositories
{
    public interface ICommentRepository
    {
        public Task<IEnumerable<comment>> GetCommentsByTask(long id);
        public Task<comment> GetComment(long id);
        public Task<int> SaveComment(comment comment);
        public Task<int> UpdateComment(long id, comment comment);
        public Task<int> DeleteComment(comment comment);

    }
        
}
