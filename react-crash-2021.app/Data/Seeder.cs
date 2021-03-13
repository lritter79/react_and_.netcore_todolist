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
        public static async Task SeedUsers(UserManager<reactCrashUser> userManager, ITaskRepository repository, IAlertRepository alertRepository)
        {
            reactCrashUser reactCrashUserSeed = new reactCrashUser { UserName = "foo@bar.com", Email = "foo@bar.com", EmailConfirmed = true };
            var isAdded = await SeedUser(userManager, reactCrashUserSeed);
            if (isAdded == IdentityResult.Success)
            {
                reactCrashUser reactCrashUserSeedReversed = new reactCrashUser { UserName = "bar@foo.com", Email = "bar@foo.com", EmailConfirmed = true };
                isAdded = await SeedUser(userManager, reactCrashUserSeedReversed);
                try
                {
                    Collaboration collab = new Collaboration();
                    collab.user = reactCrashUserSeedReversed;
                    comment sampleComment = new comment { date = DateTime.Now, text = "Test", user = reactCrashUserSeed };
                    List<comment> sampleComments = new List<comment>();
                    sampleComments.Add(sampleComment);
                    List<TaskEntity> taskEntities = new List<TaskEntity>
                    { 
                        new TaskEntity { details = "foo", location = "bar", text = "foobar", task_date = DateTime.Now, reminder = false, user = reactCrashUserSeed, is_completed = true, date_completed = DateTime.Now, comments = sampleComments },
                        new TaskEntity { details = "bar", location = "foo", text = "barfoo", task_date = DateTime.Now.AddDays(3), user = reactCrashUserSeed, reminder = true, is_completed = false }
                    };

                    collab.task = taskEntities[0];
                    taskEntities[0].collaboratorations = new List<Collaboration>() { collab };
                    var result = await repository.AddTasks(taskEntities);
                    alert a = new alert { date = DateTime.Now, message = "Created", user = userManager.Users.FirstOrDefault(u => u.UserName == "foo@bar.com") };
                    var alertResult = await alertRepository.CreateAlert(a);
                }
                catch (Exception e)
                {
                    var message = e.Message;
                }               
            }

            
        }

        private async static Task<IdentityResult> SeedUser(UserManager<reactCrashUser> userManager, reactCrashUser reactCrashUserSeed)
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
