import mongoose, { mongo } from "mongoose";

const anakSchema = mongoose.Schema({
  gtk_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Gtk",
  },
  nama: {
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
  tahun_masuk: {
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
});

const Anak = mongoose.model("Anak", anakSchema);
export default Anak;
