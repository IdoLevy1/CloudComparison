using MongoDB.Bson;
using MongoDB.Driver;

namespace DB
{
    public class MongoHelper
    {
        private readonly IMongoDatabase db;

        public MongoHelper(string databaseName)
        {
            var client = new MongoClient();
            db = client.GetDatabase(databaseName);  
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
    }
}