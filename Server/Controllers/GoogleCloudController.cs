using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Util;
using Newtonsoft.Json.Linq;
using System.Diagnostics;

namespace Server.Controllers
{
    [Route("GoogleCloud")]
    [ApiController]
    public class GoogleCloudController : ControllerBase
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

        //public static async Task<string> GetAccessToken(string serviceAccountKeyPath, string scopes)
        //{
        //    var credential = await GoogleCredential.FromFileAsync(serviceAccountKeyPath).CreateScopedAsync(scopes);
        //    var accessToken = await credential.GetAccessTokenForRequestAsync();

        //    return accessToken;
        //}

        //    public static object ReadTimeSeriesFields(string projectId,
        //string metricType = "compute.googleapis.com/instance/cpu/utilization")
        //    {
        //        MetricServiceClient metricServiceClient = MetricServiceClient.Create();
        //        // Initialize request argument(s).
        //        string filter = $"metric.type=\"{metricType}\"";
        //        ListTimeSeriesRequest request = new ListTimeSeriesRequest
        //        {
        //            ProjectName = new ProjectName(projectId),
        //            Filter = filter,
        //            Interval = new TimeInterval(),
        //            View = ListTimeSeriesRequest.Types.TimeSeriesView.Headers,
        //        };
        //        // Create timestamp for current time formatted in seconds.
        //        long timeStamp = (long)(DateTime.UtcNow - s_unixEpoch).TotalSeconds;
        //        Timestamp startTimeStamp = new Timestamp();
        //        // Set startTime to limit results to the last 20 minutes.
        //        startTimeStamp.Seconds = timeStamp - (60 * 20);
        //        Timestamp endTimeStamp = new Timestamp();
        //        // Set endTime to current time.
        //        endTimeStamp.Seconds = timeStamp;
        //        TimeInterval interval = new TimeInterval();
        //        interval.StartTime = startTimeStamp;
        //        interval.EndTime = endTimeStamp;
        //        request.Interval = interval;
        //        // Make the request.
        //        PagedEnumerable<ListTimeSeriesResponse, TimeSeries> response =
        //            metricServiceClient.ListTimeSeries(request);
        //        // Iterate over all response items, lazily performing RPCs as required.
        //        Console.Write("Found data points for the following instances:");
        //        foreach (var item in response)
        //        {
        //            Console.WriteLine(JObject.Parse($"{item}").ToString());
        //        }
        //        return 0;
        //    }
    }
}
