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
      update_anak: updateAnak,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Mengubah Data Anak",
    });
  }
};

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
// Delete Data
export const deletePendidikan = async (req, res) => {
  try {
    const idPendidikan = req.params;

    const deletedPendidikan = await RiwayatPendidikan.findByIdAndDelete(idPendidikan);

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
      message: "Gagal Menambahkan Data Riwayat Pendidikan",
    });
  }
};
// Delete Data
export const deleteSertifikasi = async (req, res) => {
  try {
    const idSertifikasi = req.params;

    const deletedSertifikasi = await Sertifikasi.findByIdAndDelete(idSertifikasi);

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

// Delete Data
export const deletePenghargaan = async (req, res) => {
  try {
    const idPenghargaan = req.params;

    const deletedPenghargaan = await Penghargaan.findByIdAndDelete(idPenghargaan);

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

// All methods for model GTK
// Create Data
export const createGtk = async (req, res) => {
  try {
    const {
      nama_lengkap,
      nik,
      jk,
      tempat_lahir,
      tanggal_lahir,
      nama_ibu,
      alamat,
      rt,
      rw,
      nama_dusun,
      nama_kelurahan,
      kecamatan,
      no_kk,
      kode_pos,
      agama,
      kewarganegaraan,
      npwp,
      nama_wajib_pajak,
      status_kawin,
      nama_istri_suami,
      nip_istri_suami,
      pekerjaan_istri_suami,
      no_telp,
      no_telp_rumah,
      email,
      bb,
      tb,
      gol_darah,
    } = req.body;

    const gtk = new Gtk({
      nama_lengkap,
      nik,
      jk,
      tempat_lahir,
      tanggal_lahir,
      nama_ibu,
      alamat,
      rt,
      rw,
      nama_dusun,
      nama_kelurahan,
      kecamatan,
      no_kk,
      kode_pos,
      agama,
      kewarganegaraan,
      npwp,
      nama_wajib_pajak,
      status_kawin,
      nama_istri_suami,
      nip_istri_suami,
      pekerjaan_istri_suami,
      no_telp,
      no_telp_rumah,
      email,
      bb,
      tb,
      gol_darah,
    });

    const savedGtk = await gtk.save();

    res.status(201).json({
      message: "Berhasil Menambahkan Data GTK",
      gtk: savedGtk,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Read Data
export const getData = async (req, res) => {
  try {
    const gtk = await Gtk.find()
      .populate([
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

    gtk.forEach((data) => {
      console.log(data.anak_id);
    });

    res.status(201).json({
      message: "Success",
      datas: gtk,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Data Not Found",
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

export const tambahDataPendidikan = async function (req, res) {
  try {
    const { id } = req.params;
    const dataBaruPendidikan = req.body;
    const dataGtk = await Gtk.findById(id);
    if (!dataGtk) {
      return res.status(404).json({
        error: "Data Gtk tidak ditemukan",
        message: "Tidak ada data Gtk yang sesuai dengan kriteria pencarian",
      });
    }
    const dataBaru = await RiwayatPendidikan.create(dataBaruPendidikan);
    dataGtk.pendidikan_id.push(dataBaru._id);
    await dataGtk.save();
    res.status(201).json({
      message: "Data Pendidikan berhasil ditambahkan ke Gtk",
      data: dataBaru,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Gagal menambahkan data Pendidikan ke Gtk",
      message: error.message,
    });
  }
};

export const appendDataAnak = async function (req, res) {
  try {
    const { id } = req.params;
    const dataAnakBaru = req.body;
    const dataGtk = await Gtk.findById(id);
    if (!dataGtk) {
      return res.status(404).json({
        error: "Data Gtk tidak ditemukan",
        message: "Tidak ada data Gtk yang sesuai dengan kriteria pencarian",
      });
    }
    const anakBaru = await Anak.create(dataAnakBaru);
    dataGtk.anak_id.push(anakBaru._id);
    await dataGtk.save();
    res.status(201).json({
      message: "Data anak berhasil ditambahkan ke Gtk",
      data: anakBaru,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Gagal menambahkan data anak ke Gtk",
      message: error.message,
    });
  }
};

export const tambahSertifikasi = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBaruSertifikasi = req.body;
    const dataGtk = Gtk.findById(id);

    if (!dataGtk) {
      res.status(404).json({ massaged: "Not Found data" });
    }
    const dataBaru = await Sertifikasi.create(dataBaruSertifikasi);
    dataGtk.sertifikasi_id.push(dataBaru._id);
    await dataGtk.save();
    res.status(201).json({
      message: "Data sertifikasi berhasil ditambahkan ke Gtk",
      data: dataBaru,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error",
    });
  }
};

export const tambahBeasiswa = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBaruBeasiswa = req.body;
    const dataGtk = Gtk.findById(id);
    if (!dataGtk) {
      res.status(404).json({ massagge: "Not Found data" });
    }
    const dataBaru = await Beasiswa.create(dataBaruBeasiswa);
    dataGtk.beasiswa_id.push(dataBaru._id);
    await dataGtk.save();
    res.status(201).json({
      message: "Data beasiswa berhasil ditambahkan ke Gtk",
      data: dataBaru,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error",
    });
  }
};
