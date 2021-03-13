using AutoMapper;
using react_crash_2021.Data.Entities;
using react_crash_2021.Data.Models;
using react_crash_2021.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_crash_2021.Data.MappingProfiles
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<reactCrashUser, ReactCrashUserModel>()
                .ForMember(m => m.Tasks, c => c.MapFrom(e => e.tasks))
                .ForMember(m => m.Collaborations, c => c.MapFrom(e => e.collaboratorations.Select(t => t.task)))
                .ForMember(m => m.IsOpenToCollaboration, c => c.MapFrom(e => e.isOpenToCollaboration))
                .ReverseMap();
        }
            
    }
}

