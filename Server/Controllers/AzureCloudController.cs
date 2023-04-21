using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [Route("AzureCloud")]
    [ApiController]
    public class AzureCloudController : ControllerBase
    {
        [HttpGet("GetMetricsFromVM")]
        public void GetInfoFromVM(
            [FromQuery(Name = "subscriptionId")] string SubscriptionId,
            [FromQuery(Name = "resourceGroupName")] string ResourceGroupName,
            [FromQuery(Name = "vmname")] string VirtualMachineName,
            [FromQuery(Name = "timespan")] string TimeSpan,
            [FromQuery(Name = "accessToken")] string AccessToken,
            [FromQuery(Name = "machineType")] string MachineType,
            [FromQuery(Name = "location")] string Location,
            [FromQuery(Name = "memorySize")] int MemorySizeInGB)
        {
            AzureCloud.InsertInfoToDB(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, AccessToken, MachineType, Location, MemorySizeInGB);
        }

        [HttpGet("GetMetricsFromDB")]
        public string GetInfoFromDB(
            [FromQuery(Name = "machineType")] string MachineType,
            [FromQuery(Name = "location")] string Location)
        {
            return AzureCloud.GetInfoFromDB(MachineType, Location); 
        }
    }
}
