using System;
using Evand.Application.DTOs.User;
using FluentAssertions;
using NUnit.Framework;
using DomainUser = Evand.Domain.Entities.User;

namespace Evand.DTO.Tests
{
    [TestFixture]
    public class UserMapperTests
    {
        [Test]
        public void ToDto_ShouldMapAllFields_FromDomainEntity()
        {
            // Arrange
            var entity = new DomainUser
            {
                Guid = Guid.NewGuid(),
                FullName = "Test User",
                Email = "test@example.com",
                HashPassword = "hashed-pw",
                PhoneNumber = "09120000000",
                City = "Tehran",
                Province = "TehranProv",
                Avatar = "avatar.png"
            };

            // Act
            var dto = entity.ToDto(entity.Guid);

            // Assert
            dto.Should().NotBeNull();
            dto.Guid.Should().Be(entity.Guid);
            dto.FullName.Should().Be(entity.FullName);
            dto.Email.Should().Be(entity.Email);
            dto.HashPassword.Should().Be(entity.HashPassword);
            dto.PhoneNumber.Should().Be(entity.PhoneNumber);
            dto.City.Should().Be(entity.City);
            dto.Province.Should().Be(entity.Province);
            dto.Avatar.Should().Be(entity.Avatar);
        }

        [Test]
        public void ToDto_ShouldPreserveNullables_FromDomainEntity()
        {
            // Arrange
            var entity = new DomainUser
            {
                Guid = Guid.NewGuid(),
                FullName = "Nullable User",
                Email = "nullable@example.com",
                HashPassword = "h",
                PhoneNumber = null,
                City = null,
                Province = null,
                Avatar = null
            };

            // Act
            var dto = entity.ToDto(entity.Guid);

            // Assert
            dto.PhoneNumber.Should().BeNull();
            dto.City.Should().BeNull();
            dto.Province.Should().BeNull();
            dto.Avatar.Should().BeNull();
        }

        [Test]
        public void ToEntity_ShouldMapAllFields_FromAddOrUpdateDto()
        {
            // Arrange
            var dto = new UserAddOrUpdateDto
            {
                Guid = Guid.NewGuid(),
                FullName = "DTO User",
                Email = "dto@example.com",
                HashPassword = "dto-hash",
                PhoneNumber = "09870000000",
                City = "CityX",
                Province = "ProvX",
                Avatar = "dto-avatar.png"
            };

            // Act
            var entity = dto.ToEntity();

            // Assert
            entity.Should().NotBeNull();
            entity.Guid.Should().Be(dto.Guid);
            entity.FullName.Should().Be(dto.FullName);
            entity.Email.Should().Be(dto.Email);
            entity.HashPassword.Should().Be(dto.HashPassword);
            entity.PhoneNumber.Should().Be(dto.PhoneNumber);
            entity.City.Should().Be(dto.City);
            entity.Province.Should().Be(dto.Province);
            entity.Avatar.Should().Be(dto.Avatar);
        }


    }
}