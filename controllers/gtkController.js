import Gtk from "../models/Gtk/Gtk.js";
import Kepegawaian from "../models/Gtk/Kepegawaian.js";
import RiwayatPendidikan from "../models/Gtk/RiwayatPendidikan.js";
import StatusKepegawaian from "../models/Gtk/StatusKepegawaian.js";
import JenisPtk from "../models/Gtk/JenisPtk.js";
import Anak from "../models/Gtk/Anak.js";
import Beasiswa from "../models/Gtk/Beasiswa.js";
import Diklat from "../models/Gtk/Diklat.js";
import Sertifikasi from "../models/Gtk/Sertifikasi.js";
import Penugasan from "../models/Gtk/Penugasan.js";
import TugasTambahan from "../models/Gtk/TugasTambahan.js";
import Penghargaan from "../models/Gtk/Penghargaan.js";
import RiwayatJabatan from "../models/Gtk/RiwayatJabatan.js";
import RiwayatGaji from "../models/Gtk/RiwayatGaji.js";
import Inpassing from "../models/Gtk/Inpassing.js";
import Tunjangan from "../models/Gtk/Tunjangan.js";
import User from "../models/User.js";
import Rayon from "../models/Student/Rayon.js";
import Student from "../models/Student/Student.js";
import documentGtk from "../models/Gtk/documentGtk.js";
import argon2 from "argon2";
import multer from "multer";
import path from "path";
// All method for model Anak
// Get Data
export const getAnak = async (req, res) => {
  try {
    const { id } = req.params;
    const anak = await Anak.findById(id);
    if (!anak) {
      console.log(anak);
      return res.status(404).json({
        message: "Data Anak Not Found",
      });
    }

    res.status(200).json({
      message: "Success to Get Data Anak",
      anak: anak,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to Get Data Anak",
      error: error.message,
    });
  }
};

// Create Data
export const createAnak = async (req, res) => {
  try {
    const { id } = req.params;

    const dataGtk = await Gtk.findById(id);
    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        error: "Data GTK Not Found",
        message: "Data GTK Tidak di Temukan",
      });
    }

    const formAnak = req.body;

    const anak = new Anak({
      ...formAnak,
    });

    const savedAnak = await anak.save();

    dataGtk.anak_id.push(savedAnak._id);
    await dataGtk.save();

    res.status(201).json({
      anak: savedAnak,
      message: "Berhasil Menambahkan Data Anak",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Data Anak",
    });
  }
};
// Update Data
export const updateAnak = async function (req, res) {
  try {
    const { id } = req.params;
    const formUpdateAnak = req.body;
    const updateAnak = await Anak.findByIdAndUpdate(id, formUpdateAnak, {
      new: true,
    });
    if (!updateAnak) {
      return res.status(404).json({
        massage: "Data Anak Not Found",
      });
    }
    res.status(201).json({
      message: "Berhasil Mengubah Data Anak",
      update: updateAnak,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Anak",
    });
  }
};
// Delete Data
export const deleteAnak = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAnak = await Anak.findByIdAndDelete(id);

    if (!deletedAnak) {
      console.log(deletedAnak);
      return res.status(404).json({
        message: "Data Anak Not Found",
      });
    }

    res.status(201).json({
      message: "Berhasil Menghapus Data Anak",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menghapus Data Anak",
    });
  }
};

// All method for model Beasiswa
// Get Data
export const getBeasiswa = async (req, res) => {
  try {
    const { id } = req.params;
    const beasiswa = await Beasiswa.findById(id);
    if (!beasiswa) {
      console.log(beasiswa);
      return res.status(404).json({
        message: "Data Beasiswa Not Found",
      });
    }

    res.status(200).json({
      message: "Success to Get Data Beasiswa",
      beasiswa: beasiswa,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to Get Data Beasiswa",
      error: error.message,
    });
  }
};

// Create Data
export const createBeasiswa = async (req, res) => {
  try {
    const { id } = req.params;

    const dataGtk = await Gtk.findById(id);
    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        error: "Data GTK Not Found",
        message: "Data GTK Tidak di Temukan",
      });
    }

    const formBeasiswa = req.body;

    const beasiswa = new Beasiswa({
      ...formBeasiswa,
    });

    const savedBeasiswa = await beasiswa.save();

    dataGtk.beasiswa_id.push(savedBeasiswa._id);
    await dataGtk.save();

    res.status(201).json({
      Beasiswa: savedBeasiswa,
      message: "Berhasil Menambahkan Data Beasiswa",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Data Beasiswa",
    });
  }
};
// Update Data
export const updateBeasiswa = async function (req, res) {
  try {
    const { id } = req.params;
    const formUpdateBeasiswa = req.body;
    const updateBeasiswa = await Beasiswa.findByIdAndUpdate(id, formUpdateBeasiswa, {
      new: true,
    });
    if (!updateBeasiswa) {
      return res.status(404).json({
        massage: "Data Anak Not Found",
      });
    }
    res.status(201).json({
      message: "Berhasil Mengubah Data Beasiswa",
      update: updateBeasiswa,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Beasiswa",
    });
  }
};

// Delete Data
export const deleteBeasiswa = async (req, res) => {
  try {
    const idBeasiswa = req.params;

    const deletedBeasiswa = await Beasiswa.findByIdAndDelete(idBeasiswa);
    if (!deletedBeasiswa) {
      console.log(deletedBeasiswa);
      return res.status(404).json({
        message: "Data Beasiswa Not Found",
      });
    }

    res.status(200).json({
      message: "Berhasil Menghapus Data Beasiswa",
    });
  } catch (error) {
    console.loh(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menghapus Data Beasiswa",
    });
  }
};
// All method for models Kepegawaian
// Get Data
export const getKepagawaian = async (req, res) => {
  try {
    const { id } = req.params;
    const kepegawaian = await Kepegawaian.findById(id);
    if (!kepegawaian) {
      console.log(kepegawaian);
      return res.status(404).json({
        message: "Data Kepegawaian Not Found",
      });
    }

    res.status(200).json({
      message: "Success to Get Data Kepegawaian",
      beasiswa: kepegawaian,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to Get Data Kepegawaian",
      error: error.message,
    });
  }
};

