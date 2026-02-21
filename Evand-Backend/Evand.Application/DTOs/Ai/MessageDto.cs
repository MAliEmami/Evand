using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evand.Application.DTOs.Ai
{
    public class MessageDto
    {
        public string Content { get; set; }
        public string Type { get; set; } = "USER";
    }
}