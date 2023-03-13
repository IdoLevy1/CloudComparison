using Microsoft.AspNetCore.WebUtilities;
using System.Xml.Linq;
using System;
using Microsoft.AspNetCore.Mvc;
using static Azure.Core.HttpHeader;
using RestSharp;
using Azure;
using DB.Models;
using DB;
using Newtonsoft.Json;

namespace Server.Models
{
    public class AzureCloud
    {
        private static readonly MongoHelper DB = new MongoHelper("DB");
        public const string APIVersion = "2018-01-01";
        public static string BuildUrl(string SubscriptionId, string ResourceGroupName, string VirtualMachineName, string TimeSpan, string MetricNames)
        {
            var url = $"https://management.azure.com/subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/virtualMachines/{VirtualMachineName}/providers/microsoft.insights/metrics";
            url = QueryHelpers.AddQueryString(url, new Dictionary<string, string?>
            {
                { "api-version", AzureCloud.APIVersion },
                { "metricnames", MetricNames },
                { "timespan", TimeSpan }
            });

            return url ;
        }

        private static dynamic GetInfoFromResponse(RestResponse Response)
        {
            dynamic memoryUsageInfo = JsonConvert.DeserializeObject(Response.Content);
            return memoryUsageInfo?.value[0].timeseries[0].data[0];
        }

        public static void InsertCpuUsageInfoToDB(RestResponse Response)
        {
            var timeStamps = GetInfoFromResponse(Response);
            CpuUsageModel cpu = new CpuUsageModel
            {
                TimeStamp = timeStamps.timeStamp,
                Percentage = timeStamps.average
            };
            DB.InsertItem(CpuUsageModel.AzureTableName, cpu);
        }

        

        public static void InsertMemoryUsageInfoToDB(RestResponse Response)
        {
            var timeStamps = GetInfoFromResponse(Response);
            MemoryUsageModel memoryUsage = new MemoryUsageModel
            {
                TimeStamp = timeStamps.timeStamp,
                AvailableBytes = timeStamps.average
            };
            DB.InsertItem(MemoryUsageModel.AzureTableName, memoryUsage);
        }

        public static void InsertNetworkUsageInfoToDB(RestResponse Response)
        {
            var timeStamps = GetInfoFromResponse(Response);
            NetworkUsageModel networkUsage = new NetworkUsageModel
            {
                TimeStamp = timeStamps.timeStamp,
                IncomingTraffic = timeStamps.total
            };
            DB.InsertItem(NetworkUsageModel.AzureTableName, networkUsage);
        }
    }
}
