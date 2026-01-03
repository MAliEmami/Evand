using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Evand.Domain.Entities.Base;

namespace Evand.Persistence.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        Task<TEntity> AddAsync(TEntity entity);
        TEntity Update(TEntity entity);
        void Remove(TEntity entity);
        IQueryable<TEntity> GetQueryable();
        Task<IEnumerable<TEntity>> GetAll();
        Task<IEnumerable<TEntity>> GetPagedAsync(int skip, int take);
        Task<TEntity?> GetByIdAsync(int id);
        Task<TEntity?> GetByGuidAsync(Guid guid);
        Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> predicate);
        Task<IEnumerable<TEntity>> FilterAsync(Expression<Func<TEntity, bool>> predicate);
    }
}