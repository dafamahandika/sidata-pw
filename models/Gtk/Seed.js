import mongoose from "mongoose";
const seedSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Seed = mongoose.model("Seed", seedSchema);
export default Seed;
