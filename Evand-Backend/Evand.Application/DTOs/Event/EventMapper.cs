using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.Domain.Entities;

namespace Evand.Application.DTOs.Event
{
    public static class EventMapper
    {
        public static EventDto ToDto(this Evand.Domain.Entities.Event entity, Guid eventGuid)
        {
            return new EventDto
            {
                Guid = entity.Guid,
                Name = entity.Name,
                Category = entity.Category,
                X = entity.X,
                Y = entity.Y,
                Price = entity.Price,
                Photo = entity.Photo,
                Address = entity.Address,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate,
                Capacity = entity.Capacity
            };
        }

        public static Evand.Domain.Entities.Event ToEntity(this EventAddOrUpdateDto dto)
        {
            return new Evand.Domain.Entities.Event
            {
                //Guid = dto.Guid,
                Name = dto.Name,
                Category = dto.Category,
                X = dto.X,
                Y = dto.Y,
                Price = dto.Price,
                Photo = dto.Photo,
                Address = dto.Address,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Capacity = dto.Capacity
            };
        }
    }
}