// Create Data
export const createKepegawaian = async (req, res) => {
  try {
    const { id } = req.params;

    const dataGtk = await Gtk.findById(id);
    const kepegawaian_id = dataGtk.kepegawaian_id;

    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        error: "Data GTK Not Found",
        message: "Data GTK Tidak di Temukan",
      });
    }
    if (kepegawaian_id.length == 0) {
      const formKepegawaian = req.body;
      const kepegawaian = new Kepegawaian({
        ...formKepegawaian,
      });

      const savedKepegawaian = await kepegawaian.save();

      dataGtk.kepegawaian_id.push(savedKepegawaian._id);
      await dataGtk.save();
      ``;
      res.status(201).json({
        massage: "Berhasil Menambahkan Data Kepegawaian",
        data: savedKepegawaian,
      });
    } else {
      return res.status(500).json({
        message: "Data Kepegawaian Sudah Ada",
        data: kepegawaian_id.length,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Data Kepegawaian",
    });
  }
};
// Update Data
export const updateKepegawaian = async function (req, res) {
  try {
    const { id } = req.params;
    const formUpdateKepegawaian = req.body;
    const updateKepegawaian = await Kepegawaian.findByIdAndUpdate(id, formUpdateKepegawaian, {
      new: true,
    });
    if (!updateKepegawaian) {
      return res.status(404).json({
        massage: "Data Anak Not Found",
      });
    }
    res.status(201).json({
      message: "Berhasil Mengubah Data Kepegawaian",
      update: updateKepegawaian,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Kepegawaian",
    });
  }
};

// Delete Data
export const deleteKepegawaian = async (req, res) => {
  try {
    const idKepegawaian = req.params;

    const deletedKepegawaian = await Kepegawaian.findByIdAndDelete(idKepegawaian);

    if (!deletedKepegawaian) {
      console.log(deletedKepegawaian);
      return res.status(404).json({
        message: "Data Kepegawaian Not Found",
      });
    }

    res.status(200).json({
      message: "Berhasil Menghapus Data Kepegawaian",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menghapus Data Kepegawaian",
    });
  }
};
// All method for model Riwayat Pendidikan
// Get Data
export const getPendidikan = async (req, res) => {
  try {
    const { id } = req.params;
    const pendidikan = await RiwayatPendidikan.findById(id);
    if (!pendidikan) {
      console.log(pendidikan);
      return res.status(404).json({
        message: "Data Riwayat Pendidikan Not Found",
      });
    }

    res.status(200).json({
      message: "Success to Get Data Riwayat Pendidikan",
      pendidikan: pendidikan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to Get Data Riwayat Pendidikan",
      error: error.message,
    });
  }
};

// Create Data
export const createPendidikan = async (req, res) => {
  try {
    const { id } = req.params;

    const dataGtk = await Gtk.findById(id);

    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        error: "Data GTK Not Found",
        message: "Data GTK Tidak di Temukan",
      });
    }

    const formPendidikan = req.body;
    const pendidikan = new RiwayatPendidikan({
      ...formPendidikan,
    });

    const savedPendidikan = await pendidikan.save();

    dataGtk.pendidikan_id.push(savedPendidikan._id);
    await dataGtk.save();

    res.status(201).json({
      message: "Berhasil Menambahkan Data Riwayat Pendidikan",
      riwayat_pendidikan: savedPendidikan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Data Riwayat Pendidikan",
    });
  }
};
// Update Data
export const updatePendidikan = async function (req, res) {
  try {
    const { id } = req.params;
    const formUpdatePendidikan = req.body;
    const updatePendidikan = await RiwayatPendidikan.findByIdAndUpdate(id, formUpdatePendidikan, {
      new: true,
    });
    if (!updatePendidikan) {
      return res.status(404).json({
        massage: "Data Anak Not Found",
      });
    }
    res.status(201).json({
      message: "Berhasil Mengubah Data Riwayat Pendidikan",
      update: updatePendidikan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Riwayat Pendidikan",
    });
  }
};

// Delete Data
export const deletePendidikan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPendidikan = await RiwayatPendidikan.findByIdAndDelete(id);

    if (!deletedPendidikan) {
      console.log(deletedPendidikan);
      return res.status(404).json({
        message: "Data Riwayat Pendidikan Not Found",
      });
    }

    res.status(200).json({
      message: "Berhasil Menghapus Data Riwayat Pendidikan",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menghapus Data Riwayat Pendidikan",
    });
  }
};
// All method for model Sertifikasi
// Get Data
export const getSertifikasi = async (req, res) => {
  try {
    const { id } = req.params;
    const sertifikasi = await Sertifikasi.findById(id);
    if (!sertifikasi) {
      console.log(sertifikasi);
      return res.status(404).json({
        message: "Data Sertifikasi Not Found",
      });
    }

    res.status(200).json({
      message: "Success to Get Data Sertifikasi",
      sertifikasi: sertifikasi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to Get Data Sertifikasi",
      error: error.message,
    });
  }
};

