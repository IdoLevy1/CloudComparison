using Microsoft.AspNetCore.WebUtilities;
using RestSharp;
using DB.Models;
using DB;
using Newtonsoft.Json;
using System.Globalization;

namespace Server.Models
{
    public class AzureCloud
    {
        private const string AzureCloudName = "AzureCloud";
        private static readonly MongoHelper DB = new MongoHelper("DB");

        public static void InsertInfoToDB(
            string SubscriptionId,
            string ResourceGroupName,
            string VirtualMachineName,
            string TimeSpan,
            string AccessToken,
            string MachineType,
            string Location,
            double MemorySizeInGB)
        {
            string[] parts = TimeSpan.Split('/');
            VirtualMachineMetricsModel metrics = new VirtualMachineMetricsModel
            {
                TimeStamp = DateTime.ParseExact(parts[0], "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture)
            };
            var tasks = new List<Task>
            {
                Task.Run(() => metrics.PercentageCPU = GetCpuUsageInfo(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, AccessToken)),
                Task.Run(() => metrics.PercentageMemory = GetMemoryUsageInfo(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, AccessToken, MemorySizeInGB)),
                Task.Run(() => metrics.IncomingTraffic = GetNetworkInUsageInfo(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, AccessToken)),
                Task.Run(() => metrics.OutcomingTraffic = GetNetworkOutUsageInfo(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, AccessToken))
            };
            Task.WaitAll(tasks.ToArray()); // Wait for all tasks to complete

            DB.InsertItem(AzureCloudName + MachineType + Location, metrics);
        }

        public static List<VirtualMachineMetricsModel> GetInfoFromDB(string MachineType, string Location)
        {
            return DB.LoadItems<VirtualMachineMetricsModel>(AzureCloudName + MachineType + Location);
        }

        private static string BuildUrl(string SubscriptionId, string ResourceGroupName, string VirtualMachineName, string TimeSpan, string MetricName)
        {
            var url = $"https://management.azure.com/subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/virtualMachines/{VirtualMachineName}/providers/microsoft.insights/metrics";
            url = QueryHelpers.AddQueryString(url, new Dictionary<string, string?>
            {
                { "api-version", "2018-01-01" },
                { "metricnames", MetricName },
                { "timespan", TimeSpan }
            });

            return url ;
        }

        private static dynamic GetInfoFromResponse(RestResponse Response)
        {
            if(Response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                dynamic info = JsonConvert.DeserializeObject(Response.Content);
                return info?.value[0].timeseries[0].data[0];
            }
            else
            {
                throw new Exception("Can't get info from VM");
            }
        }
        
        private static dynamic GetMetricInfo(string SubscriptionId,
            string ResourceGroupName,
            string VirtualMachineName,
            string TimeSpan,
            string AccessToken,
            string MetricName)
        {
            var url = BuildUrl(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, MetricName);
            var options = new RestClientOptions(url) { MaxTimeout = -1 };
            var client = new RestClient(options);
            var request = new RestRequest();
            request.AddHeader("Authorization", AccessToken);
            RestResponse response = client.Execute(request);
            var info = GetInfoFromResponse(response);
            return info;
        }

        private static double GetCpuUsageInfo(string SubscriptionId, string ResourceGroupName, string VirtualMachineName, string TimeSpan, string AccessToken)
        {
            var info = GetMetricInfo(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, AccessToken, "Percentage%20CPU");
            return info.average;
        }

        private static double GetMemoryUsageInfo(string SubscriptionId, string ResourceGroupName, string VirtualMachineName, string TimeSpan, string AccessToken, double MemorySizeInGB)
        {
            var info = GetMetricInfo(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, AccessToken, "Available Memory Bytes");
            return (info.average * 100) / (double)(MemorySizeInGB * Math.Pow(2, 30));
        }

        private static double GetNetworkInUsageInfo(string SubscriptionId, string ResourceGroupName, string VirtualMachineName, string TimeSpan, string AccessToken)
        {
            var info = GetMetricInfo(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, AccessToken, "Network In");
            return (info.total * 8) / Math.Pow(2, 20); // from bytes/sec to Mbits/sec
        }

        private static double GetNetworkOutUsageInfo(string SubscriptionId, string ResourceGroupName, string VirtualMachineName, string TimeSpan, string AccessToken)
        {
            var info = GetMetricInfo(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, AccessToken, "Network Out");
            return (info.total * 8) / Math.Pow(2, 20); // from bytes/sec to Mbits/sec
        }
    }
}
