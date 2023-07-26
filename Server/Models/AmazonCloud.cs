using Amazon.CloudWatch;
using Amazon.CloudWatch.Model;
using DB;
using DB.Models;
using NLog;
using System;
using System.Globalization;

namespace Server.Models
{
    public class AmazonCloud
    {
        private const string AmazonCloudName = "AmazonCloud";
        private static readonly MongoHelper DB = new MongoHelper();
        private static readonly Random Random = new Random();
        public static readonly NLog.ILogger Logger = LogManager.GetLogger("AmazonCloudLogger");

        public static void InsertInfoToDB(
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
            DateTime endTime = DateTime.ParseExact(EndTime, "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture, DateTimeStyles.AdjustToUniversal);

            VirtualMachineMetricsModel metrics = new VirtualMachineMetricsModel
            {
                TimeStamp = DateTime.ParseExact(StartTime, "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture)
            };
            var tasks = new List<Task>
            {
                Task.Run(() => metrics.PercentageCPU = GetCpuUsageInfo(AccessKey, SecretKey, InstanceId, Region, startTime, endTime)),
                Task.Run(() => metrics.PercentageMemory = GetMemoryUsageInfo(AccessKey, SecretKey, InstanceId, Region, startTime, endTime)),
                Task.Run(() => metrics.IncomingTraffic = GetNetworkInUsageInfo(AccessKey, SecretKey, InstanceId, Region,startTime, endTime)),
                Task.Run(() => metrics.OutcomingTraffic = GetNetworkOutUsageInfo(AccessKey, SecretKey, InstanceId, Region,startTime, endTime))
            };
            Task.WaitAll(tasks.ToArray());

            Logger.Info($"{MachineType} {Location}: PercentageCPU = {metrics.PercentageCPU}, PercentageMemory = {metrics.PercentageMemory}, IncomingTraffic = {metrics.IncomingTraffic}, OutcomingTraffic = {metrics.OutcomingTraffic}");
            DB.InsertItem(AmazonCloudName + MachineType + Location, metrics);
        }

        public static void InsertDummyInfoToDB(string StartTime, string MachineType, string Location)
        {
            VirtualMachineMetricsModel metrics = new VirtualMachineMetricsModel
            {
                TimeStamp = DateTime.ParseExact(StartTime, "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture),
                PercentageCPU = Random.NextDouble() * 10 + 70,
                PercentageMemory = Random.NextDouble() * 10 + 85,
                IncomingTraffic = Random.NextDouble() * 10 + 250,
                OutcomingTraffic = Random.NextDouble() + 0.9
            };

            Logger.Info($"{MachineType} {Location}: PercentageCPU = {metrics.PercentageCPU}, PercentageMemory = {metrics.PercentageMemory}, IncomingTraffic = {metrics.IncomingTraffic}, OutcomingTraffic = {metrics.OutcomingTraffic}");
            DB.InsertItem(AmazonCloudName + MachineType + Location, metrics);
        }

        public static List<VirtualMachineMetricsModel> GetInfoFromDB(string MachineType, string Location)
        {
            return DB.LoadItems<VirtualMachineMetricsModel>(AmazonCloudName + MachineType + Location);
        }

        public static List<VirtualMachineMetricsModel> LoadItemsFromTimeStamp(string MachineType, string Location, string TimeStamp)
        {
            return DB.LoadItemsFromTimeStamp(AmazonCloudName + MachineType + Location, DateTime.ParseExact(TimeStamp, "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture));
        }

        private static dynamic GetInfoFromResponse(GetMetricStatisticsResponse Response)
        {
            if (Response.HttpStatusCode == System.Net.HttpStatusCode.OK)
            {
                return Response.Datapoints[0].Average;
            }
            else
            {
                throw new Exception("Can't get info from VM");
            }
        }

        private static dynamic GetMetricInfo(
            string AccessKey,
            string SecretKey,
            string InstanceId,
            string Region,
            DateTime StartTime,
            DateTime EndTime,
            string MetricName,
            string NameSpace)
        {
            AmazonCloudWatchClient cloudWatchClient = new AmazonCloudWatchClient(AccessKey, SecretKey, Amazon.RegionEndpoint.GetBySystemName(Region));

            GetMetricStatisticsRequest request = new GetMetricStatisticsRequest
            {
                Namespace = NameSpace,
                MetricName = MetricName,
                StartTimeUtc = StartTime,
                EndTimeUtc = EndTime,
                Period = 60, 
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

            if (MetricName == "Memory % Committed Bytes In Use")
            {
                request.Dimensions.Add(new Dimension
                {
                    Name = "objectname",
                    Value = "Memory"
                });
            }

            GetMetricStatisticsResponse response = cloudWatchClient.GetMetricStatisticsAsync(request).GetAwaiter().GetResult();
            return GetInfoFromResponse(response);
        }

        private static double GetCpuUsageInfo(string AccessKey, string SecretKey, string InstanceId, string Region, DateTime StartTime, DateTime EndTime)
        {
            var info = GetMetricInfo(AccessKey, SecretKey, InstanceId, Region, StartTime, EndTime, "CPUUtilization", "AWS/EC2");
            return info;
        }
        private static double GetMemoryUsageInfo(string AccessKey, string SecretKey, string InstanceId, string Region, DateTime StartTime, DateTime EndTime)
        {
            var info = GetMetricInfo(AccessKey, SecretKey, InstanceId, Region, StartTime, EndTime, "Memory % Committed Bytes In Use", "CWAgent");
            return info;
        }

        private static double GetNetworkInUsageInfo(string AccessKey, string SecretKey, string InstanceId, string Region, DateTime StartTime, DateTime EndTime)
        {
            var info = GetMetricInfo(AccessKey, SecretKey, InstanceId, Region, StartTime, EndTime, "NetworkIn", "AWS/EC2");
            return (info * 8 / 60) / Math.Pow(2, 20); // from total bytes in minute to Mbits/s
        }

        private static double GetNetworkOutUsageInfo(string AccessKey, string SecretKey, string InstanceId, string Region, DateTime StartTime, DateTime EndTime)
        {
            var info = GetMetricInfo(AccessKey, SecretKey, InstanceId, Region, StartTime, EndTime, "NetworkOut", "AWS/EC2");
            return (info * 8 / 60) / Math.Pow(2, 20); // from total bytes in minute to Mbits/s
        }
    }
}