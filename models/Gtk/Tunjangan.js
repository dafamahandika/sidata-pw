import mongoose from "mongoose";

const tunjanganSchema = new mongoose.Schema(
  {
    jenis_tunjangan: {
      type: String,
      required: false,
    },
    nama_tunjangan: {
      type: String,
      required: true,
    },
    instansi: {
      type: String,
      required: true,
    },
    sk_tunjangan: {
      type: String,
      required: true,
    },
    tanggal_sk: {
      type: String,
      required: true,
    },
    tanggal_terima: {
      type: String,
      required: true,
    },
    sumber_dana: {
      type: String,
      required: true,
    },
    dari_tahun: {
      type: String,
      required: true,
    },
    sampai_tahun: {
      type: String,
      required: true,
    },
    nominal: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

const Tunjangan = mongoose.model("Tunjangan", tunjanganSchema);
export default Tunjangan;
