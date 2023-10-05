import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  rombel_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Rombel",
  },
  rayon_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Rayon",
  },
  nama: {
    type: String,
    required: true,
  },
  jk: {
    type: String,
    enum: ["L", "P"],
    required: true,
  },
  nisn: {
    type: String,
    required: true,
  },
  nik: {
    type: String,
    required: true,
  },
  no_kk: {
    type: String,
    required: true,
  },
  tempat_lahir: {
    type: String,
    required: true,
  },
  tanggal_lahir: {
    type: Date,
    required: true,
  },
  no_akta: {
    type: String,
    required: true,
  },
  agama: {
    type: String,
    required: true,
  },
  kewarganegaraan: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  rt: {
    type: String,
    required: true,
  },
  rw: {
    type: String,
    required: true,
  },
  nama_dusun: {
    type: String,
    required: true,
  },
  kecamatan: {
    type: String,
    required: true,
  },
  kode_pos: {
    type: String,
    required: true,
  },
  transportasi: {
    type: String,
    required: true,
  },
  anak_ke: {
    type: String,
    required: true,
  },
  tinggal_bersama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  no_telp: {
    type: String,
    required: true,
  },
  tb: {
    type: Number,
    required: true,
  },
  bb: {
    type: Number,
    required: true,
  },
  gol_darah: {
    type: String,
    required: true,
  },
});

studentSchema.virtual("family", {
  ref: "Family",
  localField: "_id",
  foreignField: "student_id",
});

studentSchema.virtual("rombel", {
  ref: "Rombel",
  localField: "_id",
  foreignField: "rombel_id",
  justOne: true,
});

studentSchema.virtual("Rayon", {
  ref: "Rayon",
  localField: "_id",
  foreignField: "rayon_id",
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
