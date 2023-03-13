using Azure.Core;
using Azure.Identity;
using DB;
using DB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
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
using System.Text.Json.Nodes;
using System.Xml.Linq;
using static System.Net.WebRequestMethods;

namespace Server.Controllers
{
    [Route("AzureCloud")]
    [ApiController]
    public class AzureCloudController : ControllerBase
    {
        [HttpGet("CpuUsage")]
        public void GetCpuUsage(
            [FromQuery(Name = "subscriptionId")] string SubscriptionId,
            [FromQuery(Name = "resourceGroupName")] string ResourceGroupName,
            [FromQuery(Name = "vmname")] string VirtualMachineName,
            [FromQuery(Name = "timespan")] string TimeSpan,
            [FromQuery(Name = "accessToken")] string AccessToken)
        {
            var url = AzureCloud.BuildUrl(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, "Percentage%20CPU");
            var options = new RestClientOptions(url) { MaxTimeout = -1 };
            var client = new RestClient(options);
            var request = new RestRequest();
            request.AddHeader("Authorization", AccessToken);

            try
            {
                RestResponse response = client.Execute(request);
                AzureCloud.InsertCpuUsageInfoToDB(response);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());// change
            }

            //return response.Content; // change - what should we return?
            //return JsonConvert.SerializeObject(new string("works"));
        }

        [HttpGet("MemoryUsage")]
        public void GetMemoryUsage(
            [FromQuery(Name = "subscriptionId")] string SubscriptionId,
            [FromQuery(Name = "resourceGroupName")] string ResourceGroupName,
            [FromQuery(Name = "vmname")] string VirtualMachineName,
            [FromQuery(Name = "timespan")] string TimeSpan,
            [FromQuery(Name = "accessToken")] string AccessToken)
        {
            var url = AzureCloud.BuildUrl(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, "Available Memory Bytes");
            var options = new RestClientOptions(url) { MaxTimeout = -1 };
            var client = new RestClient(options);
            var request = new RestRequest();
            request.AddHeader("Authorization", AccessToken);

            try
            {
                RestResponse response = client.Execute(request);
                AzureCloud.InsertMemoryUsageInfoToDB(response);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());// change
            }

            //return response.Content;
            
        }

        [HttpGet("NetworkUsage")]
        public void GetNetworkUsage(
            [FromQuery(Name = "subscriptionId")] string SubscriptionId,
            [FromQuery(Name = "resourceGroupName")] string ResourceGroupName,
            [FromQuery(Name = "vmname")] string VirtualMachineName,
            [FromQuery(Name = "timespan")] string TimeSpan,
            [FromQuery(Name = "accessToken")] string AccessToken)
        {
            var url = AzureCloud.BuildUrl(SubscriptionId, ResourceGroupName, VirtualMachineName, TimeSpan, "Network In");
            var options = new RestClientOptions(url) { MaxTimeout = -1 };
            var client = new RestClient(options);
            var request = new RestRequest();
            request.AddHeader("Authorization", AccessToken);

            try
            {
                RestResponse response = client.Execute(request);
                AzureCloud.InsertNetworkUsageInfoToDB(response);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());// change
            }

            //return response.Content;
        }

        [HttpGet("DBCpu")]
        public string GetCpuDataFromDB()
        {
            return AzureCloud.GetCpuUsageInfoFromDB();
        }


        [HttpGet("AccessToken")]
        public async void Post(
            [FromQuery(Name = "subscriptionId")] string subscriptionId,
            [FromQuery(Name = "resourceGroupName")] string resourceGroupName,
            [FromQuery(Name = "vmname")] string vmname)
        {
            string tenantId = "784e25d3-aacb-40f0-adae-a1537ab168e5"; //directory id

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
