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

// Add CORS support
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddScoped<PredictionService>();

var app = builder.Build();

// Configure the HTTP request pipeline in development
if (app.Environment.IsDevelopment())
{
    // Enable Swagger for API testing at /swagger
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MMA Tracker API V1");
        c.RoutePrefix = "swagger"; // Move Swagger to /swagger route
    });
}
else
{
    // In production, serve the built React app
    app.UseDefaultFiles();
}

// Enable CORS
app.UseCors();

// Enable HTTPS Redirection
app.UseHttpsRedirection();

// Serve static files (our React frontend)
app.UseStaticFiles();

// Enable Authorization middleware (can be expanded with Authentication later if needed)
app.UseAuthorization();

// Map the controllers to routes (this allows your API endpoints to work)
app.MapControllers();

// Serve the React app for any non-API routes
app.MapFallbackToFile("index.html");

// Run the application
app.Run();
