import mongoose from "mongoose";

const rayonSchema = new mongoose.Schema({
  pembimbing_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  nama_rayon: {
    type: String,
    required: true,
  },
  nama_pembimbing: {
    type: String,
    required: true,
  },
});

const Rayon = mongoose.model("Rayon", rayonSchema);
export default Rayon;
