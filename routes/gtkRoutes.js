import express from "express";
import { getData, createGtk, createStatus, createJenis, getStatus, getJenis, updateDataAnak, tambahDataPendidikan, appendDataAnak, createKepegawaian, createAnak } from "../controllers/gtkController.js";

import { isAdmin } from "../middleware/isAdmin.js";

const routes = express.Router();

routes.get("/status-kepeg", isAdmin, getStatus);
routes.get("/jenis-ptk", isAdmin, getJenis);

routes.get("/gtk", isAdmin, getData);
routes.post("/gtk", createGtk);
routes.post("/kepegawaian/:id", createKepegawaian);

routes.post("/status-pegawai", createStatus);
routes.post("/jenis-ptk", createJenis);

routes.put("/anak/:id", updateDataAnak);

routes.post("/tambahPendidikan/:id", tambahDataPendidikan);
routes.post("/tambah-anak/:id", appendDataAnak);

routes.post("/anak/:id", createAnak);

export default routes;
