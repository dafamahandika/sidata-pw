import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB = process.env.DB;
mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

export default db;
