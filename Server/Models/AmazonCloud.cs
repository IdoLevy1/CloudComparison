using Amazon.CloudWatch;
using Amazon.CloudWatch.Model;
using DB;
using DB.Models;
using Google.Protobuf.WellKnownTypes;
using System.Globalization;

namespace Server.Models
{
    public class AmazonCloud
    {
        private const string AmazonCloudName = "AmazonCloud";
        private static readonly MongoHelper DB = new MongoHelper();
        private static readonly Random Random = new Random();

        public static VirtualMachineMetricsModel InsertInfoToDB(
            string AccessKey,
            string SecretKey,
            string InstanceId,
            string Region,
            string StartTime,
            string EndTime,
            string MachineType,
            string Location)
        {
            DateTime startTime = DateTime.ParseExact(StartTime, "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture, DateTimeStyles.AdjustToUniversal);
            // DateTime endTime = DateTime.ParseExact(EndTime, "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture, DateTimeStyles.AdjustToUniversal);

            VirtualMachineMetricsModel metrics = new VirtualMachineMetricsModel
            {
                TimeStamp = DateTime.ParseExact(StartTime, "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture)
            };
            var tasks = new List<Task>
            {
                Task.Run(() => metrics.PercentageCPU = GetCpuUsageInfo(AccessKey, SecretKey, InstanceId, Region, startTime)),
                Task.Run(() => metrics.PercentageMemory = GetMemoryUsageInfo(AccessKey, SecretKey, InstanceId, Region, startTime)),
                Task.Run(() => metrics.IncomingTraffic = GetNetworkInUsageInfo(AccessKey, SecretKey, InstanceId, Region,startTime)),
                Task.Run(() => metrics.OutcomingTraffic = GetNetworkOutUsageInfo(AccessKey, SecretKey, InstanceId, Region,startTime))
            };
            Task.WaitAll(tasks.ToArray()); // Wait for all tasks to complete

            DB.InsertItem(AmazonCloudName + MachineType + Location, metrics);
            return metrics;
        }

        public static VirtualMachineMetricsModel InsertDummyInfoToDB(string StartTime, string MachineType, string Location)
        {
            VirtualMachineMetricsModel metrics = new VirtualMachineMetricsModel
            {
                TimeStamp = DateTime.ParseExact(StartTime, "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture),
                PercentageCPU = Random.NextDouble() * 10 + 70, //change random range
                PercentageMemory = Random.NextDouble() * 10 + 30, //change random range
                IncomingTraffic = Random.NextDouble() * 10 + 350, //change random range
                OutcomingTraffic = Random.NextDouble() * 10 + 40 //change random range
            };

            DB.InsertItem(AmazonCloudName + MachineType + Location, metrics);
            return metrics;
        }

        public static List<VirtualMachineMetricsModel> GetInfoFromDB(string MachineType, string Location)
        {
            return DB.LoadItems<VirtualMachineMetricsModel>(AmazonCloudName + MachineType + Location);
        }

        private static dynamic GetMetricInfo(
            string AccessKey,
            string SecretKey,
            string InstanceId,
            string Region,
            DateTime StartTime,
            string MetricName)
        {
            AmazonCloudWatchClient cloudWatchClient = new AmazonCloudWatchClient(AccessKey, SecretKey, Amazon.RegionEndpoint.GetBySystemName(Region));

            GetMetricStatisticsRequest request = new GetMetricStatisticsRequest
            {
                Namespace = "AWS/EC2",
                MetricName = MetricName,
                StartTime = StartTime,
                EndTime = StartTime.AddMinutes(1),
                Period = 60, // 1 minute
                Statistics = new List<string> { "Average" },
                Dimensions = new List<Dimension>
               {
                   new Dimension
                   {
                       Name = "InstanceId",
                       Value = InstanceId
                   }
               }
            };

            GetMetricStatisticsResponse response = cloudWatchClient.GetMetricStatisticsAsync(request).GetAwaiter().GetResult();

            var info = GetInfoFromResponse(response);
            return info;
        }


        private static double GetCpuUsageInfo(string AccessKey, string SecretKey, string InstanceId, string Region, DateTime StartTime)
        {
            var info = GetMetricInfo(AccessKey, SecretKey, InstanceId, Region, StartTime, "CPUUtilization");
            return info;
        }
        private static double GetMemoryUsageInfo(string AccessKey, string SecretKey, string InstanceId, string Region, DateTime StartTime)
        {
            // var info = GetMemoryInfo(AccessKey, SecretKey, InstanceId, StartTime, EndTime, "Memory Available Bytes");
            // return (info * 100) / (double)(MemorySizeInGB * Math.Pow(2, 30));
            return 3;
        }

        private static double GetNetworkInUsageInfo(string AccessKey, string SecretKey, string InstanceId, string Region, DateTime StartTime)
        {
            var info = GetMetricInfo(AccessKey, SecretKey, InstanceId, Region, StartTime, "NetworkIn");
            return (info * 8 / 60) / Math.Pow(2, 20); // from total bytes in minute to Mbits/sec
        }

        private static double GetNetworkOutUsageInfo(string AccessKey, string SecretKey, string InstanceId, string Region, DateTime StartTime)
        {
            var info = GetMetricInfo(AccessKey, SecretKey, InstanceId, Region, StartTime, "NetworkOut");
            return (info * 8 / 60) / Math.Pow(2, 20); // from total bytes in minute to Mbits/sec
        }

        private static dynamic GetMemoryInfo
         (string AccessKey,
         string SecretKey,
         string InstanceId,
         DateTime StartTime,
         string MetricName)
        {
            
            AmazonCloudWatchClient cloudWatchClient = new AmazonCloudWatchClient(AccessKey, SecretKey, Amazon.RegionEndpoint.EUWest2);
            var request = new GetMetricStatisticsRequest
            {
                Namespace = "AWS/EC2",
                MetricName = MetricName,
                Dimensions = new List<Dimension>
                    {
                        new Dimension
                        {
                            Name = "InstanceId",
                            Value = InstanceId
                        }
                    },
                StartTime = StartTime,
                EndTime = StartTime.AddMinutes(1),
                Period = 300,
                Statistics = new List<string> { "Average" }
            };
            GetMetricStatisticsResponse response = cloudWatchClient.GetMetricStatisticsAsync(request).GetAwaiter().GetResult();

            foreach (var dataPoint in response.Datapoints)
            {
                Console.WriteLine($"Timestamp: {dataPoint.Timestamp}");
                Console.WriteLine($"Average: {dataPoint.Average}");
                // You can access other statistical values as needed (e.g., dataPoint.Minimum, dataPoint.Maximum)
            }

            var info = GetInfoFromResponse(response);
            return info;
        }

        


        private static dynamic GetInfoFromResponse(GetMetricStatisticsResponse Response)
        {

            if (Response.HttpStatusCode == System.Net.HttpStatusCode.OK && Response.Datapoints.Count > 0)
            {
                Console.WriteLine($"Timestamp: {Response.Datapoints[0].Timestamp}, dataPoint Info: {Response.Datapoints[0].Average}"); //delete
                return Response.Datapoints[0].Average;
            }
            else
            {
                throw new Exception("Can't get info from VM");
            }
        }
    }
}