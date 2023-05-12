using System.Threading.Tasks;
using System.Net.Http;
using System;

namespace NetworkStressTest
{
    class Program
    {
        static async Task Main()
        {
            Console.WriteLine("Starting Network stress test");
            HttpClient client = new HttpClient();

            while (true)
            {
                try
                {
                    await client.GetAsync("https://example.com");
                }
                catch (Exception)
                {
                    continue;
                }
            }
        }
    }
}
