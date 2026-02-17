using System;
using System.Threading.Tasks;
using Evand.Application.DTOs.Event;
using Evand.Application.Services;
using Evand.Domain.Entities;
using Evand.Persistence.Interfaces;
using FluentAssertions;
using Moq;
using Xunit;

namespace Evand.Application.Tests
{
    public class EventServiceTests
    {
        private readonly Mock<IGenericQueryRepository<Event>> _queryRepoMock;
        private readonly Mock<IGenericCommandRepository<Event>> _commandRepoMock;
        private readonly Mock<IUnitOfWork> _uowMock;
        private readonly EventService _service;

        public EventServiceTests()
        {
            _queryRepoMock = new Mock<IGenericQueryRepository<Event>>();
            _commandRepoMock = new Mock<IGenericCommandRepository<Event>>();
            _uowMock = new Mock<IUnitOfWork>();

            _service = new EventService(
                _queryRepoMock.Object,
                _commandRepoMock.Object,
                _uowMock.Object
            );
        }

        [Fact]
        public async Task AddAsync_Should_Call_CommandRepo_And_SaveChanges_And_Return_Entity()
        {
            // Arrange
            var dto = new EventAddOrUpdateDto
            {
                Guid = Guid.NewGuid(),
                Name = "UnitTest Event",
                Category = "Test",
                Address = "Test Address",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddHours(2),
                Capacity = 100,
                Price = 9.99m
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

            _commandRepoMock
                .Setup(r => r.AddAsync(It.IsAny<Event>()))
                .ReturnsAsync(createdEntity);

            _uowMock
                .Setup(u => u.SaveChangesAsync(default))
                .ReturnsAsync(1);

            // Act
            var result = await _service.AddAsync(dto);

            // Assert
            result.Should().NotBeNull("service should return created entity");
            result.Should().BeEquivalentTo(createdEntity, options => options
                .Excluding(e => e.Id)); 

            _commandRepoMock.Verify(r => r.AddAsync(It.Is<Event>(e => e.Name == dto.Name && e.Guid == dto.Guid)), Times.Once);
            _uowMock.Verify(u => u.SaveChangesAsync(default), Times.Once);
        }
    }
}