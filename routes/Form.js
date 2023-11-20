import {
  getRayon,
  getOneRayon,
  createRayon,
  deleteRayon,
  updateRayon,
  getRombel,
  createRombel,
  updateRombel,
  deleteRombel,
  getStudent,
  getOneStudent,
  getOneStudentLogin,
  createStudent,
  updateStudent,
  deleteStudent,
  uploadFile,
  verifikasi,
} from "../controllers/Formulir.js";
// import { isAdmin } from "../middleware/isAdmin.js";
// import { isMurid } from "../middleware/isMurid.js";
// import { isLogin } from "../middleware/isLogin.js";
import express from "express";

const routes = express.Router();
routes.get("/rayon", getRayon);
routes.get("/rayon/:id", getOneRayon);
routes.post("/rayon", createRayon);
routes.put("/update-rayon/:id", updateRayon);
routes.delete("/delete-rayon/:id", deleteRayon);

routes.get("/rombel", getRombel);
routes.post("/rombel", createRombel);
routes.put("/update-rombel/:id", updateRombel);
routes.delete("/gidelete-rombel/:id", deleteRombel);

routes.get("/student", getStudent);
routes.get("/student/:id", getOneStudent);
routes.post("/student/create", createStudent);
routes.put("/student/update/:id", updateStudent);
routes.delete("/student/delete/:id", deleteStudent);
routes.get("/dashboard/student/:id", getOneStudentLogin);

routes.post("/upload/:id", uploadFile);
routes.post("/verifikasi/:id", verifikasi);

export default routes;
