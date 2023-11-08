import mongoose from "mongoose";

const documentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const isResult = mongoose.model("isResult", documentSchema);
export default isResult;
