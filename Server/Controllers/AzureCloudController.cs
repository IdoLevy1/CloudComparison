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
            [FromQuery(Name = "subscriptionId")] string SubscriptionId,
            [FromQuery(Name = "resourceGroupName")] string ResourceGroupName,
            [FromQuery(Name = "vmname")] string VirtualMachineName,
            [FromQuery(Name = "timespan")] string TimeSpan,
            [FromQuery(Name = "accessToken")] string AccessToken,
            [FromQuery(Name = "machineType")] string MachineType,
            [FromQuery(Name = "location")] string Location,
            [FromQuery(Name = "memorySize")] int MemorySizeInGB)
        {
            try
            {
                // Due to low budget we are running only VM with RAM size up to 4GB, if we send bigger size we should insert dummy data
                if (MemorySizeInGB > 4) 
                {
                    AzureCloud.InsertDummyInfoToDB(TimeSpan, MachineType, Location, MemorySizeInGB);
                }
                else
                {
                    AzureCloud.InsertInfoToDB(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, AccessToken, MachineType, Location, MemorySizeInGB);
                }

                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetMetricsFromDB")]
        public ActionResult GetInfoFromDB(
            [FromQuery(Name = "machineType")] string MachineType,
            [FromQuery(Name = "location")] string Location)
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
