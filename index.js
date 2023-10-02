import express from "express";
import db from "./config/conn.js";
import bodyParser from "body-parser";
import create from "./routes/Form.js";
import register from "./routes/Regist.js";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(create);
app.use(register);

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
