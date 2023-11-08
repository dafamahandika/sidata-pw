import express from "express";
import db from "./config/conn.js";
import create from "./routes/Form.js";
import register from "./routes/Regist.js";
import Login from "./routes/Login.js";
import refreshToken from "./routes/geToken.js";
import createStatus from "./routes/gtkRoutes.js";
import createJenis from "./routes/gtkRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
const port = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    credentials: true,
  })
);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedMimetypes = ["image/png", "image/jpg", "image/jpeg"];
  if (allowedMimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.json());
app.use(cookieParser());

app.use(create);
app.use(register);
app.use(Login);
app.use(refreshToken);
app.use(createStatus);
app.use(createJenis);

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Connected to database");
});

app.listen(port, () => {
  console.log(`Run Server http://localhost:${port}`);
});
