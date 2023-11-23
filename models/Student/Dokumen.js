import mongoose from "mongoose";

const DokumenSchema = new mongoose.Schema({
  documentIjazah: [
    {
      type: String,
      required: true,
    },
  ],
  documentAkte: [
    {
      type: String,
      required: true,
    },
  ],
  documentSkhun: [
    {
      type: String,
      required: true,
    },
  ],
  documentKk: [
    {
      type: String,
      required: true,
    },
  ],
});

const Dokumen = mongoose.model("Dokumen", DokumenSchema);

export default Dokumen;

// import mongoose from "mongoose";

// const DokumenSchema = new mongoose.Schema({
//   documentIjazah: {
//     type: String,
//     required: true,
//   },
//   documentAkte: {
//     type: String,
//     required: true,
//   },
//   documentSkhun: {
//     type: String,
//     required: true,
//   },
//   documentKk: {
//     type: String,
//     required: true,
//   },
// });

// const Dokumen = mongoose.model("Dokumen", DokumenSchema);
// export default Dokumen;
