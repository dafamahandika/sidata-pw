import mongoose from "mongoose";

const rombelSchema = new mongoose.Schema({
  nama_rombel: {
    type: String,
    required: true,
  },
});
const Rombel = mongoose.model("Rombel", rombelSchema);

export default Rombel;
