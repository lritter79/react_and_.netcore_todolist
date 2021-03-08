
using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.EntityFramework.Extensions;
using IdentityServer4.EntityFramework.Interfaces;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using react_crash_2021.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data
{

    public class ReactCrashAppContext : IdentityDbContext<reactCrashUser, reactCrashUserRole, Guid>, IPersistedGrantDbContext

    {
        public DbSet<TaskEntity> Tasks { get; set; }
        public DbSet<Collaboration> Collaborations { get; set; }
        public override DbSet<reactCrashUser> Users { get; set; }
        public DbSet<comment> Comments { get; set; }
        public DbSet<alert> Alerts { get; set; }

        public DbSet<PersistedGrant> PersistedGrants { get; set; }
        public DbSet<DeviceFlowCodes> DeviceFlowCodes { get; set; }

        private readonly IOptions<OperationalStoreOptions> _operationalStoreOptions;
        public ReactCrashAppContext(DbContextOptions<ReactCrashAppContext> options, IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options)
        {
            _operationalStoreOptions = operationalStoreOptions;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ConfigurePersistedGrantContext(_operationalStoreOptions.Value);

            modelBuilder.Entity<TaskEntity>()
                .ToTable("tasks")
                .HasOne(t => t.user)
                .WithMany(u => u.tasks)
                .HasForeignKey("user_id");

            modelBuilder.Entity<Collaboration>()
                .HasKey(collab => new { collab.task_id, collab.user_id });

            modelBuilder.Entity<Collaboration>()
                .HasOne(c => c.task)
                .WithMany(t => t.collaboratorations)
                .HasForeignKey(t => t.task_id);

            modelBuilder.Entity<Collaboration>()
                .HasOne(c => c.user)
                .WithMany(u => u.collaboratorations)
                .HasForeignKey(u => u.user_id);

            modelBuilder.Entity<reactCrashUser>()
                .ToTable("users")
                .Property(rcu => rcu.dateCreated).HasColumnType("DateTime2"); ;

        }

        public async Task<int> SaveChangesAsync() => await base.SaveChangesAsync();
        
    }
}
