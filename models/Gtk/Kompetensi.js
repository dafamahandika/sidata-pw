import mongoose from "mongoose";

const kompetensiSchema = mongoose.Schema(
  {
    gtk_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Gtk",
    },
    linsensi_kepsek: {
      type: Boolean,
      required: true,
    },
    keahlian_lab: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Kompetansi = mongoose.model("Kompetensi", kompetensiSchema);
export default Kompetansi;
