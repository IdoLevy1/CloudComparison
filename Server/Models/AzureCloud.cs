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
        private static MongoHelper DB = new MongoHelper("DB");
        public static string APIVersion = "2018-01-01";
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

        public static void InsertCPUInfoToDB(RestResponse Response)
        {
            dynamic cpuPercentageInfo = JsonConvert.DeserializeObject(Response.Content);
            var timeStamps = cpuPercentageInfo?.value[0].timeseries[0].data[0];

            CPUModel cpu = new CPUModel
            {
                TimeStamp = timeStamps.timeStamp,
                Percentage = timeStamps.average
            };
            
            DB.InsertItem(CPUModel.AzureTableName, cpu);
        }

        public static void InsertMemoryUsageInfoToDB(RestResponse Response)
        {
            dynamic memoryUsageInfo = JsonConvert.DeserializeObject(Response.Content);
            var timeStamps = memoryUsageInfo?.value[0].timeseries[0].data[0];

            MemoryUsageModel memoryUsage = new MemoryUsageModel
            {
                TimeStamp = timeStamps.timeStamp,
                Percentage = timeStamps.average
            };

            DB.InsertItem(MemoryUsageModel.AzureTableName, memoryUsage);
        }
    }
}
