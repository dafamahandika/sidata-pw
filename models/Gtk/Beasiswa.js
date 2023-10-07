import mongoose from "mongoose";

const beasiswaSchema = mongoose.Schema(
  {
    gtk_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Gtk",
    },
    jenis_beasiswa: {
      type: String,
      required: true,
    },
    keterangan: {
      type: String,
      required: true,
    },
    tahun_mulai: {
      type: String,
      required: true,
    },
    tahun_akhir: {
      type: String,
      required: true,
    },
    masih_menerima: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Beasiswa = mongoose.model("Beasiswa", beasiswaSchema);
export default Beasiswa;
