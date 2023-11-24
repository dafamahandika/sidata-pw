import express from "express";
import db from "./config/conn.js";
import create from "./routes/Form.js";
import register from "./routes/Regist.js";
import Login from "./routes/Login.js";
import refreshToken from "./routes/geToken.js";
import createStatus from "./routes/gtkRoutes.js";
import createJenis from "./routes/gtkRoutes.js";
// import authGoogle from "./routes/Login.js";
// import passport from "./controllers/Auth.js";
// import uploadRoutes from "./middleware/uploads.js"; // Import uploadRoutes

import cors from "cors";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    // origin: "http://172.232.225.139:3001",
    // origin: "https://dashing-logical-redbird.ngrok-free.app",
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    exposedHeaders: "*",
    optionsSuccessStatus: 200,
    preflightContinue: false,
    credentials: true,
  })
);

// app.use(express.static("public"));
// app.use("/image", express.static("image"));
app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(cookieParser());

app.use(create);
app.use(register);
app.use(Login);
app.use(refreshToken);
app.use(createStatus);
app.use(createJenis);
// app.use("/auth", authRoutes);
// app.use(uploadRoutes); // Use uploadRoutes

// app.use(passport.initialize());
// app.use(passport.session());

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Connected to database");
});

app.listen(port, () => {
  console.log(`Run Server http://localhost:${port}`);
});
