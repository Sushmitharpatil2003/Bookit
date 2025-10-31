const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../lib/db");

router.post("/", async (req, res) => {
  try {
    const { promo } = req.body;

    if (!promo) {
      return res.status(400).json({ error: "Missing promo code" });
    }

    const db = await connectToDatabase();
    const promocodes = db.collection("promocodes");

    const promoDoc = await promocodes.findOne({ code: promo });

    if (!promoDoc) {
      return res.status(400).json({ error: "Invalid promo code" });
    }

    res.status(200).json({
      isValid: true,
      message: "Promo code is valid",
      discount: promoDoc.discountAmount || 0, 
    });
  } catch (error) {
    console.error("Promocode error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
