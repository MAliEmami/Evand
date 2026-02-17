using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.API.Controller.Base;
using Evand.Application.DTOs.Event;
using Evand.Application.Interfaces;
using Evand.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Evand.API.Controller
{
    [ApiController]
    [Route("Event")]
    public class EventApiController(IService<Event, EventDto, EventAddOrUpdateDto> servise)
        : BaseApiController<Event, EventDto, EventAddOrUpdateDto>(servise)
    {
        
    }
}