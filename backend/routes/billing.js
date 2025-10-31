const { Router } = require("express");
const { connectToDatabase } = require("../lib/db");
const router = Router();
const { ObjectId } = require("mongodb");

const createBillingRecord = async (req, res) => {
  try {
    const { bookingId, amount, promocode, status, username, email, slotId } =
      req.body;
    if (
      !bookingId ||
      !amount ||
      !promocode ||
      !status ||
      !username ||
      !email ||
      !slotId
    ) {
      return res
        .status(400)
        .json({ error: "Missing required billing details" });
    }
    const slotObjectId = toObjectId(slotId);
    const adventureObjectId = toObjectId(adventureId);

    if (!slotObjectId || !adventureObjectId) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const db = await connectToDatabase();
    const billings = db.collection("billings");
    const result = await billings.insertOne({
      bookingId: new ObjectId(bookingId),
      slotId: new ObjectId(slotId),
      username,
      email,
      promocode,
      amount,
      paymentMethod,
      status,
      createdAt: new Date(),
    });

    db.collection("bookings").updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { username: username, email: email } }
    );

    res.status(201).json({
      message: "Billing record created successfully",
      billingId: result.insertedId,
    });
  } catch (error) {
    console.error("Billing error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

router.post("/", createBillingRecord);
