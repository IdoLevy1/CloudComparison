using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemoryStressTest
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Starting memory stress test...");

            long totalMemory = GC.GetTotalMemory(true);
            Console.WriteLine("Total memory used before stress test: {0}", totalMemory);

            // Allocate a large amount of memory
            int numBytes = 1024 * 1024 * 500; // 500 MB
            byte[] buffer = new byte[numBytes];

            // Fill the memory with random data
            Random rand = new Random();
            for (int i = 0; i < buffer.Length; i++)
            {
                buffer[i] = (byte)rand.Next(256);
            }

            // Print the total memory used after stress test
            totalMemory = GC.GetTotalMemory(true);
            Console.WriteLine("Total memory used after stress test: {0}", totalMemory);

            Console.WriteLine("Press any key to exit.");
            Console.ReadKey();
        }
    }
}