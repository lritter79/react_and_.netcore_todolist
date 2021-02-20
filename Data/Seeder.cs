using Microsoft.AspNetCore.Identity;
using react_crash_2021.Data.Entities;
using react_crash_2021.Data.RepositoryFiles;
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
        public static async void SeedUsers (AspNetUserManager<reactCrashUser> userManager, ITaskRepository repository)
        {
            //    if ( == null)
            if (userManager.FindByNameAsync("foo@bar.com").Result == null)
            {
                TaskEntity taskSeed = new TaskEntity { details = "foo", location = "bar", text = "foobar", task_date = DateTime.Now, reminder = false };
                reactCrashUser reactCrashUserSeed = new reactCrashUser { UserName = "foo@bar.com", Email = "foo@bar.com", EmailConfirmed = true };
                taskSeed.user = reactCrashUserSeed;
                
                var result = await userManager.CreateAsync(reactCrashUserSeed, "Foobar*69");
                if (result.Succeeded)
                {
                     var taskResult = await repository.AddTask(taskSeed);
                    taskSeed = new TaskEntity { details = "bar", location = "foo", text = "barfoo", task_date = DateTime.Now, user= reactCrashUserSeed, reminder=true};
                }

                    

                
            }
            //{
            //    MyIdentityUser user = new MyIdentityUser();
            //    user.UserName = "user1";
            //    user.Email = "user1@localhost";
            //    user.FullName = "Nancy Davolio";
            //    user.BirthDate = new DateTime(1960, 1, 1);

            //    IdentityResult result = userManager.CreateAsync
            //    (user, "password_goes_here").Result;

            //    if (result.Succeeded)
            //    {
            //        userManager.AddToRoleAsync(user,
            //                            "NormalUser").Wait();
            //    }
            //}
        }
    }
}
