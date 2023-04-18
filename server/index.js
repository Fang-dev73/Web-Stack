
require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth";
import categoryRoutes from './routes/category';
import postRoutes from './routes/post';
import websiteRoutes from './routes/website'

const morgan = require("morgan");

const app = express();

// db connection
//mongoose.set("strictQuery", false); // required for version 6
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("-------------DATABASE connected successfully--------------------"))
  .catch((err) => console.log("-----------DATABASE connection ERROR-----------------", err));

// middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", postRoutes);
app.use("/api", websiteRoutes);

app.listen(8000, () => console.log("Server running on port 8000"));
