using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Diagnostics;
using System.Net.Http;
using System.Diagnostics;

namespace NetworkStressTest
{
    internal class Program
    {

        static async Task Main()
        {
            Console.WriteLine("Starting network stress test...");

            int numRequests = 100; // Number of requests to send
            string url = "https://example.com"; // URL of web server to test

            // Create a HTTP client and send multiple requests
            HttpClient client = new HttpClient();
            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();
            for (int i = 0; i < numRequests; i++)
            {
                HttpResponseMessage response = await client.GetAsync(url);
                Console.WriteLine("Response status code: {0}", response.StatusCode);
            }
            stopwatch.Stop();

            Console.WriteLine("Total time taken: {0} milliseconds", stopwatch.ElapsedMilliseconds);
            Console.WriteLine("Average time per request: {0} milliseconds", stopwatch.ElapsedMilliseconds / numRequests);

            Console.WriteLine("Press any key to exit.");
            Console.ReadKey();
        }
    }
}



