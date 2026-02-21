using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.Application.DTOs.User;
using Evand.Application.Services;
using Evand.Domain.Entities;
using Evand.Persistence.Interfaces;
using FluentAssertions;
using NSubstitute;
using NUnit.Framework;

namespace Evand.Application.Tests
{
    public class UserServiceTests
    {
        private IGenericQueryRepository<User> _queryRepo = null!;
        private IGenericCommandRepository<User> _commandRepo = null!;
        private IUnitOfWork _uow = null!;
        private UserService _service = null!;

        [SetUp]
        public void Setup()
        {
            _queryRepo = Substitute.For<IGenericQueryRepository<User>>();
            _commandRepo = Substitute.For<IGenericCommandRepository<User>>();
            _uow = Substitute.For<IUnitOfWork>();

            _service = new UserService(_queryRepo, _commandRepo, _uow);
        }

        [Test]
        public async Task AddAsync_ValidDto_ShouldCallRepoAndSave()
        {
            var dto = new UserAddOrUpdateDto
            {
                Guid = Guid.NewGuid(),
                FullName = "Test User",
                Email = "a@b.com",
                HashPassword = "hashed",
                PhoneNumber = "123",
                City = "C",
                Province = "P",
                Avatar = "av.png"
            };

            var created = new User
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

            _commandRepo.AddAsync(Arg.Any<User>()).Returns(created);
            _uow.SaveChangesAsync(default).Returns(Task.FromResult(1));

            var result = await _service.AddAsync(dto);

            result.Should().NotBeNull();
            result.Email.Should().Be(dto.Email);
            await _commandRepo.Received(1).AddAsync(Arg.Is<User>(u => u.Guid == dto.Guid && u.Email == dto.Email));
            await _uow.Received(1).SaveChangesAsync(default);
        }

    }
}