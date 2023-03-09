using Azure.Core;
using Azure.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using Server.Models;
using System;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Xml.Linq;
using static System.Net.WebRequestMethods;

namespace Server.Controllers
{
    [Route("AzureCloud")]
    [ApiController]
    public class AzureCloudController : ControllerBase
    {

        [HttpGet("PercentageCPU")]
        public string Get(
            [FromQuery(Name = "subscriptionId")] string subscriptionId,
            [FromQuery(Name = "resourceGroupName")] string resourceGroupName,
            [FromQuery(Name = "vmname")] string vmname,
            [FromQuery(Name = "timespan")] string timeSpan,
            [FromQuery(Name = "accessToken")] string accessToken)
        {
            // in order to send request: http://localhost:8496/AzureCloud/PercentageCPU?subscriptionId=51c87563-35a7-4233-8d0e-589fc79933c8&resourceGroupName=sadnaVM_group&vmname=sadnaVM&timespan=2023-02-28T11:00:00Z/2023-02-28T11:01:00Z&accessToken=

            var url = $"https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmname}/providers/microsoft.insights/metrics";
            url = QueryHelpers.AddQueryString(url, new Dictionary<string, string?>
            {
                { "api-version", AzureCloud.APIVersion },
                { "metricnames", "Percentage%20CPU" },
                { "timespan", timeSpan }
            });

            var options = new RestClientOptions(url)
            {
                MaxTimeout = -1
            };

            var client = new RestClient(options);

            var request = new RestRequest();
            request.AddHeader("Authorization", accessToken);
            RestResponse response = client.Execute(request);
            return response.Content;
        }

        [HttpGet("MemoryUsage")]
        public string GetMemoryUsage(
            [FromQuery(Name = "subscriptionId")] string subscriptionId,
            [FromQuery(Name = "resourceGroupName")] string resourceGroupName,
            [FromQuery(Name = "vmname")] string vmname,
            [FromQuery(Name = "timespan")] string timeSpan,
            [FromQuery(Name = "accessToken")] string accessToken)
        {
        // in order to send request: http://localhost:8496/AzureCloud/PercentageCPU?subscriptionId=51c87563-35a7-4233-8d0e-589fc79933c8&resourceGroupName=sadnaVM_group&vmname=sadnaVM&timespan=2023-02-28T11:00:00Z/2023-02-28T11:01:00Z&accessToken=
        https://management.azure.com/subscriptions/51c87563-35a7-4233-8d0e-589fc79933c8/resourceGroups/SadnaVM_group/providers/Microsoft.Compute/virtualMachines/sadnaVM/providers/microsoft.insights/metrics?api-version=2018-01-01&metricnames=Available Memory Bytes&timespan=2023-02-28T11:00:00Z/2023-02-28T11:01:00Z
            var url = $"https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmname}/providers/microsoft.insights/metrics";
            url = QueryHelpers.AddQueryString(url, new Dictionary<string, string?>
            {
                { "api-version", AzureCloud.APIVersion },
                { "metricnames", "%20eq%20MemoryUsage" },
                { "timespan", timeSpan },
                { "interval", "PT1M" },
                { "aggregation", "Average"},
                { "top", "1"}
            });

            var options = new RestClientOptions(url)
            {
                MaxTimeout = -1
            };

            var client = new RestClient(options);

            var request = new RestRequest();
            request.AddHeader("Authorization", accessToken);
            RestResponse response = client.Execute(request);
            return response.Content;
        }


        [HttpGet("AccessToken")]
        public async void Post(
            [FromQuery(Name = "subscriptionId")] string subscriptionId,
            [FromQuery(Name = "resourceGroupName")] string resourceGroupName,
            [FromQuery(Name = "vmname")] string vmname)
        {
            string tenantId = "784e25d3-aacb-40f0-adae-a1537ab168e5"; //directory id

            // in order to send request: http://localhost:8496/AzureCloud/AccessToken?subscriptionId=51c87563-35a7-4233-8d0e-589fc79933c8&resourceGroupName=Sadna_group&vmname=Sadna&timespan=2023-02-28T11:00:00Z/2023-02-28T11:01:00Z&accessToken=
            Console.WriteLine("");
            string tokenEndpoint = $"https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token";
            string clientId = "a74eab4354ab427fbefabc6a9e4efecc";
            string clientSecret = "ChenLandau20";

            var client = new HttpClient();

            var requestBody = new FormUrlEncodedContent(new[]
            {
            new KeyValuePair<string, string>("grant_type", "Bearer"),
            new KeyValuePair<string, string>("client_id", clientId),
            new KeyValuePair<string, string>("client_secret", clientSecret),
        });

            var response = await client.PostAsync(tokenEndpoint, requestBody);

            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }
    }
}
