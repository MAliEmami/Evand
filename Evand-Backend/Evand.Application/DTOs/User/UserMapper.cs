using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evand.Application.DTOs.User
{
    public static class UserMapper
    {
        public static UserDto ToDto(this Evand.Domain.Entities.User entity, Guid guid)
        {
            return new UserDto
            {
                Guid = entity.Guid,
                FullName = entity.FullName,
                Email = entity.Email,
                HashPassword = entity.HashPassword,
                PhoneNumber = entity.PhoneNumber,
                City = entity.City,
                Province = entity.Province,
                Avatar = entity.Avatar
            };
        }

        public static Evand.Domain.Entities.User ToEntity(this UserAddOrUpdateDto dto)
        {
            return new Evand.Domain.Entities.User
            {
                Guid = dto.Guid,
                FullName = dto.FullName,
                Email = dto.Email,
                HashPassword = dto.HashPassword,
                PhoneNumber = dto.PhoneNumber,
                City = dto.City,
                Province = dto.Province,
                Avatar = dto.Avatar
            };
        }
    }
}