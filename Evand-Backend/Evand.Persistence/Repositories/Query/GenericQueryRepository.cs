using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Evand.Domain.Entities.Base;
using Evand.Persistence.DbContextes;
using Evand.Persistence.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Evand.Persistence.Repositories.Query
{
    public class GenericQueryRepository<TEntity> : IGenericQueryRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly DbSet<TEntity> _dbSet;

        public GenericQueryRepository(EvandDbContext dbContext)
        {
            _dbSet = dbContext.Set<TEntity>();
        }

        public IQueryable<TEntity> GetQueryable()
        {
            return _dbSet;
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> GetPagedAsync(int skip, int take)
        {
            return await _dbSet.Skip(skip).Take(take).ToListAsync();
        }

        public async Task<TEntity?> GetByGuidAsync(Guid guid)
        {
            return await _dbSet.FirstOrDefaultAsync(m => m.Guid == guid);
        }

        public async Task<TEntity?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbSet.AnyAsync(predicate);
        }

        public async Task<IEnumerable<TEntity>> FilterAsync(Expression<Func<TEntity, bool>> predicate)
        {
            ArgumentNullException.ThrowIfNull(predicate);
            return await _dbSet.Where(predicate).ToListAsync();
        }

    }
}