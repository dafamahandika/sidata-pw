import mongoose from "mongoose";

const tugasTambahSchema = new mongoose.Schema(
  {
    gtk_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "REF",
    },
    jabatan: {
      type: String,
      required: true,
    },
    prasarana: {
      type: String,
      required: true,
    },
    no_sk: {
      type: String,
      required: true,
    },
    tmt_tambahan: {
      type: String,
      required: true,
    },
    tst_tambahan: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const TugasTambahan = mongoose.model("TugasTambahan", tugasTambahSchema);
export default TugasTambahan;