using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.Domain.Entities;
using Evand.Persistence.DbContextes;
using Evand.Persistence.Interfaces;

namespace Evand.Persistence.Repositories.Command
{
    public class EventCommandRepository(EvandDbContext dbContext) : GenericCommandRepository<Event>(dbContext), IGenericCommandRepository<Event>
    {
        
    }
}