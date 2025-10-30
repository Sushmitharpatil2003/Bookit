const { MongoClient } = require("mongodb");
const MONGODB_URI = process.env.MONGODB_URL || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "bookit";

let cachedDb = null;

 const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);
  cachedDb = db;

  return db;
};

  const addtoDatabase = async (collectionName, data) => {
  const db = await connectToDatabase();
  const collection = db.collection(collectionName);
  const result = await collection.insertMany(data);
  return result;
}

module.exports = { connectToDatabase, addtoDatabase };