// Create Data
export const createSertifikasi = async (req, res) => {
  try {
    const { id } = req.params;

    const dataGtk = await Gtk.findById(id);

    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        error: "Data GTK Not Found",
        message: "Data GTK Tidak di Temukan",
      });
    }

    const formSertifikasi = req.body;
    const sertifikasi = new Sertifikasi({
      ...formSertifikasi,
    });

    const savedSertifikasi = await sertifikasi.save();

    dataGtk.sertifikasi_id.push(savedSertifikasi._id);
    await dataGtk.save();

    res.status(201).json({
      message: "Berhasil Menambahkan Data Sertifikasi",
      sertifikasi: savedSertifikasi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Data Sertifikasi",
    });
  }
};
// Update Data
export const updateSertifikasi = async function (req, res) {
  try {
    const { id } = req.params;
    const formUpdateSertifikasi = req.body;
    const updateSertifikasi = await Sertifikasi.findByIdAndUpdate(id, formUpdateSertifikasi, {
      new: true,
    });
    if (!updateSertifikasi) {
      return res.status(404).json({
        massage: "Data Anak Not Found",
      });
    }
    res.status(201).json({
      message: "Berhasil Mengubah Data Sertifikasi",
      update: updateSertifikasi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Sertifikasi",
    });
  }
};

// Delete Data
export const deleteSertifikasi = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSertifikasi = await Sertifikasi.findByIdAndDelete(id);

    if (deletedSertifikasi) {
      console.log(deletedSertifikasi);
      return res.status(404).json({
        message: "Data Sertifikasi Not Found",
      });
    }

    res.status(200).json({
      message: "Berhasil Menghapus Data Sertifikasi",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menghapus Data Sertifikasi",
    });
  }
};
// All method for model Diklat
// Get Data
export const getDiklat = async (req, res) => {
  try {
    const { id } = req.params;
    const diklat = await Diklat.findById(id);
    if (!diklat) {
      console.log(diklat);
      return res.status(404).json({
        message: "Data Diklat Not Found",
      });
    }

    res.status(200).json({
      message: "Succes to Get Data Diklat",
      diklat: diklat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to Get Dat Diklat",
      error: error.message,
    });
  }
};
// Create Data
export const createDiklat = async (req, res) => {
  try {
    const { id } = req.params;

    const dataGtk = await Gtk.findById(id);
    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        message: "Data GTK Not Found",
      });
    }

    const formDiklat = req.body;
    const diklat = new Diklat({ ...formDiklat });

    const savedDiklat = await diklat.save();

    dataGtk.diklat_id.push(savedDiklat._id);
    await dataGtk.save();

    res.status(201).json({
      message: "Berhasil Menambahkan Data Diklat",
      diklat: savedDiklat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Data Diklat",
    });
  }
};
// Update Data
export const updateDiklat = async function (req, res) {
  try {
    const { id } = req.params;
    const formUpdateDiklat = req.body;
    const updateDiklat = await Diklat.findByIdAndUpdate(id, formUpdateDiklat, {
      new: true,
    });
    if (!updateDiklat) {
      return res.status(404).json({
        massage: "Data Anak Not Found",
      });
    }
    res.status(201).json({
      message: "Berhasil Mengubah Data Diklat",
      update: updateDiklat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Diklat",
    });
  }
};

// Delete Data
export const deleteDiklat = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDiklat = await Diklat.findByIdAndDelete(id);

    if (!deletedDiklat) {
      console.log(deletedDiklat);
      return res.status(404).json({
        message: "Data Diklat Not Found",
      });
    }

    res.status(200).json({
      message: "Berhasil Menghapus Data Diklat",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menghapus Data Diklat",
    });
  }
};

// All method for model Penugasan
// Get Data
export const getPenugasan = async (req, res) => {
  try {
    const { id } = req.params;
    const penugasan = await Penugasan.findById(id);
    if (!penugasan) {
      console.log(penugasan);
      return res.status(404).json({
        message: "Data Penugasan Not Found",
      });
    }

    res.status(200).json({
      message: "Success to Get Data Penugasan",
      penugasan: penugasan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to Get Data Penugasan",
    });
  }
};
// Create Penugasan
export const createPenugasan = async (req, res) => {
  try {
    const { id } = req.params;

    const dataGtk = await Gtk.findById(id);
    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        message: "Data GTK Not Found",
      });
    }

    const formPenugasan = req.body;
    const penugasan = new Penugasan({
      ...formPenugasan,
    });

    const savedPenugasan = await penugasan.save();

    dataGtk.penugasan_id.push(savedPenugasan._id);
    await dataGtk.save();

    res.status(201).json({
      message: "Berhasil Menambahkan Data Penugasan",
      penugasan: savedPenugasan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Data Penugasan",
    });
  }
};
// Update Data
export const updatePenugasan = async function (req, res) {
  try {
    const { id } = req.params;
    const formUpdatePenugasan = req.body;
    const updatePenugasan = await Penugasan.findByIdAndUpdate(id, formUpdatePenugasan, {
      new: true,
    });
    if (!updatePenugasan) {
      return res.status(404).json({
        massage: "Data Anak Not Found",
      });
    }
    res.status(201).json({
      message: "Berhasil Mengubah Data Diklat",
      update: updatePenugasan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Diklat",
    });
  }
};
// Delete Penugasana
export const deletePenugasan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPenugasan = await Penugasan.findByIdAndDelete(id);

    if (!deletedPenugasan) {
      console.log(deletedPenugasan);
      return res.status(404).json({
        message: "Data Penugasan Not Found",
      });
    }

    res.status(200).json({
      message: "Berhasil Menghapus Data Penugasan",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Gagal Menghapus Data Penugasan",
    });
  }
};

//  All methods for models Tugas Tambahan
// Get Data
export const getTugas = async (req, res) => {
  try {
    const { id } = req.params;
    const tugas_tambahan = await TugasTambahan.findById(id);
    if (!tugas_tambahan) {
      console.log(tugas_tambahan);
      return res.status(404).json({
        message: "Data Tugas Tambahan Not Found",
      });
    }

    res.status(200).json({
      message: "Success to Get Data Tugas Tambahan",
      tugas_tambahan: tugas_tambahan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to Get Data Tugas Tambahan",
      error: error.message,
    });
  }
};

