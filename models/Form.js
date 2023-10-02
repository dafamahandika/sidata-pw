import mongoose from "mongoose";

const Form = new mongoose.Schema({
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
});

const Formulir = mongoose.model("Formulir", Form);
export default Formulir;
