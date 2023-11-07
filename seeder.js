import faker from "faker";
import mongoose from "mongoose";
import Gtk from "./models/Gtk/Gtk.js";

async function seedData() {
  const con = "mongodb+srv://bisena:bisena12345@cluster0.cmqrijy.mongodb.net/sidata";
  const seed_count = 100;
  mongoose.set("strictQuery", false);
  mongoose
    .connect(con, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((error) => {
      console.log("Error connected", error);
    });

  let listSeed = [];
  for (let i = 0; i < seed_count; i++) {
    const nama = faker.name.firstName();
    const email = faker.internet.email();
    listSeed.push({ nama, email });
  }

  const seedDB = async () => {
    await Seed.insertMany(listSeed);
  };

  seedDB().then(() => {
    mongoose.connection.close();
    console.log("seed success");
  });
}

seedData();
