import mongoose from "mongoose";

const riwayatpendidikanSchema = new mongoose.Schema(
  {
    bidang_studi: {
      type: String,
      required: true,
    },
    jenjang_pendidikan: {
      type: String,
      required: true,
    },
    gelar_akademik: {
      type: String,
      required: true,
    },
    satuan_pendidikan: {
      type: String,
      required: true,
    },
    tahun_masuk: {
      type: String,
      required: true,
    },
    tahun_keluar: {
      type: String,
      required: true,
    },
    nim: {
      type: String,
      required: true,
      unique: true,
    },
    mata_kuliah: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    ipk: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RiwayatPendidikan = mongoose.model("RiwayatPendidikan", riwayatpendidikanSchema);
export default RiwayatPendidikan;
