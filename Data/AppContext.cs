
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
    public class AppContext : DbContext

    {
        public DbSet<task> Tasks { get; set; }

        public AppContext(DbContextOptions<AppContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<task>().ToTable("tasks");
        }
    }
}
