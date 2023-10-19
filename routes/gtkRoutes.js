import express from "express";
import {
  getData,
  createGtk,
  createStatus,
  createJenis,
  getStatus,
  getJenis,
  updateDataAnak,
  tambahDataPendidikan,
  appendDataAnak,
  createKepegawaian,
  createAnak,
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
import { isAdmin } from "../middleware/isAdmin.js";

const routes = express.Router();

routes.get("/status-kepeg", isAdmin, getStatus);
routes.get("/jenis-ptk", isAdmin, getJenis);

routes.get("/gtk", isAdmin, getData);
routes.post("/gtk", isAdmin, createGtk);

routes.post("/status-pegawai", createStatus);
routes.post("/jenis-ptk", createJenis);

routes.put("/anak/:id", updateDataAnak);

routes.post("/tambahPendidikan/:id", tambahDataPendidikan);
routes.post("/tambah-anak/:id", appendDataAnak);

routes.post("/anak/:id", createAnak);
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
