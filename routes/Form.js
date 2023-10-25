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
  updateRayon,
  deleteRayon,
  updateRombel,
  deleteRombel,
} from "../controllers/Formulir.js";
// import { isAdmin } from "../middleware/isAdmin.js";
// import { isMurid } from "../middleware/isMurid.js";
// import { isLogin } from "../middleware/isLogin.js";
import express from "express";

const routes = express.Router();
// routes.use(isLogin);
routes.post("/rayon", isRayon);
routes.post("/rombel", isRombel);
routes.post("/create", studentCreate);
routes.get("/get", reaData);
routes.put("/update/:id", updateData);
routes.delete("/delete/:id", delData);

routes.get("/rayon", getRayon);
routes.put("/update-rayon/:id", updateRayon);
routes.delete("/delete-rayon/:id", deleteRayon);
routes.get("/rombel", getRombel);
routes.put("/update-rombel/:id", updateRombel);
routes.delete("/delete-rombel/:id", deleteRombel);
routes.get("/gty", getOnlyGty);
export default routes;
