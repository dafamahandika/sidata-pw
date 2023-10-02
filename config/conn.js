import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://bisena:bisena12345@cluster0.cmqrijy.mongodb.net/sidata",
  {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

export default db;
