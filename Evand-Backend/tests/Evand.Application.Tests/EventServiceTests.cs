using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.Application.DTOs.Event;
using Evand.Application.Services;
using Evand.Domain.Entities;
using Evand.Persistence.Interfaces;
using FluentAssertions;
using NSubstitute;
using NUnit.Framework;

namespace Evand.Application.Tests
{
    public class EventServiceTests
    {
        private IGenericQueryRepository<Event> _queryRepo = null!;
        private IGenericCommandRepository<Event> _commandRepo = null!;
        private IUnitOfWork _uow = null!;
        private EventService _service = null!;

        [SetUp]
        public void Setup()
        {
            _queryRepo = Substitute.For<IGenericQueryRepository<Event>>();
            _commandRepo = Substitute.For<IGenericCommandRepository<Event>>();
            _uow = Substitute.For<IUnitOfWork>();

            _service = new EventService(_queryRepo, _commandRepo, _uow);
        }

        [Test]
        public async Task AddAsync_ShouldReturnCreatedEntity()
        {
            var dto = new EventAddOrUpdateDto
            {
                Guid = Guid.NewGuid(),
                Name = "UnitTest Event",
                Category = "Test",
                Address = "Address",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddHours(1),
                Capacity = 50,
                Price = 10
            };

            var createdEntity = new Event
            {
                Guid = dto.Guid,
                Name = dto.Name,
                Category = dto.Category,
                Address = dto.Address,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Capacity = dto.Capacity,
                Price = dto.Price
            };

            _commandRepo.AddAsync(Arg.Any<Event>()).Returns(createdEntity);
            _uow.SaveChangesAsync(default).Returns(Task.FromResult(1));

            var result = await _service.AddAsync(dto);

            result.Should().BeEquivalentTo(createdEntity, options => options.Excluding(e => e.Id));
            await _commandRepo.Received(1).AddAsync(Arg.Is<Event>(e => e.Guid == dto.Guid));
            await _uow.Received(1).SaveChangesAsync(default);
        }

        [Test]
        public async Task ListAsync_ShouldReturnDtos()
        {
            var events = new List<Event>
            {
                new Event { Guid = Guid.NewGuid(), Name = "Event1", Category = "Cat1", Address = "Addr1" },
                new Event { Guid = Guid.NewGuid(), Name = "Event2", Category = "Cat2", Address = "Addr2" }
            };

            _queryRepo.GetQueryable().Returns(events.AsQueryable());

            var result = await _service.ListAsync();

            result.Should().HaveCount(2);
            result.Select(r => r.Name).Should().Contain("Event1", "Event2");
        }
    }
}