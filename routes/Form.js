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
  createStudent,
  updateStudent,
  deleteStudent,
  uploadFile,
  verifikasi,
} from "../controllers/Formulir.js";
import upload from "../middleware/uploads.js";
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

routes.post(
  "/upload/:id",
  upload.fields([
    { name: "ijazah", maxCount: 1 },
    { name: "akte_kelahiran", maxCount: 1 },
    { name: "skhun", maxCount: 1 },
    { name: "kk", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      const files = req.files;

      res.status(200).json({ message: "File berhasil diupload", data: files });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan dalam pemrosesan file" });
    }
  }
);
routes.post("/verifikasi/:id", verifikasi);

export default routes;
