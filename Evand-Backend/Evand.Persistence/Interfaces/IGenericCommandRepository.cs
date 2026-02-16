using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.Domain.Entities.Base;

namespace Evand.Persistence.Interfaces
{
    public interface IGenericCommandRepository<TEntity> where TEntity : BaseEntity
    {
        Task<TEntity> AddAsync(TEntity entity);
        TEntity Update(TEntity entity);
        void Remove(TEntity entity);
    }
}