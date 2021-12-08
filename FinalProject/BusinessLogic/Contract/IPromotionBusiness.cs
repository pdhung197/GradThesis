using BusinessLogic.Dtos.Attachment;
using BusinessLogic.Dtos.Promotion;
using BusinessLogic.Utils;
using DataModels.Entities;
using DataModels.Params;
using System.Threading.Tasks;

namespace BusinessLogic.Contract
{
    public interface IPromotionBusiness : IGenericBusiness<Promotion>
    {
        Task<PagedList<TO>> SearchByDate<TO>(SearchDateParams dateParams);

        Task<Promotion> CreatePromotion(PromotionCreate promotion);

        Task<Promotion> UpdatePromotion(PromotionUpdate promotion);

        Task UploadImage(int id, PromotionImageUpload image);

        Task ConfirmPromotion(int id);
    }
}
