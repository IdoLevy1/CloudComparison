using System;
using System.Threading;

namespace MemoryStressTest
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Starting Memory stress test");

            int numCores = Environment.ProcessorCount;
            double memoryInGB = double.Parse(args[0]);
            long bytesPerThread = (long)((memoryInGB * Math.Pow(2, 30)) / (4 * numCores)); // total 0.25 of memory

            for (int i = 0; i < numCores; i++)
            {
                Thread t = new Thread(async () =>
                {
                    byte[] buffer = new byte[bytesPerThread];
                    while (true)
                    {
                        for (int j = 0; j < buffer.Length; j++)
                        {
                            buffer[j]++;
                            //Thread.Sleep(100);
                        }
                    }
                });
                t.Start();
            }
        }
    }
}