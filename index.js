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
import http from "http";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chat.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(
  cors({
    origin: process.env.PORT,
    // origin: "*",
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

app.use(bodyParser.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/../public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/../public/index.html");
});

io.on("connection", async (socket) => {
  console.log("a user connected");

  socket.on("chat message", async (msg) => {
    const savedMessage = await chatController.saveMessage(msg);
    io.emit("chat message", savedMessage);

    if (msg.receiver) {
      io.to(msg.receiver).emit("notification", {
        message: "New message from admin",
      });
    }
  });

  socket.on("notification_ack", async (receiverId) => {
    await chatController.markAsRead(receiverId);
  });
  socket.emit("load messages", await chatController.getMessages());

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use("/uploads", express.static("uploads"));

passport.use(googleStrategy);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());

app.use("/create", create);
app.use("/register", register);
app.use("/login", Login);
app.use("/refreshToken", refreshToken);
app.use("/createStatus", createStatus);
app.use("/createJenis", createJenis);
app.use("/api", chatRoutes);

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Connected to database");
});

server.listen(port, () => {
  console.log(`Run Server http://localhost:${port}`);
});
