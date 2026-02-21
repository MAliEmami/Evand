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
        private readonly IUnitOfWork _unitOfWork;

        public EventService(
            IGenericQueryRepository<Event> eventQueryRepository,
            IGenericCommandRepository<Event> eventCommandRepository,
            IUnitOfWork unitOfWork)
        {
            _eventQueryRepository = eventQueryRepository;
            _eventCommandRepository = eventCommandRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Event> AddAsync(EventAddOrUpdateDto dto)
        {
            var output = await _eventCommandRepository.AddAsync(dto.ToEntity());
            await _unitOfWork.SaveChangesAsync();
            return output;
        }

        public Task<IEnumerable<EventDto>> ListAsync()
        {
            // نکته مهم: ToListAsync حذف شد و برای همه منابع List معمولی استفاده می‌کنیم
            var list = _eventQueryRepository.GetQueryable()
                       .Select(e => e.ToDto(e.Guid))
                       .ToList(); // <--- استفاده از ToList() به جای ToListAsync

            return Task.FromResult<IEnumerable<EventDto>>(list);
        }

        public Task<int> RemoveAsync(Guid guid) => throw new NotImplementedException();
        public Task<Event> UpdateAsync(Guid guid, EventAddOrUpdateDto dto) => throw new NotImplementedException();
    }
}