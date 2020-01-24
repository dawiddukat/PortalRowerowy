using System.Linq;
using AutoMapper;
using PortalRowerowy.API.Dtos;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.UserPhotos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt =>{
                    opt.ResolveUsing(src => src.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                 {
                     opt.MapFrom(src => src.UserPhotos.FirstOrDefault(p => p.IsMain).Url);
                 })
                 .ForMember(dest => dest.Age, opt =>{
                    opt.ResolveUsing(src => src.DateOfBirth.CalculateAge());
                    });
            CreateMap<UserPhoto, UserForDetailedDto>();
        }
    }
}