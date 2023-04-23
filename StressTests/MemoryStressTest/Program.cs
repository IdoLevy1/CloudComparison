using System;
using System.Threading;

namespace MemoryStressTest
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Starting memory stress test...");

            long totalMemory = GC.GetTotalMemory(true);
            Console.WriteLine("Total memory used before stress test: {0}", totalMemory);
            long numBytes = 2;

            while (true)
            {
                try
                {
                    byte[] buffer = new byte[numBytes];
                    Thread.Sleep(10000); //memory allocation every 10 sec

                }
                catch //memory allocation failed
                {
                    numBytes = 2;
                    totalMemory = GC.GetTotalMemory(true); //max memory allocation
                    Console.WriteLine("Total memory used after stress test: {0}", totalMemory);
                }
                numBytes = numBytes * 2;
                Console.WriteLine("numBytes: {0}", numBytes);
            }
        }
    }
}