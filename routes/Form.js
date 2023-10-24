import {
  getRayon,
  getRombel,
  isRayon,
  isRombel,
  studentCreate,
  reaData,
  updateData,
  delData,
  getOnlyGty,
} from "../controllers/Formulir.js";
// import { isAdmin } from "../middleware/isAdmin.js";
// import { isMurid } from "../middleware/isMurid.js";
import express from "express";

const routes = express.Router();
routes.post("/rayon", isRayon);
routes.post("/rombel", isRombel);
routes.post("/create", studentCreate);
routes.get("/get", reaData);
routes.put("/update/:id", updateData);
routes.delete("/delete/:id", delData);

routes.get("/rayon", getRayon);
routes.get("/rombel", getRombel);
routes.get("/gty", getOnlyGty);
export default routes;
