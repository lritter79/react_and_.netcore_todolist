using react_crash_2021.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.Models
{
    /// <summary>
    /// Represents an instance of a task that the user will interact with
    /// </summary>
    public class TaskModel
    {
        public long Id { get; set; }
        [Required]
        [MaxLength(30)]
        public string Text { get; set; }
        [Required]
        public DateTime Day { get; set; }
        public bool Reminder { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime DateCompleted { get; set; }
        public string Details { get; set; }
        public string Location { get; set; }
        public Guid UserId { get; set; }
        public IEnumerable<ReactCrashUserModel> Collaborators { get; set; }
        public IEnumerable<CommentModel> Comments { get; set; }
        public Dictionary<string, string> DeadlineMessage {
            get
            {
                Dictionary<string, string> keyValuePairs = new Dictionary<string, string>();

                if (!IsCompleted)
                {
                    TimeSpan t = Day.Date.Subtract(DateTime.Now.Date);
                    
                    if (t.TotalDays < 0)
                    {
                        keyValuePairs.Add("message", "Passed deadline");
                        keyValuePairs.Add("color", "Grey");
                    }
                    else if (t.TotalDays == 0)
                    {
                        keyValuePairs.Add("message", "Due today");
                        keyValuePairs.Add("color", "Red");
                    }
                    else if (t.TotalDays == 1)
                    {
                        keyValuePairs.Add("message", "Due tomorrow");
                        keyValuePairs.Add("color", "Red");
                    }
                    else if(t.TotalDays < 7)
                    {
                        keyValuePairs.Add("message", "Due in less than a week");
                        keyValuePairs.Add("color", "Goldenrod");
                    }
                    else if(t.TotalDays == 7)
                    {
                        keyValuePairs.Add("message", "Due in a week");
                        keyValuePairs.Add("color", "Green");
                    }
                    else if (t.TotalDays > 7)
                    {
                        keyValuePairs.Add("message", "Due in more than a week");
                        keyValuePairs.Add("color", "Green");
                    }

                    
                }

                return keyValuePairs;
            }
        }   
    }
}
