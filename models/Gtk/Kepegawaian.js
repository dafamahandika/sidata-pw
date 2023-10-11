import mongoose from "mongoose";

const kepegawaianSchema = new mongoose.Schema(
  {
    gtk_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Gtk",
      unique: true,
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

kepegawaianSchema.virtual("Gtk", {
  ref: "Gtk",
  localField: "gtk_id",
  foreignField: "_id",
});
const Kepegawaian = mongoose.model("Kepegawaian", kepegawaianSchema);
export default Kepegawaian;
