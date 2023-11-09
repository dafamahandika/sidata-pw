import mongoose from "mongoose";

const docGtkSchema = mongoose.Schema({
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
  kk: {
    type: String,
    required: true,
  },
  akte: {
    type: String,
    required: true,
  },
});

const resultGtkDocument = mongoose.model("resultGtkDocument", docGtkSchema);
export default resultGtkDocument;
