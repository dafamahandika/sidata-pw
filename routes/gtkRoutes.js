import express from "express";
import {
  // gtk
  // gtkGroupRayon,
  getGtk,
  getOneGtk,
  getOneGtkLogin,
  createGtk,
  updateGtk,
  deleteGtk,
  // status & jenis ptk
  createStatus,
  createJenis,
  getStatus,
  getJenis,
  // kepegawaian
  getKepagawaian,
  updateKepegawaian,
  deleteKepegawaian,
  // anak
  getAnak,
  createAnak,
  updateAnak,
  deleteAnak,
  // pendidikan
  getPendidikan,
  createPendidikan,
  updatePendidikan,
  deletePendidikan,
  // beasiswa
  getBeasiswa,
  createBeasiswa,
  updateBeasiswa,
  deleteBeasiswa,
  // sertifikasi
  getSertifikasi,
  createSertifikasi,
  updateSertifikasi,
  deleteSertifikasi,
  // diklat
  getDiklat,
  createDiklat,
  updateDiklat,
  deleteDiklat,
  // penugasan
  getPenugasan,
  createPenugasan,
  updatePenugasan,
  deletePenugasan,
  // tugas tambahan
  getTugas,
  createTugas,
  updateTugas,
  deleteTugas,
  // penghargaan
  getPenghargaan,
  createPenghargaan,
  updatePenghargaan,
  deletePenghargaan,
  // jabatan
  getJabatan,
  createJabatan,
  updateJabatan,
  deleteJabatan,
  // gaji
  getGaji,
  createGaji,
  updateGaji,
  deleteGaji,
  // inpassing
  getInpassing,
  createInpassing,
  updateInpassing,
  deleteInpassing,
  // tunjangan
  getTunjangan,
  createTunjangan,
  updateTunjangan,
  deleteTunjangan,
  // uploads
  uploadDokumenGtk,
  deleteOneDokumenGtk,
  // divisi
  getDivisi,
  createDivisi,
  deleteDivisi,
  // profile
  updateAvatarGtk,
  exportDataGtkToExcell,
} from "../controllers/gtkController.js";
import { importCsvStudent } from "../controllers/csvController.js";
// import { isGuru } from "../middleware/isGuru.js";
// import { isAdmin } from "../middleware/isAdmin.js";
// import { isLogin } from "../middleware/isLogin.js";

const routes = express.Router();
// routes.use(isLogin);
routes.get("/status-kepeg", getStatus);
routes.get("/jenis-ptk", getJenis);

routes.get("/gtk", getGtk);
// routes.get("/gtk/group-rayon/:id", gtkGroupRayon);
routes.delete("/gtk/delete/:id", deleteGtk);
routes.get("/gtk/:id", getOneGtk);
routes.post("/gtk", createGtk);
routes.put("/gtk/update/:id", updateGtk);
routes.get("/dashboard/gtk/:id", getOneGtkLogin);

routes.post("/status-pegawai", createStatus);
routes.post("/jenis-ptk", createJenis);

routes.get("/anak/:id", getAnak);
routes.post("/anak/create/:id", createAnak);
routes.put("/anak/update/:id", updateAnak);
routes.delete("/anak/delete/:id", deleteAnak);

routes.get("/sertifikasi/:id", getSertifikasi);
routes.post("/sertifikasi/create/:id", createSertifikasi);
routes.put("/sertifikasi/update/:id", updateSertifikasi);
routes.delete("/sertifikasi/delete/:id", deleteSertifikasi);

routes.get("/kepegawaian/:id", getKepagawaian);
routes.put("/kepegawaian/update/:id", updateKepegawaian);
routes.delete("/kepegawaian/delete/:id", deleteKepegawaian);

routes.get("/beasiswa/:id", getBeasiswa);
routes.post("/beasiswa/create/:id", createBeasiswa);
routes.put("/beasiswa/update/:id", updateBeasiswa);
routes.delete("/beasiswa/delete/:id", deleteBeasiswa);

routes.get("/pendidikan/:id", getPendidikan);
routes.post("/pendidikan/create/:id", createPendidikan);
routes.put("/pendidikan/update/:id", updatePendidikan);
routes.delete("/pendidikan/delete/:id", deletePendidikan);

routes.get("/diklat/:id", getDiklat);
routes.post("/diklat/create/:id", createDiklat);
routes.put("/diklat/update/:id", updateDiklat);
routes.delete("/diklat/delete/:id", deleteDiklat);

routes.get("/penugasan/:id", getPenugasan);
routes.post("/penugasan/create/:id", createPenugasan);
routes.put("/penugasan/update/:id", updatePenugasan);
routes.delete("/penugasan/delete/:id", deletePenugasan);

routes.get("/tugas/:id", getTugas);
routes.post("/tugas/create/:id", createTugas);
routes.put("/tugas/update/:id", updateTugas);
routes.delete("/tugas/delete/:id", deleteTugas);

routes.get("/penghargaan/:id", getPenghargaan);
routes.post("/penghargaan/create/:id", createPenghargaan);
routes.put("/penghargaan/update/:id", updatePenghargaan);
routes.delete("/penghargaan/delete/:id", deletePenghargaan);

routes.get("/jabatan/:id", getJabatan);
routes.post("/jabatan/create/:id", createJabatan);
routes.put("/jabatan/update/:id", updateJabatan);
routes.delete("/jabatan/delete/:id", deleteJabatan);

routes.get("/gaji/:id", getGaji);
routes.post("/gaji/create/:id", createGaji);
routes.put("/gaji/update/:id", updateGaji);
routes.delete("/gaji/delete/:id", deleteGaji);

routes.get("/inpassing/:id", getInpassing);
routes.post("/inpassing/create/:id", createInpassing);
routes.put("/inpassing/update/:id", updateInpassing);
routes.delete("/inpassing/delete/:id", deleteInpassing);

routes.get("/tunjangan/:id", getTunjangan);
routes.post("/tunjangan/create/:id", createTunjangan);
routes.put("/tunjangan/update/:id", updateTunjangan);
routes.delete("/tunjangan/delete/:id", deleteTunjangan);

routes.post("/csv", importCsvStudent);

routes.get("/export-data-excell-gtk", exportDataGtkToExcell);

routes.post("/upload-gtk/:id", uploadDokumenGtk);
routes.delete("/delete-gtk/:id", deleteOneDokumenGtk);

routes.get("/divisi", getDivisi);
routes.post("/divisi/create", createDivisi);
routes.delete("/divisi/delete", deleteDivisi);

routes.post("/updateAvatar/:id", updateAvatarGtk);
export default routes;
