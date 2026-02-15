using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.Application.DTOs.Event;
using Evand.Application.Interfaces;
using Evand.Domain.Entities;
using Evand.Persistence.Interfaces;

namespace Evand.Application.Services
{
    public class EventService : IService<Event, EventDto, EventAddOrUpdateDto>
    {
        private readonly IGenericQueryRepository<Event> _eventQueryRepository;
        private readonly IGenericCommandRepository<Event> _eventCommandRepository;

        public EventService(IGenericQueryRepository<Event> eventQueryRepository, IGenericCommandRepository<Event> eventCommandRepository)
        {
            _eventQueryRepository = eventQueryRepository;
            _eventCommandRepository = eventCommandRepository;
        }

        public async Task<Event> AddAsync(EventAddOrUpdateDto dto)
        {
            var user = await _eventQueryRepository.GetByGuidAsync(dto.Guid)
                ?? throw new ArgumentNullException("user not found");

            var output = await _eventCommandRepository.AddAsync(dto.ToEntity(user.Id));

            //await _unitOfWork.SaveChangesAsync();

            return output;
        }

        public Task<IEnumerable<EventDto>> ListAsync()
        {
            throw new NotImplementedException();
        }

        public Task<int> RemoveAsync(Guid guid)
        {
            throw new NotImplementedException();
        }

        public Task<Event> UpdateAsync(Guid guid, EventAddOrUpdateDto dto)
        {
            throw new NotImplementedException();
        }
    }
}