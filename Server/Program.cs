using NLog;
using NLog.Web;

LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_myAllowSpecificOrigins",
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                      });
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Host.UseNLog();
builder.Services.AddHostedService<InsertDataToDBService>();
var app = builder.Build();

app.UseCors("_myAllowSpecificOrigins");
app.UseAuthorization();
app.MapControllers();
app.Run("http://localhost:8496");
