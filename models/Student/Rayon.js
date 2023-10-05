import mongoose from "mongoose";

const rayonSchema = new mongoose.Schema({
  nama_rayon: {
    type: String,
    required: true,
  },
  ruang_rayon: {
    type: String,
    required: true,
  },
});

rayonSchema.virtual("students", {
  ref: "Student",
  localField: "rayon_id",
  foreignField: "_id",
});
const Rayon = mongoose.model("Rayon", rayonSchema);
export default Rayon;
