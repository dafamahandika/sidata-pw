import mongoose from "mongoose";

const docGtkSchema = mongoose.Schema({
  ijazah_smp: {
    type: String,
    required: true,
  },
  akte_kelahiran: {
    type: String,
    required: true,
  },
  skhun: {
    type: String,
    required: true,
  },
  kk: {
    type: String,
    required: true,
  },
});

const Dokumen = mongoose.model("Dokumen", docGtkSchema);
export default Dokumen;
