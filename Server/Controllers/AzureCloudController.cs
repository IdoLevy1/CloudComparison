using DB.Models;
using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [Route("AzureCloud")]
    [ApiController]
    public class AzureCloudController : ControllerBase
    {
        [HttpGet("GetMetricsFromVM")]
        public ActionResult GetInfoFromVM(
            [FromQuery(Name = "SubscriptionId")] string SubscriptionId,
            [FromQuery(Name = "ResourceGroupName")] string ResourceGroupName,
            [FromQuery(Name = "VirtualMachineName")] string VirtualMachineName,
            [FromQuery(Name = "Timespan")] string TimeSpan,
            [FromQuery(Name = "AccessToken")] string AccessToken,
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
                    metrics = AzureCloud.InsertDummyInfoToDB(TimeSpan, MachineType, Location);
                }
                else
                {
                    metrics = AzureCloud.InsertInfoToDB(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, AccessToken, MachineType, Location, MemorySizeInGB);
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
                return Ok(AzureCloud.GetInfoFromDB(MachineType, Location));
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
