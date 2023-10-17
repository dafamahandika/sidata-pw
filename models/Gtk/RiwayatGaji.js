import mongoose from "mongoose";

const gajiSchema = new mongoose.Schema({
  no_sk: {
    type: String,
    required: true,
  },
  tanggal_sk: {
    type: String,
    required: true,
  },
  tmt_gaji: {
    type: String,
    required: true,
  },
  masa_kerja_thn: {
    type: String,
    require: true,
  },
  masa_kerja_bln: {
    type: String,
    require: true,
  },
  gaji_pokok: {
    type: String,
    require: true,
  },
});

const RiwayatGaji = mongoose.model("RiwayatGaji", gajiSchema);
export default RiwayatGaji;
