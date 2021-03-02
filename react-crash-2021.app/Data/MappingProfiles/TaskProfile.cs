
using AutoMapper;
using react_crash_2021.Data.Entities;
using react_crash_2021.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.MappingProfiles
{
    public class TaskProfile : Profile
    {
        public TaskProfile()
        {
            CreateMap<TaskEntity, TaskModel>().ForMember(m => m.Day, e => e.MapFrom(t => t.task_date))
              .ForMember(m => m.UserId, e => e.MapFrom(t => t.user.Id))
              .ReverseMap();
        }
    }
}