// Create Data
export const createTugas = async (req, res) => {
  try {
    const { id } = req.params;

    const dataGtk = await Gtk.findById(id);
    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        message: "Data GTK Not Found",
      });
    }

    const formTugas = req.body;
    const tugasTambahan = new TugasTambahan({
      ...formTugas,
    });

    const savedTugas = await tugasTambahan.save();

    dataGtk.tugas_tambahan_id.push(savedTugas._id);
    await dataGtk.save();

    res.status(201).json({
      message: "Berhasil Menambahkan Data Tugas Tambahan",
      tugas_tambahan: savedTugas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Data Tugas Tambahan",
    });
  }
};
// Update Data
export const updateTugas = async function (req, res) {
  try {
    const { id } = req.params;
    const formUpdateTugas = req.body;
    const updateTugas = await TugasTambahan.findByIdAndUpdate(id, formUpdateTugas, {
      new: true,
    });
    if (!updateTugas) {
      return res.status(404).json({
        massage: "Data Anak Not Found",
      });
    }
    res.status(201).json({
      message: "Berhasil Mengubah Data Tugas Tambahan",
      update: updateTugas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Tugas Tambahan",
    });
  }
};

// Delete Data
export const deleteTugas = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTugas = await TugasTambahan.findByIdAndDelete(id);

    if (!deletedTugas) {
      console.log(deletedTugas);
      return res.status(404).json({
        message: "Data Tugas Tambahan Not Found",
      });
    }

    res.status(200).json({
      message: "Berhasil Menghapus Data Tugas Tambahan",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menghapus Data Tugas Tambahan",
    });
  }
};

// All methods for model Penghargaan
// Get
export const getPenghargaan = async (req, res) => {
  try {
    const { id } = req.params;
    const penghargaan = await Penghargaan.findById(id);
    if (!penghargaan) {
      console.log(penghargaan);
      return res.status(404).json({
        message: "Data Penghargaan Not Found",
      });
    }

    res.status(200).json({
      message: "Success to Get Data Penghargaan",
      penghargaan: penghargaan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Failed to Get Data Penghargaan",
    });
  }
};

// Create Data
export const createPenghargaan = async (req, res) => {
  try {
    const { id } = req.params;

    const dataGtk = await Gtk.findById(id);
    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        message: "Data GTK Not Found",
      });
    }

    const formPenghargaan = req.body;
    const penghargaan = new Penghargaan({
      ...formPenghargaan,
    });

    const savedPenghargaan = await penghargaan.save();

    dataGtk.penghargaan_id.push(savedPenghargaan._id);
    await dataGtk.save();

    res.status(201).json({
      message: "Berhasil Menambahkan Data Penghargaan",
      penghargaan: savedPenghargaan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Gagal Menambahkan Data Penghargaan",
    });
  }
};
// Update Data
export const updatePenghargaan = async function (req, res) {
  try {
    const { id } = req.params;
    const formUpdatePenghargaan = req.body;
    const updatePenghargaan = await Penghargaan.findByIdAndUpdate(id, formUpdatePenghargaan, {
      new: true,
    });
    if (!updatePenghargaan) {
      return res.status(404).json({
        massage: "Data Anak Not Found",
      });
    }
    res.status(201).json({
      message: "Berhasil Mengubah Data Penghargaan",
      update: updatePenghargaan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Penghargaan",
    });
  }
};
// Delete Data
export const deletePenghargaan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPenghargaan = await Penghargaan.findByIdAndDelete(id);

    if (!deletedPenghargaan) {
      return res.status(404).json({
        message: "Data Penghargaan Not Found",
      });
    }

    res.status(200).json({
      message: "Berhasil Manghapus Data Penghargaan",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Gagal Menghapus Data Penghargaan",
    });
  }
};

// All methods for model Riwayat Jabatan
// Get Data
export const getJabatan = async (req, res) => {
  try {
    const { id } = req.params;
    const riwayat_jabatan = await RiwayatJabatan.findById(id);
    if (!riwayat_jabatan) {
      console.log(riwayat_jabatan);
      return res.status(404).json({
        message: "Data Riwayat Jabatan Not Found",
      });
    }

    res.status(200).json({
      message: "Success to Get Data Riwayat Jabatan",
      riwayat_jabatan: riwayat_jabatan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to Get Data Riwayat Jabatan",
      error: error.message,
    });
  }
};
// Create Data
export const createJabatan = async (req, res) => {
  try {
    const { id } = req.params;

    const dataGtk = await Gtk.findById(id);
    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        message: "Data GTK Not Found",
      });
    }

    const formJabatan = req.body;
    const riwayatJabatan = new RiwayatJabatan({
      ...formJabatan,
    });

    const savedJabatan = await riwayatJabatan.save();

    dataGtk.jabatan_id.push(savedJabatan._id);
    await dataGtk.save();

    res.status(201).json({
      message: "Berhasil Menambahkan Data Riwayat Jabatan",
      riwayat_jabatan: savedJabatan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Data Riwayat Jabatan",
    });
  }
};
// Update Data
export const updateJabatan = async function (req, res) {
  try {
    const { id } = req.params;
    const formUpdateJabatan = req.body;
    const updateJabatan = await RiwayatJabatan.findByIdAndUpdate(id, formUpdateJabatan, {
      new: true,
    });
    if (!updateJabatan) {
      return res.status(404).json({
        massage: "Data Anak Not Found",
      });
    }
    res.status(201).json({
      message: "Berhasil Mengubah Data Riwayat Jabatan",
      update: updateJabatan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Riwayat Jabatan",
    });
  }
};

// Delete Data
export const deleteJabatan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedJabatan = await RiwayatJabatan.findByIdAndDelete(id);

    if (!deletedJabatan) {
      console.log(deletedJabatan);
      return res.status(404).json({
        message: "Data Riwayat Jabatan Not Found",
      });
    }

    res.status(200).json({
      message: "Berhasil Menghapus Data Riwayat Jabatan",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Gagal Menghapus Data Riwayat Jabatan",
    });
  }
};

