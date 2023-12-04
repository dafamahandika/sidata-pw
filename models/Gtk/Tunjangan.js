import mongoose from "mongoose";

const tunjanganSchema = new mongoose.Schema(
  {
    jenis_tunjangan: {
      type: String,
      required: false,
    },
    no_sk: {
      type: String,
      required: true,
      unique: true,
    },
    tanggal_sk: {
      type: String,
      required: true,
    },
    sumber_dana: {
      type: String,
      required: true,
    },
    nominal: {
      type: Number,
      required: true,
    },
    masih_menerima: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

const Tunjangan = mongoose.model("Tunjangan", tunjanganSchema);
export default Tunjangan;
