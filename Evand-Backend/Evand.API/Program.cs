using System.Text;
using System.Text.Json;
using Evand.Application.DTOs.Ai;
using Evand.Application.DTOs.Event;
using Evand.Application.DTOs.User;
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

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});


builder.Services.AddScoped<IGenericCommandRepository<Event>, GenericCommandRepository<Event>>();
builder.Services.AddScoped<IGenericQueryRepository<Event>, GenericQueryRepository<Event>>();
builder.Services.AddScoped<IGenericCommandRepository<User>, GenericCommandRepository<User>>();
builder.Services.AddScoped<IGenericQueryRepository<User>, GenericQueryRepository<User>>();

builder.Services.AddScoped<IService<Event, EventDto, EventAddOrUpdateDto>, EventService>();
builder.Services.AddScoped<IService<User, UserDto, UserAddOrUpdateDto>, UserService>();

builder.Services.AddScoped<IService<Event, EventDto, EventAddOrUpdateDto>, EventService>();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddDbContext<EvandDbContext>(options =>
{
    options.UseInMemoryDatabase("EvandDb");
});



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.MapControllers();

app.MapPost("/api/ai/question", async (AskDto request) =>
{
    if (string.IsNullOrWhiteSpace(request.Question))
        return Results.BadRequest("Question is required");

    using var httpClient = new HttpClient();

    httpClient.DefaultRequestHeaders.Add("Authorization",
        "Bearer tpsg-9ACaQVAYhuhD4asX7NuobGG5kdnPBvT");

    var body = new
    {
        message = new
        {
            content = request.Question,
            type = "USER"
        }
    };

    var json = JsonSerializer.Serialize(body);
    var content = new StringContent(json, Encoding.UTF8, "application/json");

    var response = await httpClient.PostAsync(
        "https://api.metisai.ir/api/v1/chat/session/a310dfc8-b1a6-4d77-91d9-b7d550157d7a/message",
        content);

    if (!response.IsSuccessStatusCode)
        return Results.StatusCode((int)response.StatusCode);

    var responseBody = await response.Content.ReadAsStringAsync();

    // 👇 فقط content رو بخون
    using var doc = JsonDocument.Parse(responseBody);
    var aiContent = doc.RootElement.GetProperty("content").GetString();

    return Results.Ok(aiContent);
});

app.Run();