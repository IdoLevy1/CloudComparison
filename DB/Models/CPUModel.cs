using MongoDB.Bson.Serialization.Attributes;

namespace DB.Models
{
    public class CPUModel
    {
        public const string AzureTableName = "AzureCloudDB-CPU";
        public const string GCPTableName = "GoogleCloudDB-CPU";
        public const string AWSTableName = "AmazonCloudDB-CPU";

        [BsonId]
        public Guid Id { get; set; }
        public float Percentage { get; set; }
        public DateTime TimeStamp { get; set; }

        //MongoHelper db = new MongoHelper("DB");
        //db.InsertItem(CPUModel.GCPTableName, new CPUModel { Percentage = 100, TimeStamp = DateTime.Now });
        //db.InsertItem(CPUModel.AWSTableName, new CPUModel { Percentage = 100, TimeStamp = DateTime.Now });
        //var items = db.LoadItems<CPUModel>(CPUModel.AzureTableName);
    }
}