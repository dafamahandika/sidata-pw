import mongoose from "mongoose";

const penghargaanSchema = new mongoose.Schema(
  {
    tingkat_penghargaan: {
      type: String,
      required: true,
    },
    jenis_penghargaan: {
      type: String,
      required: true,
    },
    nama_penghargaan: {
      type: String,
      required: true,
    },
    tahun: {
      type: String,
      required: true,
    },
    instansi: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Penghargaan = mongoose.model("Penghargaan", penghargaanSchema);
export default Penghargaan;
