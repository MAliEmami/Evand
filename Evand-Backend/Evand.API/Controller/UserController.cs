using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.API.Controller.Base;
using Evand.Application.DTOs.User;
using Evand.Application.Interfaces;
using Evand.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Evand.API.Controller
{
    [ApiController]
    [Route("User")]
    public class UserController(IService<User, UserDto, UserAddOrUpdateDto> servise)
        : BaseApiController<User, UserDto, UserAddOrUpdateDto>(servise)
    {
        
    }
}