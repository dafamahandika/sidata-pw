import mongoose from "mongoose";
const divisSchema = new mongoose.Schema(
  {
    nama_divisi: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Divisi = mongoose.model("Divisi", divisSchema);
export default Divisi;
