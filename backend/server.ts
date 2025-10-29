import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT: number = Number(process.env.PORT) || 5000;
const MONGODB_URL: string = process.env.MONGODB_URL || "";
const DB_NAME: string = process.env.DB_NAME || "";

mongoose
  .connect(MONGODB_URL, {
    dbName: DB_NAME,
  } as mongoose.ConnectOptions)
  .then(() => console.log(` Connected to MongoDB database: ${DB_NAME}`))
  .catch((err) => console.error(" MongoDB connection error:", err));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + MongoDB (TypeScript)!" });
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
