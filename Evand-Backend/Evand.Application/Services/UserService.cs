using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.Application.DTOs.User;
using Evand.Application.Interfaces;
using Evand.Domain.Entities;
using Evand.Persistence.Interfaces;

namespace Evand.Application.Services
{
    public class UserService : IService<User, UserDto, UserAddOrUpdateDto>
    {
        private readonly IGenericQueryRepository<User> _userQueryRepository;
        private readonly IGenericCommandRepository<User> _userCommandRepository;
        private readonly IUnitOfWork _unitOfWork;

        public UserService(
            IGenericQueryRepository<User> userQueryRepository,
            IGenericCommandRepository<User> userCommandRepository,
            IUnitOfWork unitOfWork)
        {
            _userQueryRepository = userQueryRepository ?? throw new ArgumentNullException(nameof(userQueryRepository));
            _userCommandRepository = userCommandRepository ?? throw new ArgumentNullException(nameof(userCommandRepository));
            _unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        }

        public async Task<User> AddAsync(UserAddOrUpdateDto dto)
        {
            if (dto is null)
                throw new ArgumentNullException(nameof(dto));

            var entity = dto.ToEntity();

            var output = await _userCommandRepository.AddAsync(entity);

            await _unitOfWork.SaveChangesAsync();

            return output;
        }

        public Task<IEnumerable<UserDto>> ListAsync()
        {
            var list = _userQueryRepository.GetQueryable()
                .Select(e => e.ToDto(e.Guid))
                .ToList();

            return Task.FromResult<IEnumerable<UserDto>>(list);
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