using Microsoft.AspNetCore.Identity;
using react_crash_2021.Data.Entities;
using react_crash_2021.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data
{
    /// <summary>
    /// Handles adding dummy data to the project database
    /// </summary>
    public static class Seeder
    {
        /// <summary>
        /// Seeds database with a user with two tasks to start out with
        /// </summary>
        /// <param name="userManager"></param>
        /// <param name="repository"></param>
        public static async Task SeedUsers(AspNetUserManager<reactCrashUser> userManager, ITaskRepository repository)
        {
            reactCrashUser reactCrashUserSeed = new reactCrashUser { UserName = "foo@bar.com", Email = "foo@bar.com", EmailConfirmed = true };
            var isAdded = await SeedUser(userManager, reactCrashUserSeed);
            if (isAdded == IdentityResult.Success)
            {
                List<TaskEntity> taskEntities = new List<TaskEntity>
                { new TaskEntity { details = "foo", location = "bar", text = "foobar", task_date = DateTime.Now, reminder = false, user = reactCrashUserSeed },
                    new TaskEntity { details = "bar", location = "foo", text = "barfoo", task_date = DateTime.Now, user = reactCrashUserSeed, reminder = true }};
                var result = await repository.AddTasks(taskEntities);
            }
        }

        private async static Task<IdentityResult> SeedUser(AspNetUserManager<reactCrashUser> userManager, reactCrashUser reactCrashUserSeed)
        {
            var user = userManager.Users.FirstOrDefault(u => u.UserName == reactCrashUserSeed.UserName);
            if (user == null)
            {
                var result = await userManager.CreateAsync(reactCrashUserSeed, "Foobar*69");
                return IdentityResult.Success;
            }
            else
            {
                return IdentityResult.Failed();
            }
        }
    }
}
