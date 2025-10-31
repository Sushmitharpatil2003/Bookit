const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "bookit"; // change if needed
const client = new MongoClient(uri);


async function insertPromoCode() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("promocodes");

    const promocodes = ["SAVE10", "FLAT100", "FLAT150", "FLAT200","SAVE15"].map((code) => {
      if (code.startsWith("SAVE")) {
        // percentage-based promo
        const percent = parseInt(code.replace("SAVE", ""));
        return {
          code,
          type: "percentage",
          discountPercentage: percent,
          discountAmount: 0,
          validTill: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        };
      } else if (code.startsWith("FLAT")) {
        const amount = parseInt(code.replace("FLAT", ""));
        return {
          code,
          type: "amount",
          discountPercentage: 0,
          discountAmount: amount,
          validTill: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        };
      }
    });

    const result = await collection.insertMany(promocodes);
    console.log(`Inserted ${result.insertedCount} promo code records.`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

insertPromoCode();