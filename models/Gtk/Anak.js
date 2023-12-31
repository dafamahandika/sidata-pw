import mongoose from "mongoose";

const anakSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    jenjang_pendidikan: {
      type: String,
      required: true,
    },
    nisn: {
      type: String,
      required: true,
      unique: true,
    },
    tahun_masuk: {
      type: String,
      required: true,
    },
    jk: {
      type: String,
      enum: ["L", "P"],
      required: true,
    },
    tempat_lahir: {
      type: String,
      required: true,
    },
    tanggal_lahir: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Anak = mongoose.model("Anak", anakSchema);
export default Anak;
