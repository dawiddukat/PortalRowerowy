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
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.ResolveUsing(src => src.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                 {
                     opt.MapFrom(src => src.UserPhotos.FirstOrDefault(p => p.IsMain).Url);
                 })
                 .ForMember(dest => dest.Age, opt =>
                 {
                     opt.ResolveUsing(src => src.DateOfBirth.CalculateAge());
                 });
            CreateMap<UserPhoto, UserForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<UserPhoto, UserPhotoForReturnDto>();
            CreateMap<UserPhotoForCreationDto, UserPhoto>();
            CreateMap<UserForRegisterDto, User>();

            CreateMap<SellBicycle, SellBicycleForListDto>().ForMember(dest => dest.PhotoUrl, opt =>
{
    opt.MapFrom(src => src.SellBicyclePhotos.FirstOrDefault(p => p.IsMain).Url);
});
            CreateMap<SellBicycle, SellBicycleForDetailedDto>();
            CreateMap<SellBicycleForUpdateDto, SellBicycle>();


            CreateMap<Adventure, AdventureForListDto>()
                            .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.AdventurePhotos.FirstOrDefault(p => p.IsMain).Url);
                });
            CreateMap<Adventure, AdventureForDetailedDto>();
            CreateMap<AdventurePhoto, AdventureForDetailedDto>();
            CreateMap<AdventureForUpdateDto, Adventure>();
            CreateMap<AdventurePhoto, AdventurePhotoForReturnDto>();
            CreateMap<AdventurePhotoForCreationDto, AdventurePhoto>();
            // CreateMap<AdventureForRegisterDto, Adventure>();            

            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt => opt
                    .MapFrom(u => u.Sender.UserPhotos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt => opt
                    .MapFrom(u => u.Recipient.UserPhotos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}