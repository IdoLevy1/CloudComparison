using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [Route("AmazonCloud")]
    [ApiController]
    public class AmazonCloudController : ControllerBase
    {
        [HttpGet("GetMetricsFromDB")]
        public ActionResult GetInfoFromDB(
            [FromQuery(Name = "MachineType")] string MachineType,
            [FromQuery(Name = "Location")] string Location)
        {
            try
            {
                AmazonCloud.Logger.Info($"Get metrics from DB for {MachineType} {Location}");
                return Ok(AmazonCloud.GetInfoFromDB(MachineType, Location));
            }
            catch (Exception ex)
            {
                AmazonCloud.Logger.Error(ex.Message);
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
                AmazonCloud.Logger.Info($"Get metrics from DB for {MachineType} {Location} at {TimeStamp}");
                return Ok(AmazonCloud.LoadItemsFromTimeStamp(MachineType, Location, TimeStamp));
            }
            catch (Exception ex)
            {
                AmazonCloud.Logger.Error(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
