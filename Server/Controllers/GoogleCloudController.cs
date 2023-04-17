using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("GoogleCloud")]
    [ApiController]
    public class GoogleCloudController : ControllerBase
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
            //return GoogleCloud.GetCpuUsageDataFromDB();
            return string.Empty;//delete
        }

        [HttpGet("DBMemory")]
        public string GetMemoryDataFromDB()
        {
            //return GoogleCloud.GetMemoryUsageDataFromDB();
            return string.Empty;//delete
        }

        [HttpGet("DBNetwork")]
        public string GetNetworkDataFromDB()
        {
            //return GoogleCloud.GetNetworkUsageDataFromDB();
            return string.Empty;//delete
        }
    }
}
