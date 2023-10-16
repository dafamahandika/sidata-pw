import mongoose from "mongoose";

const sertifikasiSchema = new mongoose.Schema(
  {
    jenis_sertifikasi: {
      type: String,
      required: true,
    },
    no_sertifikasi: {
      type: String,
      required: true,
      unique: true,
    },
    no_reg: {
      type: String,
      required: true,
    },
    no_peserta: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sertifikasi = mongoose.model("Sertifikasi", sertifikasiSchema);
export default Sertifikasi;
