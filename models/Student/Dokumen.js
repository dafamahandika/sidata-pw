import mongoose from "mongoose";

const documentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ijazah: {
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

const Dokumen = mongoose.model("Dokumen", documentSchema);
export default Dokumen;
