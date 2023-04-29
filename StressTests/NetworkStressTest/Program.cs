using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Net.Http;
using System.Threading;

namespace NetworkStressTest
{
    internal class Program
    {

        static void Main()
        {

            while (true)
            {
                NetworkStressTest();
                Thread.Sleep(10000); //memory allocation every 10 sec
            }

            
        }
        public static async void NetworkStressTest()
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

        }
    }
}



