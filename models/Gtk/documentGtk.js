import mongoose from "mongoose";

const documentGtkSchema = mongoose.Schema({
  ijazah_sd: [{ type: String }],
  ijazah_smp: [{ type: String }],
  ijazah_sma: [{ type: String }],
  ijazah_univ: [{ type: String }],
  ktp: [{ type: String }],
  akte_kelahiran: [{ type: String }],
  kk: [{ type: String }],
});

const documentGtk = mongoose.model("documentGtk", documentGtkSchema);
export default documentGtk;
