import mongoose from "mongoose";

const gtkSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    kepegawaian_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Kepegawaian",
      },
    ],
    pendidikan_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Pendidikan",
      },
    ],
    anak_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Anak",
      },
    ],
    beasiswa_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        requied: true,
        ref: "Beasiswa",
      },
    ],
    sertifikasi_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Sertifikasi",
      },
    ],
    diklat_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Diklat",
      },
    ],
    penugasan_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Penugasan",
      },
    ],
    tugas_tambahan_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "TugasTambahan",
      },
    ],
    penghargaan_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Penghargaan",
      },
    ],
    tunjangan_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Tunjangan",
      },
    ],
    inpassing_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Inpassing",
      },
    ],
    jabatan_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "RiwayatJabatan",
      },
    ],
    gaji_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "RiwayatGaji",
      },
    ],
    dokumen_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "documentGtk",
    },
    imageProfileGtk: [
      {
        type: String,
      },
    ],
    nama_lengkap: {
      type: String,
      required: true,
      unique: true,
    },
    nik: {
      type: String,
      required: true,
      unique: true,
    },
    jk: {
      type: String,
      enum: ["L", "P"],
      required: true,
    },
    tempat_lahir: {
      type: String,
      required: true,
    },
    tanggal_lahir: {
      type: String,
      required: true,
    },
    nip: {
      type: String,
      required: true,
      unique: true,
    },
    nama_ibu: {
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
    nama_kelurahan: {
      type: String,
      default: null,
    },
    kecamatan: {
      type: String,
      default: null,
    },
    kota_kab: {
      type: String,
      default: null,
    },
    provinsi: {
      type: String,
      default: null,
    },
    no_kk: {
      type: String,
      default: null,
    },
    kode_pos: {
      type: String,
      default: null,
    },
    agama: {
      type: String,
      enum: ["Islam", "Protestan", "Katolik", "Hindu", "Budha", "Konghuchu"],
      required: true,
    },
    kewarganegaraan: {
      type: String,
      default: null,
    },
    npwp: {
      type: String,
      default: null,
    },
    nama_wajib_pajak: {
      type: String,
      default: null,
    },
    status_kawin: {
      type: String,
      default: null,
    },
    nama_istri_suami: {
      type: String,
      default: null,
    },
    nip_istri_suami: {
      type: String,
      default: null,
    },
    pekerjaan_istri_suami: {
      type: String,
      default: null,
    },
    no_telp: {
      type: String,
      required: true,
    },
    no_telp_rumah: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bb: {
      type: String,
      default: null,
    },
    tb: {
      type: String,
      default: null,
    },
    gol_darah: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Gtk = mongoose.model("Gtk", gtkSchema);
export default Gtk;
