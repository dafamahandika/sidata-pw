import mongoose from "mongoose";

const anakSchema = new mongoose.Schema(
  {
    nama_anak: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    jenjang_pendidikan_anak: {
      type: String,
      required: true,
    },
    nisn: {
      type: String,
      required: true,
      unique: true,
    },
    tahun_masuk_anak: {
      type: String,
      required: true,
    },
    jk_anak: {
      type: String,
      enum: ["L", "P"],
      required: true,
    },
    tempat_lahir_anak: {
      type: String,
      required: true,
    },
    tanggal_lahir_anak: {
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