// All methods for model Riwayat Gaji
// Get Data
export const getGaji = async (req, res) => {
  try {
    const { id } = req.params;
    const riwayat_gaji = await RiwayatGaji.findById(id);
    if (!riwayat_gaji) {
      console.log(riwayat_gaji);
      return res.status(404).json({
        message: "Data Riwayat Gaji Not Found",
      });
    }

    res.status(200).json({
      message: "Success to Get Data Riwayat Gaji",
      riwayat_gaji: riwayat_gaji,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to Get Data Riwayat Gaji",
      error: error.message,
    });
  }
};
// Create Data
export const createGaji = async (req, res) => {
  try {
    const { id } = req.params;

    const dataGtk = await Gtk.findById(id);
    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        message: "Data GTK Not Found",
      });
    }

    const formGaji = req.body;
    const riwayatGaji = new RiwayatGaji({
      ...formGaji,
    });

    const savedGaji = await riwayatGaji.save();

    dataGtk.gaji_id.push(savedGaji._id);
    await dataGtk.save();

    res.status(201).json({
      message: "Berhasil Menambahkan Data Riwayat Gaji",
      riwayat_gaji: savedGaji,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Data Riwayat Gaji",
    });
  }
};
// Update Data
export const updateGaji = async function (req, res) {
  try {
    const { id } = req.params;
    const formUpdateGaji = req.body;
    const updateGaji = await RiwayatGaji.findByIdAndUpdate(id, formUpdateGaji, {
      new: true,
    });
    if (!updateGaji) {
      return res.status(404).json({
        massage: "Data Anak Not Found",
      });
    }
    res.status(201).json({
      message: "Berhasil Mengubah Data Riwayat Gaji",
      update: updateGaji,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Riwayat Jabatan",
    });
  }
};

// Delete Data
export const deleteGaji = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGaji = await RiwayatGaji.findByIdAndDelete(id);

    if (!deletedGaji) {
      console.log(deleteGaji);
      return res.status(404).json({
        message: "Data Riwayat Gaji Not Found",
      });
    }

    res.status(200).json({
      message: "Berhasil Menghapus Data Riwayat Gaji",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menghapus Data Riwayat Gaji",
    });
  }
};

// All methods for model Inpassing
// Get Data
export const getInpassing = async (req, res) => {
  try {
    const { id } = req.params;
    const inpassing = await Inpassing.findById(id);
    if (!inpassing) {
      console.log(inpassing);
      return res.status(404).json({
        message: "Data Inpassing Not Found",
      });
    }

    res.status(200).json({
      message: "Success to Get Data Inpassing",
      inpassing: inpassing,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to Get Data Inpassing",
      error: error.message,
    });
  }
};
// Create Data
export const createInpassing = async (req, res) => {
  try {
    const { id } = req.params;

    const dataGtk = await Gtk.findById(id);
    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        message: "Data GTK Not Found",
      });
    }

    const formInpassing = req.body;
    const inpassing = new Inpassing({
      ...formInpassing,
    });

    const savedInpassing = await inpassing.save();

    dataGtk.inpassing_id.push(savedInpassing._id);
    await dataGtk.save();

    res.status(201).json({
      message: "Berhasil Menambahkan Data Inpassing",
      inpassing: savedInpassing,
    });
  } catch (error) {
    console.log(erro.massage);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Data Inpassing",
    });
  }
};
// Update Data
export const updateInpassing = async function (req, res) {
  try {
    const { id } = req.params;
    const formUpdateInpassing = req.body;
    const updateInpassing = await Inpassing.findByIdAndUpdate(id, formUpdateInpassing, {
      new: true,
    });
    if (!updateInpassing) {
      return res.status(404).json({
        massage: "Data Anak Not Found",
      });
    }
    res.status(201).json({
      message: "Berhasil Mengubah Data Inpassing",
      update: updateInpassing,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Inpassing",
    });
  }
};

// Delete Data
export const deleteInpassing = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInpassing = await Inpassing.findByIdAndDelete(id);
    if (!deletedInpassing) {
      console.log(deletedInpassing);
      return res.status(404).json({
        message: "Data Inpassing Not Found",
      });
    }

    res.status(200).json({
      message: "Berhasil Menghapus Data Inpassing",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menghapus Data Inpassing",
    });
  }
};

// All methods for model Tunjangan\
// Get Data
export const getTunjangan = async (req, res) => {
  try {
    const { id } = req.params;
    const tunjangan = await Tunjangan.findById(id);
    if (!tunjangan) {
      console.log(tunjangan);
      return res.status(200).json({
        message: "Data Tunjangan Not Found",
      });
    }

    res.status(200).json({
      message: "Success to Get Data Tunjangan",
      tunjangan: tunjangan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to Get Data Tunjangan",
      error: error.message,
    });
  }
};
// Create Data
export const createTunjangan = async (req, res) => {
  try {
    const { id } = req.params;

    const dataGtk = await Gtk.findById(id);
    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        message: "Data GTK Not Found",
      });
    }

    const formTunjangan = req.body;
    const tunjangan = new Tunjangan({
      ...formTunjangan,
    });

    const savedTunjangan = await tunjangan.save();

    dataGtk.tunjangan_id.push(savedTunjangan._id);
    await dataGtk.save();

    res.status(201).json({
      message: "Berhasil Menambahkan Data Tunjangan",
      tunjangan: savedTunjangan,
    });
  } catch (error) {
    console.log(error.massage);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Data Tunjangan",
    });
  }
};
// Update Data
export const updateTunjangan = async function (req, res) {
  try {
    const { id } = req.params;
    const formUpdateTunjangan = req.body;
    const updateTunjangan = await Tunjangan.findByIdAndUpdate(id, formUpdateTunjangan, {
      new: true,
    });
    if (!updateTunjangan) {
      return res.status(404).json({
        massage: "Data Anak Not Found",
      });
    }
    res.status(201).json({
      message: "Berhasil Mengubah Data Tunjangan",
      update: updateTunjangan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Tunjangan",
    });
  }
};

