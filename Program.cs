using MatchPredictor.Data;
using MatchPredictor.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Register the ApplicationDbContext with SQL Server connection string
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register the controllers
builder.Services.AddControllers();

// Register the Swagger services to generate API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<PredictionService>();

var app = builder.Build();

// Configure the HTTP request pipeline in development
if (app.Environment.IsDevelopment())
{
    // Enable Swagger only in Development mode for testing API
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MMA Tracker API V1");
        c.RoutePrefix = string.Empty; // This makes Swagger available at the root URL
    });
}

// Enable HTTPS Redirection
app.UseHttpsRedirection();

// Enable Authorization middleware (can be expanded with Authentication later if needed)
app.UseAuthorization();

// Map the controllers to routes (this allows your API endpoints to work)
app.MapControllers();

// Run the application

app.Run();
