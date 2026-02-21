using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evand.Application.DTOs.User
{
    public class UserDto
    {
        public Guid Guid { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string HashPassword { get; set; } = null!;
        public string? PhoneNumber { get; set; }

        public string? City { get; set; }
        public string? Province { get; set; }
        public string? Avatar { get; set; }
    }
}