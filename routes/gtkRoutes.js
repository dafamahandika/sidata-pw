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
} from "../controllers/gtkController.js";
import { isAdmin } from "../middleware/isAdmin.js";

const routes = express.Router();

routes.get("/status-kepeg", isAdmin, getStatus);
routes.get("/jenis-ptk", isAdmin, getJenis);

routes.get("/gtk", isAdmin, getData);
routes.post("/gtk", isAdmin, createGtk);

routes.post("/status-pegawai", isAdmin, createStatus);
routes.post("/jenis-ptk", isAdmin, createJenis);

routes.put("/anak/:id", isAdmin, updateDataAnak);

routes.post("/tambahPendidikan/:id", isAdmin, tambahDataPendidikan);
routes.post("/tambah-anak/:id", isAdmin, appendDataAnak);

export default routes;
