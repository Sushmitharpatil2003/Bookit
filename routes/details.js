const { Router } = require("express");
const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../lib/db");
const router = Router();

const getDetails = async (req, res) => {
  try {
    const experienceId = req.query.experienceId;
    if (!experienceId) {
      return res
        .status(400)
        .send({ error: "experienceId parameter is required" });
    }

    const db = await connectToDatabase();

    const slots = await db
      .collection("slots")
      .find({ adventureId: new ObjectId(experienceId) })
      .toArray();
    const adventure = await db
        .collection("places")
        .findOne({ _id: new ObjectId(experienceId) });
    if (!adventure) {
      return res.status(404).send({ error: "Adventure not found" });
    }
    res.send({slots, adventure});
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

router.get("/", getDetails);

module.exports = router;
