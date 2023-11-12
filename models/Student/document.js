import mongoose from "mongoose";

const docSchema = mongoose.Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const uploadFile = mongoose.model("uploadFile", docSchema);
export default uploadFile;
