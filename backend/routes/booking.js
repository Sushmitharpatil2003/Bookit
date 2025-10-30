const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../lib/db");

router.post("/", async (req, res) => {
  try {
    const { slotId, slotDate, slotTime, quantity, subtotal, taxes, total, adventureId } = req.body;

    if (!slotId || !slotDate || !slotTime) {
      return res.status(400).json({ error: "Missing required booking details" });
    }

    const db = await connectToDatabase();
    const bookings = db.collection("bookings");

    const result = await bookings.insertOne({
      slotId: new ObjectId(slotId),
      slotDate,
      slotTime,
      quantity,
      subtotal,
      taxes,
      total,
      adventureId: new ObjectId(adventureId),
      createdAt: new Date(),
    });

    await db.collection("slots").updateOne(
      { _id: new ObjectId(slotId) },
      { $inc: { availableSeats: -quantity } }
    );

    res.status(201).json({
      message: "Booking created successfully",
      bookingId: result.insertedId,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
