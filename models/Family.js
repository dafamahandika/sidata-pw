import mongoose, { Schema } from "mongoose";

const familySchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student"
    },
    //     data ayah
    nama_ayah: {
      type: String,
      required: true,
    },
    nik_ayah: {
      type: String,
      required: true,
    },
    tanggal_lahir_ayah: {
      type: Date,
      required: true,
    },
    pendidikan_ayah: {
      type: String,
      required: true,
    },
    pekerjaan_ayah: {
      type: String,
      required: true,
    },
    penghasilan_ayah: {
      type: Number,
      required: true,
    },
    //     data ibu
    nama_ibu: {
      type: String,
      required: true,
    },
    nik_ibu: {
      type: String,
      required: true,
    },
    tanggal_lahir_ibu: {
      type: Date,
      required: true,
    },
    pendidikan_ibu: {
      type: String,
      required: true,
    },
    pekerjaan_ibu: {
      type: String,
      required: true,
    },
    penghasilan_ibu: {
      type: Number,
      required: true,
    },
    //     data wali
    nama_wali: {
      type: String,
      required: true,
    },
    nik_wali: {
      type: String,
      required: true,
    },
    tanggal_lahir_wali: {
      type: Date,
      required: true,
    },
    pendidikan_wali: {
      type: String,
      required: true,
    },
    pekerjaan_wali: {
      type: String,
      required: true,
    },
    penghasilan_wali: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const family = mongoose.model("Family", familySchema);
export default family;
