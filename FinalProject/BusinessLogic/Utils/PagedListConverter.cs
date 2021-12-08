using AutoMapper;
using System.Linq;

namespace BusinessLogic.Utils
{
    public class PagedListConverter<TSource, TDestination> : ITypeConverter<PagedList<TSource>, PagedList<TDestination>>
    {
        public PagedList<TDestination> Convert(PagedList<TSource> src, PagedList<TDestination> dest, ResolutionContext context)
        {
            var result = src.Select(s => context.Mapper.Map<TSource, TDestination>(s)).ToList();
            return new PagedList<TDestination>(result, src.TotalItems, src.TotalPages, src.PageSize);
        }
    }
}
