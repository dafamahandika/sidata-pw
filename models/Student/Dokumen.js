import mongoose from "mongoose";

const dokumenSchema = new mongoose.Schema({
  documentIjazah: [{ type: String }],
  documentAkte: [{ type: String }],
  documentSkhun: [{ type: String }],
  documentKk: [{ type: String }],
});

const Dokumen = mongoose.model("Dokumen", dokumenSchema);
export default Dokumen;
