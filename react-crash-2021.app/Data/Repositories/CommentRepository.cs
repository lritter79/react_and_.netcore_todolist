using Microsoft.EntityFrameworkCore;
using react_crash_2021.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private ReactCrashAppContext _context;


        public CommentRepository(ReactCrashAppContext context)
        {
            _context = context;
        }
        public async Task<int> DeleteComment(comment comment)
        {
            _context.Comment.Remove(comment);
            return await _context.SaveChangesAsync();
        }

        public async Task<comment> GetComment(long id)
        {
            return await _context.Comment.Where(c => c.id == id).FirstAsync();
        }

        public async Task<IEnumerable<comment>> GetCommentsByTask(long id)
        {
            return await _context.Comment.Where(c => c.task.id == id).ToListAsync();
        }

        public async Task<int> SaveComment(comment comment)
        {
            await _context.Comment.AddAsync(comment);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateComment(long id, comment comment)
        {
            var t = _context.Comment.Attach(comment);
            t.State = EntityState.Modified;
            return await _context.SaveChangesAsync();
        }
    }
}
