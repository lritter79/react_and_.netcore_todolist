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
    public class ReactCrashUserRepository : IReactCrashUserRepository
    {

        private ReactCrashAppContext _context;

        public ReactCrashUserRepository(ReactCrashAppContext context)
        {
            _context = context;
        }
        public async Task<reactCrashUser> GetUser(string userName)
        {
            return await _context.Users.Where(user => user.UserName == userName).FirstOrDefaultAsync();
        }


    }
}
