using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace react_crash_2021.Data.MappingProfiles
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<react_crash_2021.Data.Entities.Category, react_crash_2021.Models.CategoryModel>()
                .ForMember(cm => cm.UserId, id => id.MapFrom(ce => ce.user.Id))
                .ReverseMap();
        }     
    }
}
