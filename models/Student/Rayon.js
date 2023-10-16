import mongoose from "mongoose";

const rayonSchema = new mongoose.Schema({
  guru_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Gtk",
  },
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
