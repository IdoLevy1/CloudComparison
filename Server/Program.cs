<<<<<<< HEAD
=======
using NLog;
using NLog.Web;

LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
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
<<<<<<< HEAD
=======
builder.Host.UseNLog();
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
builder.Services.AddHostedService<InsertDataToDBService>();
var app = builder.Build();

app.UseCors("_myAllowSpecificOrigins");
app.UseAuthorization();
app.MapControllers();
app.Run("http://localhost:8496");
