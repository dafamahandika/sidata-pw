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
import { isGuru } from "../middleware/isGuru.js";
import { isAdmin } from "../middleware/isAdmin.js";

const routes = express.Router();

routes.get("/status-kepeg", isAdmin, getStatus);
routes.get("/jenis-ptk", isAdmin, getJenis);

routes.get("/gtk", isAdmin, getData);
routes.post("/gtk", isAdmin, createGtk);

routes.post("/status-pegawai", isGuru, createStatus);
routes.post("/jenis-ptk", isGuru, createJenis);

routes.put("/anak/:id", isAdmin, updateDataAnak);

routes.post("/tambahPendidikan/:id", isGuru, tambahDataPendidikan);
routes.post("/tambah-anak/:id", isGuru, appendDataAnak);

routes.post("/anak/:id", isGuru, createAnak);
routes.post("/sertifikasi/:id", isGuru, createSertifikasi);
routes.post("/kepegawaian/:id", isGuru, createKepegawaian);
routes.post("/pendidikan/:id", isGuru, createPendidikan);
routes.post("/beasiswa/:id", isGuru, createBeasiswa);
routes.post("/diklat/:id", isGuru, createDiklat);
routes.post("/penugasan/:id", isGuru, createPenugasan);
routes.post("/tugas/:id", isGuru, createTugas);
routes.post("/penghargaan/:id", isGuru, createPenghargaan);
routes.post("/jabatan/:id", isGuru, createJabatan);
routes.post("/gaji/:id", isGuru, createGaji);
routes.post("/inpasssing/:id", isGuru, createInpassing);
routes.post("/tunjangan/:id", isGuru, createTunjangan);

routes.post("/csv", isAdmin, importCsv);

export default routes;
