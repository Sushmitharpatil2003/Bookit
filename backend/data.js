const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "bookit"; // change if needed
const client = new MongoClient(uri);

const adventureIds = {
  kayaking: "69020b65b52041a35d5e4962",
  hiking: "69020b65b52041a35d5e4963",
  "scuba diving": "69020b65b52041a35d5e4964",
  paragliding: "69020b65b52041a35d5e4965",
  camping: "69020b65b52041a35d5e4966",
  "rock climbing": "69020b65b52041a35d5e4967",
  "wildlife safari": "69020b65b52041a35d5e4968",
};

// Time slots (24-hour format for easier timestamp creation)
const timeSlots = ["07:00", "09:00", "11:00", "12:00"];

function getNext7Days() {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    d.setHours(0, 0, 0, 0);
    days.push(d);
  }
  return days;
}

function createTimestamp(date, timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const ts = new Date(date);
  ts.setHours(hours, minutes, 0, 0);
  return ts;
}

async function insertSlots() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("slots");

    const days = getNext7Days();
    const slots = [];

    for (const [adventureName, advId] of Object.entries(adventureIds)) {
      for (const day of days) {
        for (const timeStr of timeSlots) {
          const time = createTimestamp(day, timeStr);

          slots.push({
            adventureId: new ObjectId(advId),
            date: day.toISOString().split("T")[0],
            time: time, // MongoDB stores this as ISODate (timestamp)
            availableSeats: 10,
            capacity: 10,
            bookedSeats: 0,
          });
        }
      }
    }

    const result = await collection.insertMany(slots);
    console.log(`Inserted ${result.insertedCount} slot records.`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

insertSlots();
