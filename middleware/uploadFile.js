import multer from "multer";

const storageFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./files");
  },
  filename: (req, file, cb) => {
    const time = Date.now();
    cb(null, time + file.originalname);
  },
});

const file = multer({
  storage: storageFile,
});

export default file;
