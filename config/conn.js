import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://bisena:bisena12345@cluster0.cmqrijy.mongodb.net/sidata",
  // "mongodb://127.0.0.1:27017/sidata",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

export default db;
