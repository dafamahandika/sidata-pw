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
  verifikasiData,
  verifikasiFamily,
  verifikasiDokumen,
  addNewTahunAjran,
  isCountStudentsWithMissingData,
  isCountStudensCompleteData,
  isNoValidateData,
  isValidateData,
  deleteOneDokumen,
  uploadDokumen,
  updateAvatar,
  isCountStudentsAllWithMissingData,
  isCountStudentsAllCompleteData,
  exportDataStudentToExcell,
  exportDataStudentByRayonToExcell,
} from "../controllers/Formulir.js";
// import upload from "../middleware/uploads.js";
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
routes.delete("/delete-rombel/:id", deleteRombel);

routes.get("/student", getStudent);
routes.get("/student/:id", getOneStudent);
routes.post("/student/create", createStudent);
routes.put("/student/update/:id", updateStudent);
routes.delete("/student/delete/:id", deleteStudent);
routes.get("/dashboard/student/:id", getOneStudentLogin);

// routes.post("/upload/:id", uploadImage);
routes.post("/upload/:id", uploadDokumen);
routes.delete("/delete-dokumen/:id", deleteOneDokumen);
routes.post("/verifikasi-data/:id", verifikasiData);
routes.post("/verifikasi-family/:id", verifikasiFamily);
routes.post("/verifikasi-dokumen/:id", verifikasiDokumen);

routes.post("/tahun-ajaran/:id", addNewTahunAjran);
routes.get("/data-missing/:rayonName", isCountStudentsWithMissingData);
routes.get("/data-lengkap/:rayonName", isCountStudensCompleteData);
routes.get("/data-missing", isCountStudentsAllWithMissingData);
routes.get("/data-lengkap", isCountStudentsAllCompleteData);
routes.get("/data-novalidate/:rayonName", isNoValidateData);
routes.get("/data-validate/:rayonName", isValidateData);

routes.get("/export-data-excell-student", exportDataStudentToExcell);
routes.get("/export-data-excell-student/:rayon", exportDataStudentByRayonToExcell);
routes.post("/avatar/:id", updateAvatar);
export default routes;
