import { getRayon, getRombel, isRayon, isRombel, studentCreate, reaData, updateData, delData } from "../controllers/Formulir.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { isGuru } from "../middleware/isGuru.js";
import { isMurid } from "../middleware/isMurid.js";
import express from "express";

const routes = express.Router();
routes.post("/rayon", isMurid, isGuru, isAdmin, isRayon);
routes.post("/rombel", isAdmin, isRombel);
routes.post("/create", isAdmin, studentCreate);
routes.get("/get", isAdmin, reaData);
routes.put("/update/:id", isAdmin, updateData);
routes.delete("/delete/:id", isAdmin, delData);

routes.get("/rayon", isAdmin, getRayon);
routes.get("/rombel", isAdmin, getRombel);
export default routes;
