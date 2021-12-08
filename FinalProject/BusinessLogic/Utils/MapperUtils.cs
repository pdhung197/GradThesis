using AutoMapper;
using BusinessLogic.Dtos.Attachment;
using BusinessLogic.Dtos.Authentication;
using BusinessLogic.Dtos.Bill;
using BusinessLogic.Dtos.Booking;
using BusinessLogic.Dtos.Customer;
using BusinessLogic.Dtos.Dish;
using BusinessLogic.Dtos.DishCategory;
using BusinessLogic.Dtos.Employee;
using BusinessLogic.Dtos.Material;
using BusinessLogic.Dtos.Promotion;
using BusinessLogic.Dtos.Provider;
using BusinessLogic.Dtos.ReceiptMaterial;
using BusinessLogic.Dtos.Report;
using BusinessLogic.Dtos.Table;
using BusinessLogic.Dtos.User;
using DataModels.Entities;
using System;

namespace BusinessLogic.Utils
{
    public static class MapperUtils
    {
        private static void CreateMaps<TA, TB>(this IProfileExpression profileExpression)
        {
            profileExpression.CreateMap<TA, TB>().ReverseMap();
        }

        private static readonly MapperConfiguration mapperConfiguration = new MapperConfiguration(x =>
        {
            x.CreateMap<DishImageUpload, Attachment>();
            x.CreateMap<PromotionImageUpload, Attachment>();

            x.CreateMap<ProviderCreate, Provider>();

            x.CreateMap<MaterialCreate, Material>();

            x.CreateMap<ReceiptMaterialCreate, ReceiptMaterial>();

            x.CreateMap<DishCategoryCreate, DishCategory>();

            x.CreateMaps<RecipeUpdate, DishRecipe>();
            x.CreateMap<DishRecipe, RecipeResponse>();
            x.CreateMap<DishCreate, Dish>();
            x.CreateMap<DishUpdate, Dish>()
                .ForMember(dest => dest.AttachmentId,
                    opt => opt.Ignore());
            x.CreateMap<Dish, DishResponse>();
            x.CreateMap<PagedList<Dish>, PagedList<DishResponse>>()
                .ConvertUsing<PagedListConverter<Dish, DishResponse>>();
            x.CreateMap<Dish, DishRecipeResponse>();

            x.CreateMap<EmployeeCreate, Employee>();

            x.CreateMaps<UserLogin, User>();
            x.CreateMap<UserCreate, User>();
            x.CreateMap<User, UserResponse>();
            x.CreateMap<PagedList<User>, PagedList<UserResponse>>()
                .ConvertUsing<PagedListConverter<User, UserResponse>>();

            x.CreateMap<CustomerCreate, Customer>();

            x.CreateMap<BookingCreate, Booking>();
            x.CreateMaps<BookingOrderCreate, BookingOrder>();
            x.CreateMap<BookingOrder, Order>();

            x.CreateMap<TableCreate, Table>();
            x.CreateMap<Table, TableForBooking>();

            x.CreateMaps<OrderCreate, Order>();
            x.CreateMap<BillCreate, Bill>();
            x.CreateMap<Bill, BillResponse>();
            x.CreateMap<BillUpdate, Bill>();

            x.CreateMaps<DishPromotionCreate, DishPromotion>();
            x.CreateMaps<CustomerPromotionCreate, CustomerPromotion>();
            x.CreateMap<PromotionCreate, Promotion>();
            x.CreateMaps<PromotionUpdate, Promotion>();

            x.CreateMap<ReceiptMaterial, ReceiptMaterialDetail>()
                .ForMember(dest => dest.MaterialName,
                    opt => opt.MapFrom(src => src.Material.Name))
                .ForMember(dest => dest.Total,
                    opt => opt.MapFrom(src => src.Amount * src.UnitPrice));
        });

        private static readonly IMapper mapper = mapperConfiguration.CreateMapper();

        public static T ConvertTo<T>(this object t)
        {
            return t switch
            {
                null => throw new Exception("Nullpointer exception occurs!"),
                T objT => objT,
                _ => mapper.Map<T>(t)
            };
        }
    }
}