// Delete Data
export const deleteTunjangan = async (req, res) => {
  try {
    const idTunjangan = req.params;

    const deletedTunjangan = await Tunjangan.findByIdAndDelete(idTunjangan);
    if (!deletedTunjangan) {
      console.log(deleteTunjangan);
      return res.status(404).json({
        message: "Data Tunjangan Not Found",
      });
    }

    res.status(200).json({
      message: "Berhasil Menghapus Data Tunjangan",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Gagal Menghapus Data Tunjangan",
    });
  }
};

// Create Data
export const createGtk = async (req, res) => {
  try {
    const { nama_lengkap, nik, jk, tempat_lahir, tanggal_lahir, agama, no_telp, email, nip } = req.body;
    const existingGtk = await Gtk.findOne({ nik: nik });

    if (existingGtk) {
      return res.status(409).json({
        message: "Data GTK Already Exists",
      });
    }

    const hashNip = await argon2.hash(nip);

    const user = new User({
      username: nama_lengkap,
      email: email,
      password: hashNip,
      role: "guru",
    });
    const saveUser = await user.save();

    const gtk = new Gtk({
      user_id: saveUser._id,
      nama_lengkap: nama_lengkap,
      nik: nik,
      jk: jk,
      tempat_lahir: tempat_lahir,
      tanggal_lahir: tanggal_lahir,
      agama: agama,
      no_telp: no_telp,
      email: email,
      nip: nip,
    });

    const savedGtk = await gtk.save();

    res.status(200).json({
      message: "Berhasil Menambahkan Data GTk",
      gtk: savedGtk,
      user: saveUser._id,
    });
  } catch (error) {
    res.status(500).json({
      error: `Gagal Menambahkan Data GTK: ${error.message}`,
      message: "Gagal Menambahkan Data GTK",
    });
  }
};
// Update Data
export const updateGtk = async (req, res) => {
  try {
    const { id } = req.params;
    const formUpdateGtk = {
      nama_lengkap: req.body.nama_lengkap,
      nik: req.body.nik,
      jk: req.body.jk,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      agama: req.body.agama,
      no_telp: req.body.no_telp,
      email: req.body.email,
      nip: req.body.nip,
      nama_ibu: req.body.nama_ibu,
      alamat: req.body.alamat,
      rt: req.body.rt,
      rw: req.body.rw,
      nama_dusun: req.body.nama_dusun,
      nama_kelurahan: req.body.nama_kelurahan,
      kecamatan: req.body.kecamatan,
      kota_kab: req.body.kota_kab,
      provinsi: req.body.provinsi,
      no_kk: req.body.no_kk,
      kode_pos: req.body.kode_pos,
      kewarganegaraan: req.body.kewarganegaraan,
      npwp: req.body.npwp,
      nama_wajib_pajak: req.body.nama_wajib_pajak,
      status_kawin: req.body.status_kawin,
      nama_istri_suami: req.body.nama_istri_suami,
      nip_istri_suami: req.body.nip_istri_suami,
      pekerjaan_istri_suami: req.body.pekerjaan_istri_suami,
      no_telp_rumah: req.body.no_telp_rumah,
      bb: req.body.bb,
      tb: req.body.tb,
      gol_darah: req.body.gol_darah,
    };

    const updateGtk = await Gtk.findByIdAndUpdate(id, formUpdateGtk, {
      new: true,
    });

    if (!updateGtk) {
      console.log(updateGtk);
      return res.status(404).json({
        message: "Data Gtk Not Found",
      });
    }

    res.status(200).json({
      message: "Berhasil Mengubah Data Gtk",
      update: updateGtk,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Gtk",
    });
  }
};

// Read Data
export const getGtk = async (req, res) => {
  try {
    const gtk = await Gtk.find()
      .populate([
        { path: "user_id", model: "User" },
        { path: "kepegawaian_id", model: "Kepegawaian" },
        { path: "pendidikan_id", model: "RiwayatPendidikan" },
        { path: "anak_id", model: "Anak" },
        { path: "beasiswa_id", model: "Beasiswa" },
        { path: "sertifikasi_id", model: "Sertifikasi" },
        { path: "diklat_id", model: "Diklat" },
        { path: "penugasan_id", model: "Penugasan" },
        { path: "tugas_tambahan_id", model: "TugasTambahan" },
        { path: "penghargaan_id", model: "Penghargaan" },
        { path: "jabatan_id", model: "RiwayatJabatan" },
        { path: "gaji_id", model: "RiwayatGaji" },
        { path: "inpassing_id", model: "Inpassing" },
        { path: "tunjangan_id", model: "Tunjangan" },
      ])
      .lean();
    if (!gtk) {
      console.log(gtk);
      return res.status(404).json({
        message: "Data GTK Not Found",
      });
    }
    res.status(200).json({
      message: "Get Data GTK Success",
      gtks: gtk,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Get Data GTK Failed",
    });
  }
};

