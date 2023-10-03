import mongoose from "mongoose";

const familySchema = new mongoose.Schema(
  {
    student_id: {
      type: String,
      required: true,
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
      type: date,
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
      type: Float,
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
      type: date,
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
      type: Float,
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
      type: date,
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
      type: Float,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const family = mongoose.model("Family", familySchema);
export default family;
