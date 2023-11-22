import mongoose from "mongoose";

const documentGtk = mongoose.Schema({
  ijazah_sd: {
    type: String,
    required: true,
  },
  ijazah_smp: {
    type: String,
    required: true,
  },
  ijazah_sma: {
    type: String,
    required: true,
  },
  ijazah_univ: {
    type: String,
    required: true,
  },
  ktp: {
    type: String,
    required: true,
  },
  akte_kelahiran: {
    type: String,
    required: true,
  },
  kk: {
    type: String,
    required: true,
  },
});

const DokumentGTK = mongoose.model("documentGtk", documentGtk);
export default DokumentGTK;
