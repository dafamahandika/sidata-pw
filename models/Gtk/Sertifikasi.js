import mongoose from "mongoose";

const sertifikasiSchema = mongoose.Schema(
  {
    gtk_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Gtk",
    },
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
