import mongoose from "mongoose";

const familySchema = new mongoose.Schema(
  {
    //     data ayah
    nama_ayah: {
      type: String,
      default: null,
    },
    nik_ayah: {
      type: String,
      default: null,
    },
    tanggal_lahir_ayah: {
      type: String,
      default: null,
    },
    pendidikan_ayah: {
      type: String,
      default: null,
    },
    pekerjaan_ayah: {
      type: String,
      default: null,
    },
    penghasilan_ayah: {
      type: Number,
      default: null,
    },
    //     data ibu
    nama_ibu: {
      type: String,
      default: null,
    },
    nik_ibu: {
      type: String,
      default: null,
    },
    tanggal_lahir_ibu: {
      type: String,
      default: null,
    },
    pendidikan_ibu: {
      type: String,
      default: null,
    },
    pekerjaan_ibu: {
      type: String,
      default: null,
    },
    penghasilan_ibu: {
      type: Number,
      default: null,
    },
    //     data wali
    nama_wali: {
      type: String,
      required: false,
      default: null,
    },
    nik_wali: {
      type: String,
      required: false,
      default: null,
    },
    tanggal_lahir_wali: {
      type: String,
      required: false,
      default: null,
    },
    pendidikan_wali: {
      type: String,
      required: false,
      default: null,
    },
    pekerjaan_wali: {
      type: String,
      required: false,
      default: null,
    },
    penghasilan_wali: {
      type: Number,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const family = mongoose.model("Family", familySchema);
export default family;
