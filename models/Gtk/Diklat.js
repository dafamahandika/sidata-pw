import mongoose from "mongoose";

const diklatShcema = new mongoose.Schema(
  {
    gtk_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Gtk",
    },
    jenis_diklat: {
      type: String,
      required: true,
    },
    nama_diklat: {
      type: String,
      required: true,
    },
    penyelenggara: {
      type: String,
      reuired: true,
    },
    tahun_diklat: {
      type: String,
      required: true,
    },
    peran: {
      type: String,
      required: true,
    },
    tingkat_diklat: {
      type: String,
      required: true,
    },
    berapa_jam: {
      type: String,
      required: true,
    },
    sertifikat: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Diklat = mongoose.model("Diklat", diklatShcema);
export default Diklat;
