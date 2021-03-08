using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Models
{
    public class CommentModel
    {
        public long Id { get; set; }
        public long TaskId { get; set; }
        public Guid UserId { get; set; }

        public string Text { get; set; }
        public DateTime Date { get; set; }
    }
}
