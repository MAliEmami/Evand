using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evand.Application.DTOs.Event
{
    public class EventAddOrUpdateDto
    {
        public Guid Guid { get; set; }
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
        // public int OrganizerGuid { get; set; }
    }
}