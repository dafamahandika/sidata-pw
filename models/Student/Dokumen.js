// import mongoose from "mongoose";

// const DokumenSchema = new mongoose.Schema({
//   documentIjazah: [
//     {
//       type: String,
//       required: true,
//     },
//   ],
//   documentAkte: [
//     {
//       type: String,
//       required: true,
//     },
//   ],
//   documentSkhun: [
//     {
//       type: String,
//       required: true,
//     },
//   ],
//   documentKk: [
//     {
//       type: String,
//       required: true,
//     },
//   ],
// });

// const Dokumen = mongoose.model("Dokumen", DokumenSchema);

// export default Dokumen;

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

// models/dokumen.js
// import mongoose from "mongoose";

// const dokumenSchema = new mongoose.Schema({
//   allDocuments: [
//     {
//       type: String,
//       required: true,
//     },
//   ],
//   // tambahkan properti lain sesuai kebutuhan
// });

// const Dokumen = mongoose.model("Dokumen", dokumenSchema);

// export default Dokumen;

import mongoose from "mongoose";

const dokumenSchema = new mongoose.Schema({
  documentIjazah: [{ type: String }],
  documentAkte: [{ type: String }],
  documentSkhun: [{ type: String }],
  documentKk: [{ type: String }],
});

const Dokumen = mongoose.model("Dokumen", dokumenSchema);
export default Dokumen;
