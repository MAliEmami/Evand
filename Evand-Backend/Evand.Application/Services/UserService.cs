using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.Application.DTOs.User;
using Evand.Application.Interfaces;
using Evand.Domain.Entities;
using Evand.Persistence.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Evand.Application.Services
{
    public class UserService : IService<User, UserDto, UserAddOrUpdateDto>
    {
        private readonly IGenericQueryRepository<User> _userQueryRepository;
        private readonly IGenericCommandRepository<User> _userCommandRepository;
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IGenericQueryRepository<User> userQueryRepository, IGenericCommandRepository<User> userCommandRepository, IUnitOfWork unitOfWork)
        {
            _userQueryRepository = userQueryRepository;
            _userCommandRepository = userCommandRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<User> AddAsync(UserAddOrUpdateDto dto)
        {
            var output = await _userCommandRepository.AddAsync(dto.ToEntity());

            await _unitOfWork.SaveChangesAsync();

            return output;
        }

        public async Task<IEnumerable<UserDto>> ListAsync()
        {
            return await _userQueryRepository.GetQueryable()
                .Select(e => e.ToDto(e.Guid))
                .ToListAsync();
        }

        public Task<int> RemoveAsync(Guid guid)
        {
            throw new NotImplementedException();
        }

        public Task<User> UpdateAsync(Guid guid, UserAddOrUpdateDto dto)
        {
            throw new NotImplementedException();
        }
    }
}