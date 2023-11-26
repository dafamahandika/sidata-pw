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
import chatRoutes from "./routes/chat.js";
import cookieParser from "cookie-parser";
import http from "http";
import bodyParser from "body-parser";
import { Server } from "socket.io";
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(
  cors({
    origin: process.env.PORT,
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
io.on("connection", async (socket) => {
  console.log("a user connected");

  socket.on("chat message", async (msg) => {
    const savedMessage = await chatRoutes.saveMessage(msg);
    io.emit("chat message", savedMessage);

    if (msg.receiver) {
      io.to(msg.receiver).emit("notification", {
        message: "New message from admin",
      });
    }
  });

  socket.on("notification_ack", async (receiverId) => {
    await chatRoutes.markAsRead(receiverId);
  });
  socket.emit("load messages", await chatRoutes.getMessages());

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
