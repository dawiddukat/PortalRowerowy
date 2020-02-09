using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PortalRowerowy.API.Helpers
{
    public class PagesList<T> : List<T>
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }

        public PagesList(List<T> items, int totalCount, int pageNumber, int pageSize)
        {
            CurrentPage = pageNumber;
            PageSize = pageSize;
            totalCount = TotalCount;
            TotalPages = (int)Math.Ceiling(totalCount/(double)pageSize);
            this.AddRange(items);
        }

        public static async Task<PagesList<T>> CreateListAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var totalCount = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1)* pageSize).Take(pageSize).ToListAsync(); 
            return new PagesList<T>(items, totalCount, pageNumber, pageSize);
        }
    
    }
}