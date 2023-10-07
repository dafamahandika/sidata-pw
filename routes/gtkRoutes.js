import express from "express";
import { getGtk, createGtk, createStatus, createJenis } from "../controllers/gtkController.js";

const routes = express.Router();

routes.get("/gtk", getGtk);
routes.post("/gtk", createGtk);

routes.post("/status-pegawai", createStatus);
routes.post("/jenis-ptk", createJenis);

export default routes;
