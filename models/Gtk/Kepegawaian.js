import mongoose from "mongoose";

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
      ref: "StatusKepegawaian",
    },
    jenis_ptk_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "JenisPtk",
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

kepegawaianSchema.virtual("status_kepegawaian", {
  ref: "StatusKepegawaian",
  localField: "_id",
  foreignField: "status_kepegawaian_id",
});

kepegawaianSchema.virtual("jenis_ptk", {
  ref: "JenisPtk",
  localField: "_id",
  foreignField: "jenis_ptk_id",
});
const Kepegawaian = mongoose.model("Kepegawaian", kepegawaianSchema);
export default Kepegawaian;
