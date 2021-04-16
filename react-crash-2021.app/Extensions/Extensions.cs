using react_crash_2021.Data.Entities;
using react_crash_2021.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ical.Net;

namespace react_crash_2021.Extensions
{
    public static class Extensions
    {
        public static string GetiCalFormat(this TaskModel task)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("BEGIN: VCALENDAR");           
            sb.AppendLine("VERSION:2.0");
            sb.AppendLine("PRODID: -//LRITTER1979//Task Tracker//EN");
            sb.AppendLine("CALSCALE:GREGORIAN");
            sb.AppendLine("METHOD:REQUEST");
            sb.AppendLine("BEGIN:VEVENT");
            sb.AppendLine($"SUMMARY;LANGUAGE=en-us:{task.Text}");
            sb.AppendLine("CLASS:PUBLIC");
            sb.AppendLine(string.Format("CREATED:{0:yyyyMMddTHHmmssZ}", DateTime.UtcNow));
            sb.AppendLine($"DESCRIPTION:{task.Details}");
            if (task.Day.HasValue)
            {
                sb.AppendLine(string.Format("DTSTART:{0:yyyyMMddTHHmmssZ}", task.Day));
            }
            else
            {
                sb.AppendLine(string.Format("DTSTART:{0:yyyyMMddTHHmmssZ}", DateTime.UtcNow));
            }
            if (task.DateCompleted.HasValue)
            {
                sb.AppendLine(string.Format("DTEND:{0:yyyyMMddTHHmmssZ}", task.DateCompleted));
            }
            else
            {             
                if (task.Day.HasValue)
                {
                    sb.AppendLine(string.Format("DTEND:{0:yyyyMMddTHHmmssZ}", task.Day));
                }
                else
                {
                    sb.AppendLine(string.Format("DTSTART:{0:yyyyMMddTHHmmssZ}", DateTime.UtcNow));
                }
            }
            sb.AppendLine("SEQUENCE:0");
            sb.AppendLine($"UID:{task.Id}");
            sb.AppendLine($"LOCATION:{task.Location}");
            sb.AppendLine("END:VEVENT");
            sb.AppendLine("END:VCALENDAR");

            return sb.ToString();
        }
    }
}
