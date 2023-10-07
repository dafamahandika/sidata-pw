import mongoose from "mongoose";

const jenisPtkschema = new mongoose.Schema(
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

const JenisPtk = mongoose.model("JenisPtk", jenisPtkschema);
export default JenisPtk;
