﻿using DataModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLogic.Utils
{
    public static class RelationshipUtils
    {
        public static void UpdateManyToMany<T, TKey>(this DataContext db, IEnumerable<T> currentItems, IEnumerable<T> newItems, Func<T, TKey> getKey) where T : class
        {
            db.Set<T>().RemoveRange(currentItems.Except(newItems, getKey));
            db.Set<T>().AddRange(newItems.Except(currentItems, getKey));
        }

        public static IEnumerable<T> Except<T, TKey>(this IEnumerable<T> items, IEnumerable<T> other, Func<T, TKey> getKeyFunc)
        {
            return items
                .GroupJoin(other, getKeyFunc, getKeyFunc, (item, tempItems) => new { item, tempItems })
                .SelectMany(t => t.tempItems.DefaultIfEmpty(), (t, temp) => new { t, temp })
                .Where(t => ReferenceEquals(null, t.temp) || t.temp.Equals(default(T)))
                .Select(t => t.t.item);
        }

        /*
        public static async Task<List<T>> ToListAsync2<T>(this IQueryable<T> entities)
        {
            return (entities is IDbAsyncEnumerable<T>)
                ? await entities.ToListAsync()
                : entities.ToList();
        }*/
    }
}
