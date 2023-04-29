using System;
using System.Diagnostics;
using System.Threading;

namespace NetworkStressTest
{
    internal class Program
    {
        static int counter = 0; // shared counter variable

        static void Main(string[] args)
        {
            while (true)
            {
                cpuStressTest();
                counter = 0;
                Thread.Sleep(10000); //memory allocation every 10 sec
            }
        }

        public static void cpuStressTest()
        {
            int numThreads = Environment.ProcessorCount;
            Thread[] threads = new Thread[numThreads];
            Console.WriteLine($"Number of processor cores: {numThreads}");
            Console.WriteLine("Starting stress test...");
            object lockObj = new object();

            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start(); 

            for (int i = 0; i < numThreads; i++)
            {
                threads[i] = new Thread(() => ThreadProc(lockObj));
                threads[i].Start();
            }

            foreach (Thread thread in threads)
            {
                thread.Join();
            }

            stopwatch.Stop();
            Console.WriteLine($"Counter value: {counter}");

            Console.WriteLine($"Stress test completed in {stopwatch.Elapsed.TotalSeconds} seconds.");
        }
        static void ThreadProc(object lockObj)
        {
           while(counter < 1000000000)
            {
                lock (lockObj)
                {
                    counter++;
                }
            }
        }
    }
}
