import { getRayon, getRombel, createRayon, createRombel, createStudent, reaData, updateData, delData, updateRayon, deleteRayon, updateRombel, deleteRombel, searchStudent } from "../controllers/Formulir.js";
// import { isAdmin } from "../middleware/isAdmin.js";
// import { isMurid } from "../middleware/isMurid.js";
// import { isLogin } from "../middleware/isLogin.js";
import express from "express";

const routes = express.Router();
routes.get("/rayon", getRayon);
routes.post("/rayon", createRayon);
routes.put("/update-rayon/:id", updateRayon);
routes.delete("/delete-rayon/:id", deleteRayon);

routes.get("/rombel", getRombel);
routes.post("/rombel", createRombel);
routes.put("/update-rombel/:id", updateRombel);
routes.delete("/delete-rombel/:id", deleteRombel);

routes.post("/create", createStudent);
routes.get("/get", reaData);
routes.put("/update/:id", updateData);
routes.delete("/delete/:id", delData);
routes.get("/search-student/:keyword", searchStudent);

export default routes;
