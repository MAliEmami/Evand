using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.Domain.Entities.Base;

namespace Evand.Domain.Entities
{
    public class Event : BaseEntity
    {
        public string Name { get; set; } = null!;
        public string Category { get; set; } = null!;
        public double? X { get; set; }
        public double? Y { get; set; }
        public decimal Price { get; set; }
        public string? Photo { get; set; }
        public string Address { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Capacity { get; set; }

        public int OrganizerId { get; set; }
        public User Organizer { get; set; } = null!;

        public DateTime OrganizedDate { get; set; }

        public ICollection<EventParticipant> Participants { get; set; } = new List<EventParticipant>();
        public ICollection<EventLike> Likes { get; set; } = new List<EventLike>();
        public ICollection<EventComment> Comments { get; set; } = new List<EventComment>();
    }
}