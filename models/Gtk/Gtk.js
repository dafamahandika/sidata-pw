import mongoose from "mongoose";

const gtkSchema = new mongoose.Schema(
  {
    // pendidikan_id: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "RiwayatPendidikan",
    //   },
    // ],
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
    // sertifikasi_id: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     requied: true,
    //     ref: "Sertifikasi",
    //   },
    // ],
    // diklat_id: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     requied: true,
    //     ref: "Diklat",
    //   },
    // ],
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
    nama_ibu: {
      type: String,
      requied: true,
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
    nama_kelurahan: {
      type: String,
      required: true,
    },
    kecamatan: {
      type: String,
      required: true,
    },
    no_kk: {
      type: String,
      required: true,
      unique: true,
    },
    kode_pos: {
      type: String,
      required: true,
    },
    agama: {
      type: String,
      enum: ["Islam", "Kristen Protestan", "Kristen Katholik", "Hindu", "Budha", "Konghuchu"],
      required: true,
    },
    kewarganegaraan: {
      type: String,
      required: true,
    },
    npwp: {
      type: String,
      required: true,
      unique: true,
    },
    nama_wajib_pajak: {
      type: String,
      required: true,
      unique: true,
    },
    status_kawin: {
      type: String,
      enum: ["Kawin", "Belum Kawin", "Duda/Janda"],
      required: true,
    },
    nama_istri_suami: {
      type: String,
      required: false,
    },
    nip_istri_suami: {
      type: String,
      required: false,
    },
    pekerjaan_istri_suami: {
      type: String,
      required: false,
    },
    no_telp: {
      type: String,
      required: true,
    },
    no_telp_rumah: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bb: {
      type: String,
      required: true,
    },
    tb: {
      type: String,
      required: true,
    },
    gol_darah: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gtk = mongoose.model("Gtk", gtkSchema);
export default Gtk;
