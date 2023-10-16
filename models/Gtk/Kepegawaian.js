import mongoose from "mongoose";

const kepegawaianSchema = new mongoose.Schema(
  {
    gtk_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Gtk",
    },
    status_kepegawaian: {
      type: String,
      required: true,
    },
    jenis_ptk: {
      type: String,
      required: true,
    },
    nip: {
      type: String,
      required: true,
      unique: true,
    },
    niy: {
      type: String,
      required: true,
      unique: true,
    },
    nuptk: {
      type: String,
      required: false,
      unique: true,
    },
    sumber_gaji: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Kepegawaian = mongoose.model("Kepegawaian", kepegawaianSchema);
export default Kepegawaian;
