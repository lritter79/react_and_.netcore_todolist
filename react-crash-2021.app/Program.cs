using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using react_crash_2021.Data;
using react_crash_2021.Data.Entities;
using react_crash_2021.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                try
                {
                    var userManager = serviceProvider.
                                        GetRequiredService<UserManager<reactCrashUser>>();
                    var repository = serviceProvider.GetRequiredService<ITaskRepository>();
                    var alertRepository = serviceProvider.GetRequiredService<IAlertRepository>();
                    Seeder.SeedUsers(userManager, repository, alertRepository).GetAwaiter().GetResult();
                }
                catch (Exception e)
                {
                    Console.Write(e.Message);
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
