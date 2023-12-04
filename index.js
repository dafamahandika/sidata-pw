import express from "express";
import db from "./config/conn.js";
import create from "./routes/Form.js";
import register from "./routes/Regist.js";
import Login from "./routes/Login.js";
import refreshToken from "./routes/geToken.js";
import createStatus from "./routes/gtkRoutes.js";
import createJenis from "./routes/gtkRoutes.js";
import passport from "passport";
import session from "express-session";
import googleStrategy from "./controllers/authGoogle.js";
import cors from "cors";
import path from "path";
import multer from "multer";
import chatRoutes from "./routes/chat.js";
import cookieParser from "cookie-parser";
import { file } from "googleapis/build/src/apis/file/index.js";
const port = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    exposedHeaders: "*",
    optionsSuccessStatus: 200,
    preflightContinue: false,
    credentials: true,
  })
);

app.use(
  session({
    secret: "SIDATA",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

var multipleUpload = upload.fields([
  { name: "documentIjazah", maxCount: 1 },
  { name: "documentAkte", maxCount: 1 },
  { name: "documentSkhun", maxCount: 1 },
  { name: "documentKk", maxCount: 1 },
]);

app.post("/uploadDoc/:id", multipleUpload, (req, res) => {
  if (req.files) {
    console.log("files uploaded");
    console.log(req.files);
  }
});

app.use("/uploads", express.static("uploads"));

passport.use(googleStrategy);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());

app.use(create);
app.use(register);
app.use(Login);
app.use(refreshToken);
app.use(createStatus);
app.use(createJenis);
app.use("/api", chatRoutes);

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Connected to database");
});

app.listen(port, () => {
  console.log(`Run Server http://localhost:${port}`);
});
