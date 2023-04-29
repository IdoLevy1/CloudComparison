using Azure;
using DB;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Compute.v1;
using Data = Google.Apis.Compute.v1.Data;

namespace Server.Models
{
    public class GoogleCloud
    {
        private const string GoogleCloudName = "GoogleCloud";
        private static readonly MongoHelper DB = new MongoHelper("DB");


        //public static void GetCpuUsageInfo(string projectId, string zoneName, string instanceName, string timeSpan, string accessToken)
        //{
        //    ComputeService computeService = new ComputeService(new BaseClientService.Initializer
        //    {
        //        HttpClientInitializer = GetCredential(),
        //        ApplicationName = "Google-ComputeSample/0.1",
        //    });

        //    // Project ID for this request.
        //    string project = "leafy-bond-384014";  // TODO: Update placeholder value.

        //    // The name of the zone for this request.
        //    string zone = "us-west4-b";  // TODO: Update placeholder value.

        //    // TODO: Assign values to desired properties of `requestBody`:
        //    Data.Instance requestBody = new Data.Instance();

        //    InstancesResource.InsertRequest request = computeService.Instances.Insert(requestBody, project, zone);

        //    // To execute asynchronously in an async method, replace `request.Execute()` as shown:
        //    Data.Operation response = request.Execute();
        //    // Data.Operation response = await request.ExecuteAsync();

        //    // TODO: Change code below to process the `response` object:
        //    Console.WriteLine(JsonConvert.SerializeObject(response));
        //}

        //public static GoogleCredential GetCredential()
        //{
        //    GoogleCredential credential = Task.Run(() => GoogleCredential.GetApplicationDefaultAsync()).Result;
        //    if (credential.IsCreateScopedRequired)
        //    {
        //        credential = credential.CreateScoped("https://www.googleapis.com/auth/cloud-platform");
        //    }
        //    return credential;
        //}
        
    }
}
