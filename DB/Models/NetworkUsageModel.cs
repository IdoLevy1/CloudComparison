using MongoDB.Bson.Serialization.Attributes;

namespace DB.Models
{
    public class NetworkUsageModel
    {
        public const string AzureTableName = "AzureCloudDB-NetworkUsage";
        public const string GCPTableName = "GoogleCloudDB-NetworkUsage";
        public const string AWSTableName = "AmazonCloudDB-NetworkUsage";

        [BsonId]
        public Guid Id { get; set; }
        public int IncomingTraffic{ get; set; }
        public DateTime TimeStamp { get; set; }
    }
}