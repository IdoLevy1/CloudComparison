using DB.Models;
using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [Route("GoogleCloud")]
    [ApiController]
    public class GoogleCloudController : ControllerBase
    {
        [HttpGet("GetMetricsFromVM")]
        public ActionResult GetInfoFromVM(
            [FromQuery(Name = "ProjectId")] string ProjectId,
            [FromQuery(Name = "InstanceId")] string InstanceId,
            [FromQuery(Name = "StartTime")] string StartTime,
            [FromQuery(Name = "EndTime")] string EndTime,
            [FromQuery(Name = "JsonFileLocation")] string JsonFileLocation,
            [FromQuery(Name = "MachineType")] string MachineType,
            [FromQuery(Name = "Location")] string Location,
            [FromQuery(Name = "MemorySize")] double MemorySizeInGB)
        {
            try
            {
                VirtualMachineMetricsModel metrics;
                // Due to low budget we are running only VM with RAM size up to 4GB, if we send bigger size we should insert dummy data
                if (MemorySizeInGB > 4)
                {
                    metrics = GoogleCloud.InsertDummyInfoToDB(StartTime, MachineType, Location);
                }
                else
                {
                    metrics = GoogleCloud.InsertInfoToDB(ProjectId, InstanceId, StartTime, EndTime, JsonFileLocation, MachineType, Location);
                }

                return Ok(metrics);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

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
    }
}
