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
});

const Dokumen = mongoose.model("Dokumen", documentSchema);
export default Dokumen;
