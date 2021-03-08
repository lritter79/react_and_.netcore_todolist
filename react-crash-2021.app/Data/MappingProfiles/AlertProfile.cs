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
    public class AlertProfile :Profile
    {
        public AlertProfile()
        {
            CreateMap<alert, AlertModel>().ForMember(m => m.UserId, e => e.MapFrom(t => t.user.Id))
              .ReverseMap();
        }
    }
}
