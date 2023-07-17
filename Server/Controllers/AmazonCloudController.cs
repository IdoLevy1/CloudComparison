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
<<<<<<< HEAD
=======
                AmazonCloud.Logger.Info($"Get metrics from DB for {MachineType} {Location}");
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
                return Ok(AmazonCloud.GetInfoFromDB(MachineType, Location));
            }
            catch (Exception ex)
            {
<<<<<<< HEAD
=======
                AmazonCloud.Logger.Error(ex.Message);
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
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
<<<<<<< HEAD
=======
                AmazonCloud.Logger.Info($"Get metrics from DB for {MachineType} {Location} at {TimeStamp}");
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
                return Ok(AmazonCloud.LoadItemsFromTimeStamp(MachineType, Location, TimeStamp));
            }
            catch (Exception ex)
            {
<<<<<<< HEAD
=======
                AmazonCloud.Logger.Error(ex.Message);
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
                return BadRequest(ex.Message);
            }
        }
    }
}
