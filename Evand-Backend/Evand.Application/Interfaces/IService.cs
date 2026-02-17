using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.Domain.Entities.Base;

namespace Evand.Application.Interfaces
{
    public interface IService<TEntity, TEntityDto, TAddOrUpdateDto> where TEntity : BaseEntity
    {
        Task<IEnumerable<TEntityDto>> ListAsync();
        Task<TEntity> AddAsync(TAddOrUpdateDto dto);
        Task<TEntity> UpdateAsync(Guid guid, TAddOrUpdateDto dto);
        Task<int> RemoveAsync(Guid guid);
    }
}