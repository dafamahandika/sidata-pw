import mongoose, { Schema } from "mongoose";

const diklatShcema = new Schema({
  gtk_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Gtk",
  },
});
