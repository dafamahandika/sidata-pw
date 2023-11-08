import {
  getRayon,
  getRombel,
  createRayon,
  createRombel,
  createStudent,
  reaData,
  updateData,
  delData,
  updateRayon,
  deleteRayon,
  updateRombel,
  deleteRombel,
  searchStudent,
  uploadImage,
} from "../controllers/Formulir.js";
import { getRayon, getRombel, createRayon, createRombel, createStudent, getStudent, updateData, delData, updateRayon, deleteRayon, updateRombel, deleteRombel, searchStudent } from "../controllers/Formulir.js";
// import { isAdmin } from "../middleware/isAdmin.js";
// import { isMurid } from "../middleware/isMurid.js";
// import { isLogin } from "../middleware/isLogin.js";
import express from "express";

const routes = express.Router();
routes.get("/rayon", getRayon);
routes.post("/rayon", createRayon);
routes.put("/update-rayon/:id", updateRayon);
routes.delete("/delete-rayon/:id", deleteRayon);
routes.post("/upload", uploadImage);

routes.get("/rombel", getRombel);
routes.post("/rombel", createRombel);
routes.put("/update-rombel/:id", updateRombel);
routes.delete("/delete-rombel/:id", deleteRombel);

routes.get("/student", getStudent);
routes.post("/student/create", createStudent);
routes.put("/student/update/:id", updateData);
routes.delete("/student/delete/:id", delData);
routes.get("/student/search/:keyword", searchStudent);

export default routes;