export const getOneGtk = async (req, res) => {
  try {
    const { id } = req.params;
    const gtk = await Gtk.findById(id)
      .populate([
        { path: "user_id", model: "User" },
        { path: "kepegawaian_id", model: "Kepegawaian" },
        { path: "pendidikan_id", model: "RiwayatPendidikan" },
        { path: "anak_id", model: "Anak" },
        { path: "beasiswa_id", model: "Beasiswa" },
        { path: "sertifikasi_id", model: "Sertifikasi" },
        { path: "diklat_id", model: "Diklat" },
        { path: "penugasan_id", model: "Penugasan" },
        { path: "tugas_tambahan_id", model: "TugasTambahan" },
        { path: "penghargaan_id", model: "Penghargaan" },
        { path: "jabatan_id", model: "RiwayatJabatan" },
        { path: "gaji_id", model: "RiwayatGaji" },
        { path: "inpassing_id", model: "Inpassing" },
        { path: "tunjangan_id", model: "Tunjangan" },
      ])
      .lean();
    if (!gtk) {
      console.log(gtk);
      return res.status(404).json({
        message: "Data Gtk Not Found",
      });
    }

    res.status(200).json({
      message: "Get One Gtk Success",
      gtk: gtk,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Get One Gtk Failed",
    });
  }
};

export const getOneGtkLogin = async (req, res) => {
  try {
    const { id } = req.params;
    const rayon = await Rayon.findOne({ pembimbing_id: id });

    if (rayon) {
      const gtk = await Gtk.findOne({ user_id: id })
        .populate([
          { path: "user_id", model: "User" },
          { path: "kepegawaian_id", model: "Kepegawaian" },
          { path: "pendidikan_id", model: "RiwayatPendidikan" },
          { path: "anak_id", model: "Anak" },
          { path: "beasiswa_id", model: "Beasiswa" },
          { path: "sertifikasi_id", model: "Sertifikasi" },
          { path: "diklat_id", model: "Diklat" },
          { path: "penugasan_id", model: "Penugasan" },
          { path: "tugas_tambahan_id", model: "TugasTambahan" },
          { path: "penghargaan_id", model: "Penghargaan" },
          { path: "jabatan_id", model: "RiwayatJabatan" },
          { path: "gaji_id", model: "RiwayatGaji" },
          { path: "inpassing_id", model: "Inpassing" },
          { path: "tunjangan_id", model: "Tunjangan" },
        ])
        .lean();
      if (!gtk) {
        console.log(gtk);
        return res.status(404).json({
          message: "Data Gtk Not Found",
        });
      }

      const nama_rayon = rayon.nama_rayon;
      const student = await Student.find({ rayon: nama_rayon })
        .populate([
          { path: "dokumen_id", model: "Dokumen" },
          { path: "keluarga_id", model: "Family" },
          { path: "user_id", model: "User" },
        ])
        .lean();

      if (!student || student.length === 0) {
        console.log(student);
        return res.status(404).json({
          message: "Data Student Not Found",
        });
      }
      return res.status(200).json({
        message: "Get Data Success",
        gtk: gtk,
        student: student,
      });
    }
    const gtk = await Gtk.findOne({ user_id: id })
      .populate([
        { path: "user_id", model: "User" },
        { path: "kepegawaian_id", model: "Kepegawaian" },
        { path: "pendidikan_id", model: "RiwayatPendidikan" },
        { path: "anak_id", model: "Anak" },
        { path: "beasiswa_id", model: "Beasiswa" },
        { path: "sertifikasi_id", model: "Sertifikasi" },
        { path: "diklat_id", model: "Diklat" },
        { path: "penugasan_id", model: "Penugasan" },
        { path: "tugas_tambahan_id", model: "TugasTambahan" },
        { path: "penghargaan_id", model: "Penghargaan" },
        { path: "jabatan_id", model: "RiwayatJabatan" },
        { path: "gaji_id", model: "RiwayatGaji" },
        { path: "inpassing_id", model: "Inpassing" },
        { path: "tunjangan_id", model: "Tunjangan" },
      ])
      .lean();

    if (!gtk) {
      console.log(gtk);
      return res.status(404).json({
        message: "Data GTK Not Found",
      });
    }

    return res.status(200).json({
      message: "Get Data Success",
      gtk: gtk,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Get Data Failed",
      error: error.message,
    });
  }
};

export const deleteGtk = async (req, res) => {
  try {
    const { id } = req.params;
    const gtk = await Gtk.findById(id);
    const user_id = gtk.user_id;
    const kepegawaian_id = gtk.kepegawaian_id;
    const pendidikan_id = gtk.pendidikan_id;
    const anak_id = gtk.anak_id;
    const beasiswa_id = gtk.beasiswa_id;
    const sertifikasi_id = gtk.sertifikasi_id;
    const diklat_id = gtk.diklat_id;
    const penugasan_id = gtk.penugasan_id;
    const tugas_tambahan_id = gtk.tugas_tambahan_id;
    const penghargaan_id = gtk.penghargaan_id;
    const tunjangan_id = gtk.tunjangan_id;
    const inpassing_id = gtk.inpassing_id;
    const jabatan_id = gtk.jabatan_id;
    const gaji_id = gtk.gaji_id;
    if (!gtk) {
      return res.status(404).json({
        message: "Data Not Found",
      });
    }
    await User.findByIdAndDelete(user_id);
    await Kepegawaian.findByIdAndDelete(kepegawaian_id);

    for (let i = 0; i < pendidikan_id.length; i++) {
      await RiwayatPendidikan.findByIdAndDelete(pendidikan_id[i]);
    }
    for (let i = 0; i < anak_id.length; i++) {
      await Anak.findByIdAndDelete(anak_id[i]);
    }
    for (let i = 0; i < beasiswa_id.length; i++) {
      await Beasiswa.findByIdAndDelete(beasiswa_id[i]);
    }
    for (let i = 0; i < sertifikasi_id.length; i++) {
      await Anak.findByIdAndDelete(sertifikasi_id[i]);
    }
    for (let i = 0; i < diklat_id.length; i++) {
      await Anak.findByIdAndDelete(diklat_id[i]);
    }
    for (let i = 0; i < penugasan_id.length; i++) {
      await Anak.findByIdAndDelete(penugasan_id[i]);
    }
    for (let i = 0; i < tugas_tambahan_id.length; i++) {
      await Anak.findByIdAndDelete(tugas_tambahan_id[i]);
    }
    for (let i = 0; i < penghargaan_id.length; i++) {
      await Anak.findByIdAndDelete(penghargaan_id[i]);
    }
    for (let i = 0; i < tunjangan_id.length; i++) {
      await Anak.findByIdAndDelete(tunjangan_id[i]);
    }
    for (let i = 0; i < inpassing_id.length; i++) {
      await Anak.findByIdAndDelete(inpassing_id[i]);
    }
    for (let i = 0; i < jabatan_id.length; i++) {
      await Anak.findByIdAndDelete(jabatan_id[i]);
    }
    for (let i = 0; i < gaji_id.length; i++) {
      await Anak.findByIdAndDelete(gaji_id[i]);
    }

    const deleteGtk = await Gtk.findByIdAndDelete(id);

    res.status(200).json({
      message: "Succes Deleted",
      gtk: deleteGtk,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Failed",
    });
  }
};

