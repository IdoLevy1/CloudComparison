using System;
using System.Diagnostics;


namespace NetworkStressTest
{
    internal class Program
    {
        static void Main(string[] args)
        {
            for (int i = 0; i < 5; i++)
            {
                cpuStressTest();
            }
        }

        public static void cpuStressTest()
        {
            int numThreads = Environment.ProcessorCount;
            Console.WriteLine($"Number of processor cores: {numThreads}");
            int duration = 60;
            Console.WriteLine("Starting stress test...");
            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start(); 
            for (int i = 0; i < numThreads; i++)
            {
                int threadNum = i;
                System.Threading.ThreadPool.QueueUserWorkItem(state =>
                {
                    while (stopwatch.Elapsed.TotalSeconds < duration) { }
                    Console.WriteLine($"Thread {threadNum + 1} completed.");
                });
            } while (stopwatch.Elapsed.TotalSeconds < duration) { }
            stopwatch.Stop();
            Console.WriteLine($"Stress test completed in {stopwatch.Elapsed.TotalSeconds} seconds.");
            Console.ReadLine();
        }
    }
}
