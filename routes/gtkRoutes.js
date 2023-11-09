import express from "express";
import {
  getGtk,
  createGtk,
  createStatus,
  createJenis,
  getStatus,
  getJenis,
  tambahDataPendidikan,
  appendDataAnak,
  createKepegawaian,
  createAnak,
  deleteAnak,
  createPendidikan,
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
routes.post("/gtk", createGtk);

routes.post("/status-pegawai", createStatus);
routes.post("/jenis-ptk", createJenis);

routes.post("/tambahPendidikan/:id", tambahDataPendidikan);
routes.post("/tambah-anak/:id", appendDataAnak);

routes.post("/anak/:id", createAnak);
routes.delete("/anak/:id", deleteAnak);

routes.post("/sertifikasi/:id", createSertifikasi);
routes.post("/kepegawaian/:id", createKepegawaian);
routes.post("/pendidikan/:id", createPendidikan);
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
