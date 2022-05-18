import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import diariesRoutes from "./routes/diaries.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "1mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
app.use(cors());
app.use("/diaries", diariesRoutes);

app.get("/", (re1, res) => {
  res.end("Daily Diet API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error.message));
