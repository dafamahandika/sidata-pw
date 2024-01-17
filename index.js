import express from "express";
import db from "./config/conn.js";
import create from "./routes/Form.js";
import Login from "./routes/Login.js";
import refreshToken from "./routes/geToken.js";
import createStatus from "./routes/gtkRoutes.js";
import createJenis from "./routes/gtkRoutes.js";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
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

app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use(create);
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

app.listen(PORT, () => {
  console.log(`Run Server http://localhost:${PORT}`);
});
