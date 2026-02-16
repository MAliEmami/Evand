using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.Application.Interfaces;
using Evand.Domain.Entities.Base;
using Microsoft.AspNetCore.Mvc;

namespace Evand.API.Controller.Base
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController<TEntity, TEntityDto, TAddOrUpdateDtoDto> : ControllerBase where TEntity : BaseEntity
    {
        protected readonly IService<TEntity, TEntityDto, TAddOrUpdateDtoDto> _servise;

        public BaseApiController(IService<TEntity, TEntityDto, TAddOrUpdateDtoDto> servise)
        {
            _servise = servise;
        }

        [HttpPost("add")]
        public virtual async Task<IActionResult> Add(TAddOrUpdateDtoDto entity)
        {
            var results = await _servise.AddAsync(entity);
            return Ok(results);
        }

        [HttpPost("list")]
        public virtual async Task<IEnumerable<TEntityDto>> List()
        {
            return await _servise.ListAsync();
        }

        [HttpPut("update/{guid}")]
        public virtual async Task<TAddOrUpdateDtoDto> Update(Guid guid, TAddOrUpdateDtoDto addUpdateDto)
        {
            await _servise.UpdateAsync(guid, addUpdateDto);
            return addUpdateDto;
        }

        [HttpDelete("remove/{guid}")]
        public virtual async Task<bool> Remove(Guid guid)
        {
            var results = await _servise.RemoveAsync(guid);
            return true;
        }
    }
}