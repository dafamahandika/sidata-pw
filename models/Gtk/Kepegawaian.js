import mongoose, { mongo } from "mongoose";

const kepegawaianSchema = new mongoose.Schema(
  {
    gtk_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Gtk",
      unique: true,
    },
    status_kepegawaian_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Status_Kepegawaian",
    },
    jenis_ptk_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "JenisPtk",
    },
    nip: {
      type: String,
      required: true,
      unique: true
    },
    niy: {
      type: String,
      required: true,
    },
    nuptk: {
      type: String,
      required: false,
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

kepegawaianSchema.virtual()

const Kepegawaian = mongoose.model("Gtk", kepegawaianSchema);
export default Kepegawaian;
