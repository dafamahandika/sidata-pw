import mongoose from "mongoose";

const jenisPtkSchema = new mongoose.Schema(
  {
    jenis_ptk: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
jenisPtkSchema.virtual("kepegawaian", {
  ref: "Kepegawaian",
  localField: "jenis_ptk_id",
  foreignField: "_id",
});

const JenisPtk = mongoose.model("JenisPtk", jenisPtkSchema);
export default JenisPtk;
