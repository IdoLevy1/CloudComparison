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
            dynamic info = JsonConvert.DeserializeObject(Response.Content);
            return info?.value[0].timeseries[0].data[0];
        }

        public static void InsertCpuUsageInfoToDB(RestResponse Response)
        {
            var info = GetInfoFromResponse(Response);
            CpuUsageModel cpu = new CpuUsageModel
            {
                TimeStamp = info.timeStamp,
                Percentage = info.average
            };
            DB.InsertItem(CpuUsageModel.AzureTableName, cpu);
        }

        public static string GetCpuUsageInfoFromDB()
        {
            var items = DB.LoadItems<CpuUsageModel>(CpuUsageModel.AzureTableName);
            var percentageList = items.Select(data => data.Percentage).ToList();
            var timeStampList = items.Select(data => data.TimeStamp.ToString("HH:mm")).ToList();

            return JsonConvert.SerializeObject(new { percentageList, timeStampList });
        }


        public static void InsertMemoryUsageInfoToDB(RestResponse Response, int MemorySizeInGB)
        {
            var info = GetInfoFromResponse(Response);
            MemoryUsageModel memoryUsage = new MemoryUsageModel
            {
                TimeStamp = info.timeStamp,
                AvailableBytes = (info.average * 100) / (MemorySizeInGB * Math.Pow(2, 30))
            };
            DB.InsertItem(MemoryUsageModel.AzureTableName, memoryUsage);
        }

        public static void InsertNetworkUsageInfoToDB(RestResponse Response)
        {
            var info = GetInfoFromResponse(Response);
            NetworkUsageModel networkUsage = new NetworkUsageModel
            {
                TimeStamp = info.timeStamp,
                IncomingTraffic = info.total
            };
            DB.InsertItem(NetworkUsageModel.AzureTableName, networkUsage);
        }
    }
}
