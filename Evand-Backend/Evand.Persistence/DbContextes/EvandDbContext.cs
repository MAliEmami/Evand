using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Evand.Persistence.DbContextes
{
    public class EvandDbContext(DbContextOptions<EvandDbContext> options) : DbContext(options)
    {

        // ===== DbSets =====
        public DbSet<User> Users => Set<User>();
        public DbSet<Event> Events => Set<Event>();

        public DbSet<EventParticipant> EventParticipants => Set<EventParticipant>();
        public DbSet<EventLike> EventLikes => Set<EventLike>();
        public DbSet<EventComment> EventComments => Set<EventComment>();

    }
}