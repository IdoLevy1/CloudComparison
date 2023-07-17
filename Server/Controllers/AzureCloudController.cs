using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [Route("AzureCloud")]
    [ApiController]
    public class AzureCloudController : ControllerBase
    {
        [HttpGet("GetMetricsFromDB")]
        public ActionResult GetInfoFromDB(
            [FromQuery(Name = "MachineType")] string MachineType,
            [FromQuery(Name = "Location")] string Location)
        {
            try
            {
                AzureCloud.Logger.Info($"Get metrics from DB for {MachineType} {Location}");
                return Ok(AzureCloud.GetInfoFromDB(MachineType, Location));
            }
            catch(Exception ex) 
            {
                AzureCloud.Logger.Error(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetMetricsFromTimeStamp")]
        public ActionResult GetMetricsFromTimeStamp(
            [FromQuery(Name = "MachineType")] string MachineType,
            [FromQuery(Name = "Location")] string Location,
            [FromQuery(Name = "TimeStamp")] string TimeStamp)
        {
            try
            {
                AzureCloud.Logger.Info($"Get metrics from DB for {MachineType} {Location} at {TimeStamp}");
                return Ok(AzureCloud.LoadItemsFromTimeStamp(MachineType, Location, TimeStamp));
            }
            catch (Exception ex)
            {
                AzureCloud.Logger.Error(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
