import express from "express";
import db from "./config/conn.js";
import bodyParser from "body-parser";
import create from "./routes/Form.js";
import register from "./routes/Regist.js";
import Login from "./routes/Login.js";
import refreshToken from "./routes/geToken.js";
import cookieParser from "cookie-parser";
import Student from "./models/Student.js";
import Family from "./models/Family.js";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(create);
app.use(register);
app.use(Login);
app.use(refreshToken);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Connected to database");
});

app.listen(port, () => {
  console.log(`Run Server http://localhost:${port}`);
});

const getData1 = async (req, res) => {
  const family = await Family.findById("651bc8f1176e11fb5c623d71");
  await family.populate("student_id");
  console.log(family);
};


const getData2 = async (req, res) => {
  const family = await Family.findById("651bd214176e11fb5c623d75");
  await family.populate("student_id");
  console.log(family);
};

getData1();
getData2();
