import mongoose from "mongoose";

const gajiSchema = new mongoose.Schema({  
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
