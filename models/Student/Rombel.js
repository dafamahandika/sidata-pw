import mongoose from "mongoose";

const rombelSchema = new mongoose.Schema({
  nama_rombel: {
    type: String,
    // enum: ["PPLG", "TJKT", "DKV", "MPLB", "PMN", "HTL", "KLN"],
    required: true,
  },
  // tingkat: {
  //   type: String,
  //   required: true,
  // },
  tahun_ajaran: {
    type: String,
    required: true,
  },
});

rombelSchema.virtual("students", {
  ref: "Student",
  localField: "rombel_id",
  foreignField: "_id",
});

const Rombel = mongoose.model("Rombel", rombelSchema);

export default Rombel;
