using Microsoft.AspNetCore.Mvc;
using RestSharp;
using Server.Models;

namespace Server.Controllers
{
    [Route("AmazonCloud")]
    [ApiController]
    public class AmazonCloudController : ControllerBase
    {
        [HttpGet("CpuUsage")]
        public void GetCpuUsage(
            [FromQuery(Name = "subscriptionId")] string SubscriptionId,
            [FromQuery(Name = "resourceGroupName")] string ResourceGroupName,
            [FromQuery(Name = "vmname")] string VirtualMachineName,
            [FromQuery(Name = "timespan")] string TimeSpan,
            [FromQuery(Name = "accessToken")] string AccessToken)
        {
            //put code here
        }

        [HttpGet("MemoryUsage")]
        public void GetMemoryUsage(
            [FromQuery(Name = "subscriptionId")] string SubscriptionId,
            [FromQuery(Name = "resourceGroupName")] string ResourceGroupName,
            [FromQuery(Name = "vmname")] string VirtualMachineName,
            [FromQuery(Name = "timespan")] string TimeSpan,
            [FromQuery(Name = "accessToken")] string AccessToken,
            [FromQuery(Name = "MemorySize")] int MemorySizeInGB)
        {
            //put code here
        }

        [HttpGet("NetworkUsage")]
        public void GetNetworkUsage(
            [FromQuery(Name = "subscriptionId")] string SubscriptionId,
            [FromQuery(Name = "resourceGroupName")] string ResourceGroupName,
            [FromQuery(Name = "vmname")] string VirtualMachineName,
            [FromQuery(Name = "timespan")] string TimeSpan,
            [FromQuery(Name = "accessToken")] string AccessToken)
        {
            //put code here
        }

        [HttpGet("DBCpu")]
        public string GetCpuDataFromDB()
        {
            //return AmazonCloud.GetCpuUsageDataFromDB();
            return string.Empty;//delete
        }

        [HttpGet("DBMemory")]
        public string GetMemoryDataFromDB()
        {
            //return AmazonCloud.GetMemoryUsageDataFromDB();
            return string.Empty;//delete
        }

        [HttpGet("DBNetwork")]
        public string GetNetworkDataFromDB()
        {
            //return AmazonCloud.GetNetworkUsageDataFromDB();
            return string.Empty;//delete
        }
    }
}
