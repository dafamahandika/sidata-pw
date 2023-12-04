import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://bisena:bisena12345@cluster0.cmqrijy.mongodb.net/sidata",
  // "mongodb+srv://dafamahandika:dafa1234@cluster0.bs25mcd.mongodb.net/Sidata",
  {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

export default db;
