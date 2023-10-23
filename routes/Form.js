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
import { isAdmin } from "../middleware/isAdmin.js";
import { isMuridGuru } from "../middleware/isMuridGuru.js";
import { isLogin } from "../middleware/isLogin.js";
import express from "express";

const routes = express.Router();
routes.use(isLogin);
routes.post("/rayon", isMuridGuru, isRayon);
routes.post("/rombel", isMuridGuru, isRombel);
routes.post("/create", isMuridGuru, studentCreate);
routes.get("/get", isAdmin, reaData);
routes.put("/update/:id", isAdmin, updateData);
routes.delete("/delete/:id", isAdmin, delData);

routes.get("/rayon", isAdmin, getRayon);
routes.get("/rombel", isAdmin, getRombel);
routes.get("/gty", isAdmin, getOnlyGty);
export default routes;
