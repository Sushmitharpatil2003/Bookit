const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const adventureRoutes = require("./routes/adventure");
const detailsRoutes = require("./routes/details");
const bookingRoutes = require("./routes/booking");
const validatePromoRoutes = require("./routes/validate-promo");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 5000;

app.use("/adventures", adventureRoutes);
app.use("/details", detailsRoutes);
app.use("/bookings", bookingRoutes);
app.use("/validate-promo",validatePromoRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express + MongoDB (JavaScript)!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
