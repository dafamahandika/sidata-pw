import multer from "multer";
import express from "express";

const routes = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

routes.post("/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json({ massage: "Upload Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Upload Failed" });
  }
});

export default routes;