// All methods for model Status Kepegawaian
// Create Data
export const createStatus = async (req, res) => {
  try {
    const { jenis_status } = req.body;

    if (!jenis_status) {
      return res.status(400).json({ message: "jenis_status is required" });
    }

    const statusKepegawaian = new StatusKepegawaian({
      jenis_status,
    });

    const saveStatus = await statusKepegawaian.save();

    res.status(201).json({
      message: "Berhasil Menambahkan Status Pegawai",
      saveStatus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal Menambahkan Status Pegawai" });
  }
};

// Read Data
export const getStatus = async (req, res) => {
  try {
    const statusKepegawaian = await StatusKepegawaian.find();

    if (!statusKepegawaian) {
      return res.status(404).json({ message: "Data Status Kepegawaian Not Found" });
    }

    res.status(201).json({
      message: "Get Data Status Kepegawaian Success",
      status_kepegawaian: statusKepegawaian,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Get Data Status Kepegawaian Failed",
    });
  }
};

// All methods for model Jenis PTK

// Create Data
export const createJenis = async (req, res) => {
  try {
    const { jenis_ptk } = req.body;
    const jenis = new JenisPtk({
      jenis_ptk: jenis_ptk,
    });

    const savedJenis = await jenis.save();

    res.status(201).json({
      message: "Berhasil Menambahkan Jenis PTK",
      savedJenis,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Jenis PTK",
    });
  }
};

// Read Data
export const getJenis = async (req, res) => {
  try {
    const jenisPtk = await JenisPtk.find();

    if (!jenisPtk) {
      return res.status(404).json({ message: "Data Jenis PTK Not Found" });
    }

    res.status(201).json({
      message: "Get Data Jenis PTK Success",
      jenis_ptk: jenisPtk,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Get Data Jenis PTK Failed",
    });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/gtks");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const multipleUpload = upload.fields([
  { name: "ijazah_sd", maxCount: 1 },
  { name: "ijazah_smp", maxCount: 1 },
  { name: "ijazah_sma", maxCount: 1 },
  { name: "ijazah_univ", maxCount: 1 },
  { name: "ktp", maxCount: 1 },
  { name: "akte_kelahiran", maxCount: 1 },
  { name: "kk", maxCount: 1 },
]);

console.log(multipleUpload);

export const uploadImageGtk = async (req, res) => {
  try {
    const { id } = req.params;

    multipleUpload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const { ijazah_sd, ijazah_smp, ijazah_sma, ijazah_univ, ktp, akte_kelahiran, kk } = req.files;

      console.log(req.files);
      try {
        const guru = await Gtk.findById(id);

        if (!guru) {
          return res.status(404).json({
            message: "Data Gtk Not Found",
          });
        }

        const dokumenId = new documentGtk({
          ijazah_sd: ijazah_sd ? ijazah_sd[0].path : null,
          ijazah_smp: ijazah_smp ? ijazah_smp[0].path : null,
          ijazah_sma: ijazah_sma ? ijazah_sma[0].path : null,
          ijazah_univ: ijazah_univ ? ijazah_univ[0].path : null,
          ktp: ktp ? ktp[0].path : null,
          akte_kelahiran: akte_kelahiran ? akte_kelahiran[0].path : null,
          kk: kk ? kk[0].path : null,
        });

        const savedDokumenId = await dokumenId.save();

        await Gtk.updateOne({ _id: id }, { dokumen_id: savedDokumenId._id });

        const response = {
          message: "Files uploaded successfully",
          documents: {
            ijazah_sd: savedDokumenId.ijazah_sd,
            ijazah_smp: savedDokumenId.ijazah_smp,
            ijazah_sma: savedDokumenId.ijazah_sma,
            ijazah_univ: savedDokumenId.ijazah_univ,
            ktp: savedDokumenId.ktp,
            akte_kelahiran: savedDokumenId.akte_kelahiran,
            kk: savedDokumenId.kk,
          },
          dokumen_id: savedDokumenId._id,
        };

        return res.json(response);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getUploadGtk = async (req, res) => {
  try {
    const { dokumen_id } = req.params;
    const dokumen = await documentGtk.findById(dokumen_id);

    if (!dokumen) {
      return res.status(404).json({
        message: "Dokumen Not Found",
      });
    }
    const guru = await Gtk.findOne({ dokumen_id });

    if (!guru) {
      return res.status(404).json({
        message: "Guru Not Found for the specified Dokumen ID",
      });
    }
    const response = {
      message: "Data upload retrieved successfully",
      nama_guru: guru.nama_lengkap,
      dokumen_id: dokumen._id,
      documents: {
        ijazah_sd: dokumen.ijazah_sd,
        ijazah_smp: dokumen.ijazah_smp,
        ijazah_sma: dokumen.ijazah_sma,
        ijazah_univ: dokumen.ijazah_univ,
        ktp: dokumen.ktp,
        akte_kelahiran: dokumen.akte_kelahiran,
        kk: dokumen.kk,
      },
    };

    return res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
