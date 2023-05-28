using DB;
using DB.Models;
using Google.Api.Gax;
using Google.Cloud.Monitoring.V3;
using Google.Protobuf.WellKnownTypes;
using System.Globalization;

namespace Server.Models
{
    public class GoogleCloud
    {
        private const string GoogleCloudName = "GoogleCloud";
        private static readonly MongoHelper DB = new MongoHelper();
        private static readonly Random Random = new Random();

        public static void InsertInfoToDB(
            string ProjectId,
            string InstanceId,
            string StartTime,
            string EndTime,
            string JsonFileLocation,
            string MachineType,
            string Location)
        {
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", JsonFileLocation);
            var metricClient = MetricServiceClient.Create();
            var interval = new TimeInterval { EndTime = ParseFromString(EndTime), StartTime = ParseFromString(StartTime) };

            VirtualMachineMetricsModel metrics = new VirtualMachineMetricsModel
            {
                TimeStamp = DateTime.ParseExact(StartTime, "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture)
            };
            var tasks = new List<Task>
            {
                Task.Run(() => metrics.PercentageCPU = GetCpuUsageInfo(ProjectId, InstanceId, metricClient, interval)),
                Task.Run(() => metrics.PercentageMemory = GetMemoryUsageInfo(ProjectId, InstanceId, metricClient, interval)),
                Task.Run(() => metrics.IncomingTraffic = GetNetworkInUsageInfo(ProjectId, InstanceId, metricClient, interval)),
                Task.Run(() => metrics.OutcomingTraffic = GetNetworkOutUsageInfo(ProjectId, InstanceId, metricClient, interval))
            };
            Task.WaitAll(tasks.ToArray());

            DB.InsertItem(GoogleCloudName + MachineType + Location, metrics);
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

            DB.InsertItem(GoogleCloudName + MachineType + Location, metrics);
        }

        public static List<VirtualMachineMetricsModel> GetInfoFromDB(string MachineType, string Location)
        {
            return DB.LoadItems<VirtualMachineMetricsModel>(GoogleCloudName + MachineType + Location);
        }

        public static List<VirtualMachineMetricsModel> LoadItemsFromTimeStamp(string MachineType, string Location, string TimeStamp)
        {
            return DB.LoadItemsFromTimeStamp(GoogleCloudName + MachineType + Location, DateTime.ParseExact(TimeStamp, "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture));
        }

        private static Timestamp ParseFromString(string DateTimeString)
        {
            DateTime dateTime = DateTime.ParseExact(DateTimeString, "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal);
            return Timestamp.FromDateTime(dateTime);
        }

        private static PagedEnumerable<ListTimeSeriesResponse, TimeSeries> GetMetricInfo(
            string ProjectId,
            string InstanceId,
            MetricServiceClient MetricClient,
            TimeInterval Interval,
            string MetricType)
        {
            var filter = $"metric.type=\"{MetricType}\" resource.type=\"gce_instance\" resource.labels.instance_id=\"{InstanceId}\"";
            var request = new ListTimeSeriesRequest { Name = $"projects/{ProjectId}", Filter = filter, Interval = Interval };
            return MetricClient.ListTimeSeries(request);
        }

        public static double GetCpuUsageInfo(string ProjectId, string InstanceId, MetricServiceClient MetricClient, TimeInterval Interval)
        {
            var response = GetMetricInfo(ProjectId, InstanceId, MetricClient, Interval, "compute.googleapis.com/instance/cpu/utilization");
            return response.FirstOrDefault().Points.LastOrDefault().Value.DoubleValue * 100;
        }

        private static double GetMemoryUsageInfo(string ProjectId, string InstanceId, MetricServiceClient MetricClient, TimeInterval Interval)
        {
            var response = GetMetricInfo(ProjectId, InstanceId, MetricClient, Interval, "agent.googleapis.com/memory/percent_used");
            return 100 - response.FirstOrDefault().Points.LastOrDefault().Value.DoubleValue;
        }

        private static double GetNetworkInUsageInfo(string ProjectId, string InstanceId, MetricServiceClient MetricClient, TimeInterval Interval)
        {
            var response = GetMetricInfo(ProjectId, InstanceId, MetricClient, Interval, "compute.googleapis.com/instance/network/received_bytes_count");
            var networkIn = response.FirstOrDefault().Points.LastOrDefault().Value.Int64Value;
            return (networkIn * 8 / 60) / Math.Pow(2, 20); // from total bytes in minute to Mbits/s
        }

        private static double GetNetworkOutUsageInfo(string ProjectId, string InstanceId, MetricServiceClient MetricClient, TimeInterval Interval)
        {
            var response = GetMetricInfo(ProjectId, InstanceId, MetricClient, Interval, "compute.googleapis.com/instance/network/sent_bytes_count");
            var networkOut = response.FirstOrDefault().Points.LastOrDefault().Value.Int64Value;
            return (networkOut * 8 / 60) / Math.Pow(2, 20); // from total bytes in minute to Mbits/s
        }
    }
}
