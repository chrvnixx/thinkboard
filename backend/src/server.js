import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5174",
  })
);

app.use(express.json());

app.use(rateLimiter);

app.use("/api/notes", noteRoutes);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`server is listening on port : ${port}`);
  });
});
