using react_crash_2021.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Extensions
{
    public static class TaskEntityExtensions
    {
        public static string GetTaskMessage(this TaskEntity task)
        {
            string message = "";
            TimeSpan span =  task.task_date - DateTime.Now;
            if (span.TotalMinutes > 0)
            {
                message = $"{task.text} is due in {String.Format("{0} days, {1} hours, {2} minutes", span.Days, span.Hours, span.Minutes)}";
            }
            else
            {
                message = $"{ task.text} is overdue";
            }
            return message;
        }
    }
}
