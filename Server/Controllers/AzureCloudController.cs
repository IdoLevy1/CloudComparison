using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using Server.Models;
using System;
using System.Data;
using System.Linq;
using System.Net;
using System.Text;
using System.Xml.Linq;

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
            // in order to send request: http://localhost:8496/AzureCloud/PercentageCPU?subscriptionId=51c87563-35a7-4233-8d0e-589fc79933c8&resourceGroupName=Sadna_group&vmname=Sadna&timespan=2023-02-28T11:00:00Z/2023-02-28T11:01:00Z&accessToken=

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
    }
}
