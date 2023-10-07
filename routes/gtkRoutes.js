import express from "express";
import { createStatus, createJenis } from "../controllers/gtkController.js";

const routes = express.Router();

routes.post("/status-pegawai", createStatus);
routes.post("/jenis-ptk", createJenis);

export default routes
