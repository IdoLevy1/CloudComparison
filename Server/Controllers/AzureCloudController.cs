using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    [Route("management.azure.com")]
    [ApiController]
    public class AzureCloudController : ControllerBase
    {
        [HttpGet("subscriptions/51c87563-35a7-4233-8d0e-589fc79933c8/resourceGroups/Sadna_group/providers/Microsoft.Compute/virtualMachines/Sadna/providers/microsoft.insights/metrics")]
        public string Get([FromQuery(Name = "api-version")] string version, [FromQuery(Name = "metricnames")] string metricNames, [FromQuery(Name = "timespan")] string timeSpan)
        {
            var options = new RestClientOptions("https://management.azure.com/subscriptions/51c87563-35a7-4233-8d0e-589fc79933c8/resourceGroups/Sadna_group/providers/Microsoft.Compute/virtualMachines/Sadna/providers/microsoft.insights/metrics?api-version=2018-01-01&metricnames=Percentage%20CPU&timespan=2023-02-28T11:00:00Z/2023-02-28T11:01:00Z")
            {
                MaxTimeout = -1
            };
            // client.Timeout = -1;

            var client = new RestClient(options);

            var request = new RestRequest();
            request.AddHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83ODRlMjVkMy1hYWNiLTQwZjAtYWRhZS1hMTUzN2FiMTY4ZTUvIiwiaWF0IjoxNjc3NTc2NDE3LCJuYmYiOjE2Nzc1NzY0MTcsImV4cCI6MTY3NzU4MjAyNywiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQTNzcUpVbzFncjFQK0JocGx2UGF4OEV5TXhjU0YrZTRHMzAzaExSeDhYVjZDdmxoMDRZbS9XWDZ2K3duSmJIYjYiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiYzQ0YjQwODMtM2JiMC00OWMxLWI0N2QtOTc0ZTUzY2JkZjNjIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiJMYW5kYXUiLCJnaXZlbl9uYW1lIjoiQ2hlbiIsImdyb3VwcyI6WyI3ZWI0ZTEwNy03N2VkLTQ4MjEtOWY0MS1mZWQ2ODMyNTk4YmEiLCJiNjA0YWM4MS1jY2E1LTQyOWUtOTcxNC1jOGJhZTI4MzUzY2EiLCIwMjJjOWZjOS1kNjkyLTQ2YjgtODg0My0yZTA5Y2JiNTMyODciXSwiaXBhZGRyIjoiMTQ3LjIzNS4yMDQuMjMiLCJuYW1lIjoiQ2hlbiBMYW5kYXUiLCJvaWQiOiJiMGYxMjEzNS0zNmZmLTQzZDktYTcxYi0zN2Q5OGNkYzI3NGIiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMTgwNzE3NDMzNi0yMzM5OTczNzE5LTE4MDMyMzcyMy02NzQxNyIsInB1aWQiOiIxMDAzMjAwMEM5NzZCODM2IiwicmgiOiIwLkFSOEEweVZPZU11cThFQ3RycUZUZXJGbzVVWklmM2tBdXRkUHVrUGF3ZmoyTUJPRkFIdy4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJMVXVXUUhiSHNvc0R0Q0tWQ1BnalQxZGMxWGN2d1BWbkxWNHRLcnlrSHZBIiwidGlkIjoiNzg0ZTI1ZDMtYWFjYi00MGYwLWFkYWUtYTE1MzdhYjE2OGU1IiwidW5pcXVlX25hbWUiOiJjaGVubGFAbXRhLmFjLmlsIiwidXBuIjoiY2hlbmxhQG10YS5hYy5pbCIsInV0aSI6IkdwWEdZM0wwMEVXRU5zVGFJd0FTQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfdGNkdCI6MTM3MjI0MDczM30.hALTxF5DTLB0SuIM1SZbQvJsgLeO-kdUqtTHtM1kbwmZF-QVrsg26sopSF7KEz1_xHGTVn2TrtnwjLzBXbhPDvOiN9w5kfbXyVNChN97GfAr-MHfi6YF0vZ7qLwNOKEB_ULaRXbMV1kBeTnv4O2T3CxB7P1VKlz5KG0P4Hez9-pPYkbm2mnggouFggI1zyNvQWRLEQ49ew1ftcaDQle1pZ9HV-dooYcwkaXDhdp0E_EG_9rXI1ROpd-SZ8eWA0-6z-yQ9pjHAM0aAoaSBu-kj3NoKTGX2IqIG2x5qGS670SGmMOvSeQ8e0oaNozrwl-0ksKREUmhquC1uyuBdDnVtQ");
            RestResponse response = client.Execute(request);
            return response.Content;
            Console.WriteLine(response.Content);

            try
            {
                Response.StatusCode = 200;
              //   dynamic obj = JsonConvert.DeserializeObject(Response.Body);
               //  Console.WriteLine(obj);
                //JsonConvert.SerializeObject(new Dictionary<string, int>() { ["result"] = result }).
                return Response.Body.ToString();
            }
            catch (Exception ex)
            {
                Response.StatusCode = 409;
                return Response.Body.ToString();

                //  return JsonConvert.SerializeObject(new Dictionary<string, string>() { ["error-message"] = ex.Message });
            }
        }
    }
}
