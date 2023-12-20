import mongoose from "mongoose";

const kepegawaianSchema = new mongoose.Schema(
  {
    status_kepegawaian: {
      type: String,
      required: false,
      default: null,
    },
    jenis_ptk: {
      type: String,
      required: false,
      default: null,
    },
    niy: {
      type: String,
      required: false,
      default: null,
    },
    nuptk: {
      type: String,
      required: false,
      default: null,
    },
    sumber_gaji: {
      type: String,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
const Kepegawaian = mongoose.model("Kepegawaian", kepegawaianSchema);
export default Kepegawaian;
