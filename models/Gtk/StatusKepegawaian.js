import mongoose from "mongoose";

const statusPegawaiSchema = new mongoose.Schema(
  {
    jenis_status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const StatusKepegawaian = mongoose.model("StatusKepegawaian", statusPegawaiSchema);
export default StatusKepegawaian;
