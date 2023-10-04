import mongoose from "mongoose";

const rayonSchema = new mongoose.Schema({
  rayon_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
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
const Rayon = mongoose.model("Rayon", rayonSchema);
export default Rayon;
