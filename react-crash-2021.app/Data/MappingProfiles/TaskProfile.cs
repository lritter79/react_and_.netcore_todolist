
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
              .ForMember(m => m.DateCompleted, e => e.MapFrom(t => t.date_completed))
              .ForMember(m => m.IsCompleted, e => e.MapFrom(t => t.is_completed))
              .ForMember(m => m.Collaborators, e => e.MapFrom(t => t.collaboratorations.Select(u => u.user)))
              .ForMember(m => m.Comments, e => e.MapFrom(t => t.comments))
              .ForMember(m => m.CategoryName, e => e.MapFrom(t => t.category.name))
              .ForMember(m => m.CategoryId, e => e.MapFrom(t => t.category.id))
              .ForMember(m => m.Color, e => e.MapFrom(t => t.category.color))
              .ReverseMap();
        }
    }
}
