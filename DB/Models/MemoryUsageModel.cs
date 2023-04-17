using MongoDB.Bson.Serialization.Attributes;

namespace DB.Models
{
    public class MemoryUsageModel
    {
        public const string AzureTableName = "AzureCloudDB-MemoryUsage";
        public const string GCPTableName = "GoogleCloudDB-MemoryUsage";
        public const string AWSTableName = "AmazonCloudDB-MemoryUsage";

        [BsonId]
        public Guid Id { get; set; }
        public int Percentage { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}