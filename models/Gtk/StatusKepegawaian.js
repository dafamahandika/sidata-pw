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

statusPegawaiSchema.virtual("kepegawaian", {
  ref: "Kepegawaian",
  localField: "status_kepegawaian_id",
  foreignField: "_id",
});
const StatusKepegawaian = mongoose.model("StatusKepegawaian", statusPegawaiSchema);
export default StatusKepegawaian;
