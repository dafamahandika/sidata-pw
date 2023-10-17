import mongoose from "mongoose";

const jabatanSchema = new mongoose.Schema(
  {
    jabatan: {
      type: String,
      required: true,
    },
    sk_jabatan: {
      type: String,
      required: true,
    },
    tmt_jabatan: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RiwayatJabatan = mongoose.model("RiwayatJabatan", jabatanSchema);
export default RiwayatJabatan;
