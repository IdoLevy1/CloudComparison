using MongoDB.Bson.Serialization.Attributes;

namespace DB.Models
{
    public class CpuUsageModel
    {
        public const string AzureTableName = "AzureCloudDB-CpuUsage";
        public const string GCPTableName = "GoogleCloudDB-CpuUsage";
        public const string AWSTableName = "AmazonCloudDB-CpuUsage";

        [BsonId]
        public Guid Id { get; set; }
        public double Percentage { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}