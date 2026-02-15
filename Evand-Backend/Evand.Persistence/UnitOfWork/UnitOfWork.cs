using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evand.Domain.Entities.Base;
using Evand.Persistence.DbContextes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace Evand.Persistence.UnitOfWork
{
    public class UnitOfWork
    {
        private readonly EvandDbContext _dbContext;

        public UnitOfWork(EvandDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var utcNow = DateTime.UtcNow;

            foreach (var entry in _dbContext.ChangeTracker.Entries<BaseEntity>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = utcNow;
                }
            }

            return _dbContext.SaveChangesAsync(cancellationToken);
        }

        public Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default)
        {
            return _dbContext.Database.BeginTransactionAsync(cancellationToken);
        }

        public Task CommitTransactionAsync(IDbContextTransaction transaction, CancellationToken cancellationToken = default)
        {
            return transaction == null ? throw new ArgumentNullException(nameof(transaction)) :
                transaction.CommitAsync(cancellationToken);
        }

        public Task RollbackTransactionAsync(IDbContextTransaction transaction, CancellationToken cancellationToken = default)
        {
            return transaction == null ? throw new ArgumentNullException(nameof(transaction)) : 
                transaction.RollbackAsync(cancellationToken);
        }

        public async Task<T> ExecuteInTransactionAsync<T>(Func<Task<T>> action, CancellationToken cancellationToken = default)
        {
            await using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);
            try
            {
                var result = await action();
                await transaction.CommitAsync(cancellationToken);
                return result;
            }
            catch
            {
                await transaction.RollbackAsync(cancellationToken);
                throw;
            }
        }
    }
}