import express from "express";
import {
  gtkGroupRayon,
  getGtk,
  getOneGtk,
  getOneGtkLogin,
  createGtk,
  updateGtk,
  createStatus,
  createJenis,
  getStatus,
  getJenis,
  createKepegawaian,
  createAnak,
  deleteAnak,
  createPendidikan,
  updatePendidikan,
  deletePendidikan,
  createBeasiswa,
  createSertifikasi,
  createDiklat,
  createPenugasan,
  createTugas,
  createPenghargaan,
  createJabatan,
  createGaji,
  createInpassing,
  createTunjangan,
} from "../controllers/gtkController.js";
import { importCsv } from "../controllers/csvController.js";
// import { isGuru } from "../middleware/isGuru.js";
// import { isAdmin } from "../middleware/isAdmin.js";
// import { isLogin } from "../middleware/isLogin.js";

const routes = express.Router();
// routes.use(isLogin);
routes.get("/status-kepeg", getStatus);
routes.get("/jenis-ptk", getJenis);

routes.get("/gtk", getGtk);
routes.get("/gtk/group-rayon/:id", gtkGroupRayon);
routes.get("/gtk/:id", getOneGtk);
routes.post("/gtk", createGtk);
routes.put("/gtk/update/:id", updateGtk);
routes.get("/dashboard/gtk/:id", getOneGtkLogin);

routes.post("/status-pegawai", createStatus);
routes.post("/jenis-ptk", createJenis);

routes.post("/anak/:id", createAnak);
routes.delete("/anak/:id", deleteAnak);

routes.post("/sertifikasi/:id", createSertifikasi);
routes.post("/kepegawaian/:id", createKepegawaian);

routes.post("/pendidikan/:id", createPendidikan);
routes.put("/update/pendidikan/:id", updatePendidikan);
routes.delete("/delete/pendidikan/:id", deletePendidikan);

routes.post("/beasiswa/:id", createBeasiswa);
routes.post("/diklat/:id", createDiklat);
routes.post("/penugasan/:id", createPenugasan);
routes.post("/tugas/:id", createTugas);
routes.post("/penghargaan/:id", createPenghargaan);
routes.post("/jabatan/:id", createJabatan);
routes.post("/gaji/:id", createGaji);
routes.post("/inpasssing/:id", createInpassing);
routes.post("/tunjangan/:id", createTunjangan);

routes.post("/csv", importCsv);

export default routes;
