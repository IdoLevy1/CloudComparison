using DB.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DB
{
    public class MongoHelper
    {
        private readonly IMongoDatabase db;

        public MongoHelper()
        {
            var client = new MongoClient("mongodb+srv://chen201296:Ac57RY9AvJxq2U91@clouds.mnwjvlg.mongodb.net/");
            db = client.GetDatabase("CloudsComparison"); 
        }

        public void InsertItem<T>(string table, T item)
        {
            var collection = db.GetCollection<T>(table);
            collection.InsertOne(item);
        }

        public List<T> LoadItems<T>(string table)
        {
            var collection = db.GetCollection<T>(table);
            return collection.Find(new BsonDocument()).ToList();
        }

        public List<VirtualMachineMetricsModel> LoadItemsFromTimeStamp(string table, DateTime time)
        {
            var collection = db.GetCollection<VirtualMachineMetricsModel>(table);
            return collection.AsQueryable()
                .Where(metric => metric.TimeStamp >= time)
                .ToList();
        }
    }
}