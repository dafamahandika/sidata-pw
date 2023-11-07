import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  nis: {
    type: String,
    required: true,
  },
  jk: {
    type: String,
    enum: ["L", "P"],
    required: true,
  },
  rombel: {
    type: String,
    required: true,
  },
  rayon: {
    type: String,
    required: true,
  },
  nisn: {
    type: String,
    required: true,
    default: null,
  },
  nik: {
    type: String,
    required: true,
    default: null,
  },
  no_kk: {
    type: String,
    required: true,
    default: null,
  },
  tempat_lahir: {
    type: String,
    required: true,
    default: null,
  },
  tanggal_lahir: {
    type: Date,
    required: true,
    default: null,
  },
  no_akta: {
    type: String,
    required: true,
    default: null,
  },
  agama: {
    type: String,
    required: true,
    default: null,
  },
  kewarganegaraan: {
    type: String,
    required: true,
    default: null,
  },
  alamat: {
    type: String,
    required: true,
    default: null,
  },
  rt: {
    type: String,
    required: true,
    default: null,
  },
  rw: {
    type: String,
    required: true,
    default: null,
  },
  nama_dusun: {
    type: String,
    required: true,
    default: null,
  },
  kecamatan: {
    type: String,
    required: true,
    default: null,
  },
  nama_kota: {
    type: String,
    required: true,
  },
  provinsi: {
    type: String,
    required: true,
  },
  kode_pos: {
    type: String,
    required: true,
    default: null,
  },
  transportasi: {
    type: String,
    required: true,
    default: null,
  },
  anak_ke: {
    type: String,
    required: true,
    default: null,
  },
  tinggal_bersama: {
    type: String,
    required: true,
    default: null,
  },
  email: {
    type: String,
    required: true,
    default: null,
  },
  no_telp: {
    type: String,
    required: true,
    default: null,
  },
  tb: {
    type: Number,
    required: true,
    default: null,
  },
  bb: {
    type: Number,
    required: true,
    default: null,
  },
  gol_darah: {
    type: String,
    required: true,
    default: null,
  },
});   
const Student = mongoose.model("Student", studentSchema);
export default Student;
