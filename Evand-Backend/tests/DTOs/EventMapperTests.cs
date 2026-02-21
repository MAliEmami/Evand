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
 
    }
}