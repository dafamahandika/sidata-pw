import mongoose from "mongoose";

const posisiSchema = new mongoose.Schema(
  {
    divisi: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Divisi",
    },
    posisi: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Posisi = mongoose.model("Posisi", posisiSchema);
export default Posisi;
