using Evand.Application.DTOs.Event;
using Evand.Application.Interfaces;
using Evand.Application.Services;
using Evand.Domain.Entities;
using Evand.Persistence.DbContextes;
using Evand.Persistence.Interfaces;
using Evand.Persistence.Repositories.Command;
using Evand.Persistence.Repositories.Query;
using Evand.Persistence.UnitOfWork;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddScoped<IGenericCommandRepository<Event>, GenericCommandRepository<Event>>();
builder.Services.AddScoped<IGenericQueryRepository<Event>, GenericQueryRepository<Event>>();

builder.Services.AddScoped<IService<Event, EventDto, EventAddOrUpdateDto>, EventService>();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddDbContext<EvandDbContext>(options =>
{
    options.UseInMemoryDatabase("EvandDb");
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseAuthorization();
// app.UseAuthentication();
app.MapControllers();

app.Run();