using System;
using Evand.Application.DTOs.Event;
using FluentAssertions;
using NUnit.Framework;

using DomainEvent = Evand.Domain.Entities.Event;

namespace Evand.DTO.Tests
{
    [TestFixture]
    public class EventMapperTests
    {
        [Test]
        public void ToDto_ShouldMapAllFields_FromDomainEntity()
        {
            // Arrange
            var entity = new DomainEvent
            {
                Guid = Guid.NewGuid(),
                Name = "Concert",
                Category = "Music",
                X = 12.34,
                Y = 56.78,
                Price = 49.99m,
                Photo = "photo.jpg",
                Address = "Somewhere St.",
                StartDate = new DateTime(2025, 5, 1, 18, 0, 0),
                EndDate = new DateTime(2025, 5, 1, 21, 0, 0),
                Capacity = 500
            };

            // Act
            var dto = entity.ToDto(entity.Guid);

            // Assert
            dto.Should().NotBeNull();
            dto.Guid.Should().Be(entity.Guid);
            dto.Name.Should().Be(entity.Name);
            dto.Category.Should().Be(entity.Category);
            dto.X.Should().Be(entity.X);
            dto.Y.Should().Be(entity.Y);
            dto.Price.Should().Be(entity.Price);
            dto.Photo.Should().Be(entity.Photo);
            dto.Address.Should().Be(entity.Address);
            dto.StartDate.Should().Be(entity.StartDate);
            dto.EndDate.Should().Be(entity.EndDate);
            dto.Capacity.Should().Be(entity.Capacity);
        }

        [Test]
        public void ToDto_ShouldHandleNullables_FromDomainEntity()
        {
            // Arrange
            var entity = new DomainEvent
            {
                Guid = Guid.NewGuid(),
                Name = "Nullables",
                Category = "Misc",
                X = null,
                Y = null,
                Price = 0m,
                Photo = null,
                Address = "Addr",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddHours(1),
                Capacity = 0
            };

            // Act
            var dto = entity.ToDto(entity.Guid);

            // Assert
            dto.X.Should().BeNull();
            dto.Y.Should().BeNull();
            dto.Photo.Should().BeNull();
        }

        [Test]
        public void ToEntity_ShouldMapAllFields_FromAddOrUpdateDto()
        {
            // Arrange
            var dto = new EventAddOrUpdateDto
            {
                Guid = Guid.NewGuid(),
                Name = "DTO Event",
                Category = "Cat",
                X = 1.23,
                Y = 4.56,
                Price = 19.99m,
                Photo = "p.png",
                Address = "Addr",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddHours(2),
                Capacity = 100
            };

            // Act
            var entity = dto.ToEntity();

            // Assert
            entity.Should().NotBeNull();
            entity.Guid.Should().Be(dto.Guid);
            entity.Name.Should().Be(dto.Name);
            entity.Category.Should().Be(dto.Category);
            entity.X.Should().Be(dto.X);
            entity.Y.Should().Be(dto.Y);
            entity.Price.Should().Be(dto.Price);
            entity.Photo.Should().Be(dto.Photo);
            entity.Address.Should().Be(dto.Address);
            entity.StartDate.Should().Be(dto.StartDate);
            entity.EndDate.Should().Be(dto.EndDate);
            entity.Capacity.Should().Be(dto.Capacity);
        }
    }
}