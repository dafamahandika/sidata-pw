import mongoose from "mongoose";

const penugasanSchema = new mongoose.Schema(
  {
    no_surat_tugas: {
      type: String,
      required: true,
      unique: true,
    },
    tanggal_surat_tugas: {
      type: String,
      required: true,
    },
    tmt_tugas: {
      type: String,
      required: true,
    },
    status_sekolah_induk: {
      type: Boolean,
      required: true,
    },
    keluar_karena: {
      type: String,
      required: false,
    },
    tanggal_keluar: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Penugasan = mongoose.model("Penugasan", penugasanSchema);
export default Penugasan;
