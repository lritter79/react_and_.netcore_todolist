
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
            CreateMap<task, TaskModel>().ForMember(o => o.Day, e => e.MapFrom(j => j.task_date))
                                        .ReverseMap();
        }
    }
}
