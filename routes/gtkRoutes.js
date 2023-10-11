import express from "express";
import { getData, createGtk, createStatus, createJenis, getStatus, getJenis } from "../controllers/gtkController.js";

const routes = express.Router();

routes.get("/status-kepeg", getStatus);
routes.get("/jenis-ptk", getJenis);

routes.get("/gtk", getData);
routes.post("/gtk", createGtk);

routes.post("/status-pegawai", createStatus);
routes.post("/jenis-ptk", createJenis);

export default routes;
