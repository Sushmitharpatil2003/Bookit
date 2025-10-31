const { Router } = require("express"); 
const { connectToDatabase } = require("../lib/db");
const router = Router();

const getAdeventures = async (req, res ) => {

    const db = await connectToDatabase();
    const adventures = await db.collection("places").find({}).toArray();

  res.send(adventures);
}

router.get("/", getAdeventures);

module.exports = router;