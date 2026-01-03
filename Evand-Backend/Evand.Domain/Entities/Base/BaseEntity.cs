using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evand.Domain.Entities.Base
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}