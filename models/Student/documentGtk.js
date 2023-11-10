import mongoose from "mongoose";

const docGtkSchema = mongoose.Schema({
  ijazah_smp: {
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
  akte: {
    type: String,
    required: true,
  },
});

const resultGtkDocument = mongoose.model("resultGtkDocument", docGtkSchema);
export default resultGtkDocument;
