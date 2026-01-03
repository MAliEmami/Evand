using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.Domain.Entities.Base;

namespace Evand.Domain.Entities
{
    public class EventComment : BaseEntity
    {
        public string Text { get; set; } = null!;

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int EventId { get; set; }
        public Event Event { get; set; } = null!;

        public DateTime CommentedAt { get; set; }
    }
}