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
                return Ok(GoogleCloud.GetInfoFromDB(MachineType, Location));
            }
            catch (Exception ex)
            {
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
                return Ok(GoogleCloud.LoadItemsFromTimeStamp(MachineType, Location, TimeStamp));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
