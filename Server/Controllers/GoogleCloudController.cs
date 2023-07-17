using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [Route("GoogleCloud")]
    [ApiController]
    public class GoogleCloudController : ControllerBase
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
                GoogleCloud.Logger.Info($"Get metrics from DB for {MachineType} {Location}");
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
                return Ok(GoogleCloud.GetInfoFromDB(MachineType, Location));
            }
            catch (Exception ex)
            {
<<<<<<< HEAD
=======
                GoogleCloud.Logger.Error(ex.Message);
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
                GoogleCloud.Logger.Info($"Get metrics from DB for {MachineType} {Location} at {TimeStamp}");
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
                return Ok(GoogleCloud.LoadItemsFromTimeStamp(MachineType, Location, TimeStamp));
            }
            catch (Exception ex)
            {
<<<<<<< HEAD
=======
                GoogleCloud.Logger.Error(ex.Message);
>>>>>>> 62b88ebe38a934635a3335cf6d8ad7c66800ea9d
                return BadRequest(ex.Message);
            }
        }
    }
}
