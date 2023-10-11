import mongoose from "mongoose";

const inpassingSchema = new mongoose.Schema(
  {
    gtk_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Gtk",
    },
    no_sk: {
      type: String,
      required: true,
    },
    tanggal_sk: {
      type: String,
      required: true,
    },
    tmt_sk: {
      type: String,
      required: true,
    },
    angka_kridit: {
      type: Number,
      required: true,
    },
    masa_kerja_thn: {
      type: String,
      required: true,
    },
    masa_kerja_bln: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Inpassing = mongoose.model("Inpassing", inpassingSchema);
export default Inpassing;
