using Microsoft.AspNetCore.Mvc;
using RestSharp;
using Server.Models;

namespace Server.Controllers
{
    [Route("AmazonCloud")]
    [ApiController]
    public class AmazonCloudController : ControllerBase
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

        }

        [HttpGet("GetMetricsFromDB")]
        public string GetInfoFromDB(
            [FromQuery(Name = "machineType")] string MachineType,
            [FromQuery(Name = "location")] string Location)
        {
            return string.Empty;
        }
    }
}
