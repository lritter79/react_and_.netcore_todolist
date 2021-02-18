
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using react_crash_2021.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data
{
    //public SchoolContext(DbContextOptions<SchoolContext> options) : base(options)
    //{
    //}

    //public DbSet<Course> Courses { get; set; }
    //public DbSet<Enrollment> Enrollments { get; set; }
    //public DbSet<Student> Students { get; set; }

    //protected override void OnModelCreating(ModelBuilder modelBuilder)
    //{
    //    modelBuilder.Entity<Course>().ToTable("Course");
    //    modelBuilder.Entity<Enrollment>().ToTable("Enrollment");
    //    modelBuilder.Entity<Student>().ToTable("Student");
    //}
    public class ReactCrashAppContext : IdentityDbContext<reactCrashUser, reactCrashUserRole, Guid>

    {
        public DbSet<task> Tasks { get; set; }
        public override DbSet<reactCrashUser> Users { get; set; }

        public ReactCrashAppContext(DbContextOptions<ReactCrashAppContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<MyObject>()
            //.HasRequired(c => c.ApplicationUser)
            //.WithMany(t => t.MyObjects)
            //.Map(m => m.MapKey("UserId"));
            modelBuilder.Entity<task>()
                .ToTable("tasks")
                .HasOne(t => t.user)
                .WithMany(u => u.tasks)
                .HasForeignKey("user_id");



           

            modelBuilder.Entity<reactCrashUser>()
                .ToTable("users");

            

            

        }
    }
}
