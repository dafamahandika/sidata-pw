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
import DocumentGTK from "../models/Gtk/documentGtk.js";
import argon2 from "argon2";
// All method for model Anak
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
    const updateBeasiswa = await Beasiswa.findByIdAndUpdate(
      id,
      formUpdateBeasiswa,
      {
        new: true,
      }
    );
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
// Create Data
export const createKepegawaian = async (req, res) => {
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

    const formKepegawaian = req.body;
    const kepegawaian = new Kepegawaian({
      ...formKepegawaian,
    });

    const savedKepegawaian = await kepegawaian.save();

    dataGtk.kepegawaian_id.push(savedKepegawaian._id);
    await dataGtk.save();

    res.status(201).json({
      massage: "Berhasil Menambahkan Data Kepegawaian",
      data: savedKepegawaian,
    });
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
    const updateKepegawaian = await Kepegawaian.findByIdAndUpdate(
      id,
      formUpdateKepegawaian,
      {
        new: true,
      }
    );
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

    const deletedKepegawaian = await Kepegawaian.findByIdAndDelete(
      idKepegawaian
    );

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
    const updatePendidikan = await RiwayatPendidikan.findByIdAndUpdate(
      id,
      formUpdatePendidikan,
      {
        new: true,
      }
    );
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
    const idPendidikan = req.params;

    const deletedPendidikan = await RiwayatPendidikan.findByIdAndDelete(
      idPendidikan
    );

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
    const updateSertifikasi = await Sertifikasi.findByIdAndUpdate(
      id,
      formUpdateSertifikasi,
      {
        new: true,
      }
    );
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
    const idSertifikasi = req.params;

    const deletedSertifikasi = await Sertifikasi.findByIdAndDelete(
      idSertifikasi
    );

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
    const idDiklat = req.params;

    const deletedDiklat = await Diklat.findByIdAndDelete(idDiklat);

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
    const updatePenugasan = await Penugasan.findByIdAndUpdate(
      id,
      formUpdatePenugasan,
      {
        new: true,
      }
    );
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
    const idPenugasan = req.params;

    const deletedPenugasan = await Penugasan.findByIdAndDelete(idPenugasan);

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
    const updateTugas = await TugasTambahan.findByIdAndUpdate(
      id,
      formUpdateTugas,
      {
        new: true,
      }
    );
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
    const idTugas = req.params;

    const deletedTugas = await TugasTambahan.findByIdAndDelete(idTugas);

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
    const updatePenghargaan = await Penghargaan.findByIdAndUpdate(
      id,
      formUpdatePenghargaan,
      {
        new: true,
      }
    );
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
    const idPenghargaan = req.params;

    const deletedPenghargaan = await Penghargaan.findByIdAndDelete(
      idPenghargaan
    );

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
    const updateJabatan = await RiwayatJabatan.findByIdAndUpdate(
      id,
      formUpdateJabatan,
      {
        new: true,
      }
    );
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
    const idJabatan = req.params;

    const deletedJabatan = await RiwayatJabatan.findByIdAndDelete(idJabatan);

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
// Create Data
export const createGaji = async (req, res) => {
  try {
    const { id } = req.param;

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
    const idGaji = req.params;

    const deletedGaji = await RiwayatGaji.findByIdAndDelete(idGaji);

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
    const updateInpassing = await Inpassing.findByIdAndUpdate(
      id,
      formUpdateInpassing,
      {
        new: true,
      }
    );
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
    const idInpassing = req.params;

    const deletedInpassing = await Inpassing.findByIdAndDelete(idInpassing);
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

// All methods for model Tunjangan
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
    res.status(5005).json({
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
    const updateTunjangan = await Tunjangan.findByIdAndUpdate(
      id,
      formUpdateTunjangan,
      {
        new: true,
      }
    );
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
    const {
      nama_lengkap,
      nik,
      jk,
      tempat_lahir,
      tanggal_lahir,
      agama,
      no_telp,
      email,
      nip,
    } = req.body;
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
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Data GTK",
    });
  }
};
// Update Data
export const updateGtk = async (req, res) => {
  try {
    const { id } = req.params;
    const formUpdateGtk = {
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

    res.status(200).json({
      message: "Get Data Success",
      gtk: gtk,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Get Data Failed",
      error: error.message,
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
      return res
        .status(404)
        .json({ message: "Data Status Kepegawaian Not Found" });
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

export const uploadGtk = async (req, res) => {
  try {
    const { id } = req.params;

    const { ijazah_sd } = req.body;
    const { ijazah_smp } = req.body;
    const { ijazah_sma } = req.body;
    const { ktp } = req.body;
    const { akte_kelahiran } = req.body;
    const { kk } = req.body;

    const result = await DocumentGTK.create({
      ijazah_sd,
      ijazah_smp,
      ijazah_sma,
      ktp,
      akte_kelahiran,
      kk,
    });

    const gtk = await Gtk.findById(id);

    if (!gtk) {
      console.log(gtk);
      return res.status(404).json({
        message: "Data GTK Not Found",
      });
    }

    await gtk.updateOne({
      gtk_dokumen_id: result._id,
    });

    return res.status(200).json({
      message: "Behasil",
      data: result,
      dokumen_id: gtk.gtk_dokumen_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};
