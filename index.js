import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import diaryRoutes from "./routes/diaries.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";

const app = express();

app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cors());
app.use("/diaries", diaryRoutes);
app.use("/user", userRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => res.send("Daily Diet API"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error.message));
