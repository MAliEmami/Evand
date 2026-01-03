using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Evand.Domain.Entities.Base;

namespace Evand.Domain.Entities
{
    public class User : BaseEntity
    {
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string HashPassword { get; set; } = null!;
        public string? PhoneNumber { get; set; }

        public string? City { get; set; }

        public string? Province { get; set; }
        public string? Avatar { get; set; }

        public ICollection<EventParticipant> ParticipatedEvents { get; set; } = new List<EventParticipant>();
        public ICollection<EventLike> LikedEvents { get; set; } = new List<EventLike>();
        public ICollection<EventComment> Comments { get; set; } = new List<EventComment>();
    }
}