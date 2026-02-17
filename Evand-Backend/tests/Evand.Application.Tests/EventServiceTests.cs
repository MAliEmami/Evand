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
            // TODO: implement test (arrange/act/assert)
        }
    }
}