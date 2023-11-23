import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    keluarga_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Family",
    },
    dokumen_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Dokumen",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    nama: {
      type: String,
      required: true,
    },
    nis: {
      type: String,
      required: true,
      unique: true,
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
      default: null,
    },
    nik: {
      type: String,
      default: null,
    },
    no_kk: {
      type: String,
      default: null,
    },
    tempat_lahir: {
      type: String,
      default: null,
    },
    tanggal_lahir: {
      type: Date,

      default: null,
    },
    no_akta: {
      type: String,
      default: null,
    },
    agama: {
      type: String,
      default: null,
    },
    kewarganegaraan: {
      type: String,
      default: null,
    },
    alamat: {
      type: String,
      default: null,
    },
    rt: {
      type: String,
      default: null,
    },
    rw: {
      type: String,
      default: null,
    },
    nama_dusun: {
      type: String,
      default: null,
    },
    kecamatan: {
      type: String,
      default: null,
    },
    nama_kota: {
      type: String,
      default: null,
    },
    provinsi: {
      type: String,
      default: null,
    },
    kode_pos: {
      type: String,
      default: null,
    },
    transportasi: {
      type: String,
      default: null,
    },
    anak_ke: {
      type: String,
      default: null,
    },
    tinggal_bersama: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      default: null,
    },
    no_telp: {
      type: String,
      default: null,
    },
    tb: {
      type: Number,
      default: null,
    },
    bb: {
      type: Number,
      default: null,
    },
    gol_darah: {
      type: String,
      default: null,
    },
    status_data_diri: {
      type: String,
      default: "Pending",
    },
    status_data_family: {
      type: String,
      default: "Pending",
    },
    status_data_dokumen: {
      type: String,
      default: "Pending",
    },
    asal_smp: {
      type: String,
      default: null,
    },
    no_ijazah_smp: {
      type: String,
      default: null,
    },
    skhun: {
      type: String,
      default: null,
    },
    no_un: {
      type: String,
      default: null,
    },
    tahun_ajaran: {
      type: String,
      required: true,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Student = mongoose.model("Student", studentSchema);
export default Student;
