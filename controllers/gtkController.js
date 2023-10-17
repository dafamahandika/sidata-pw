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
import Penghargaan from "../models/Gtk/Penghargaan.js";
import Inpassing from "../models/Gtk/Inpassing.js";
import TugasTambahan from "../models/Gtk/TugasTambahan.js";
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

    const { nama, status, jenjang_pendidikan, nisn, tahun_masuk, jk, tempat_lahir, tanggal_lahir } = req.body;

    const anak = new Anak({
      nama,
      status,
      jenjang_pendidikan,
      nisn,
      tahun_masuk,
      jk,
      tempat_lahir,
      tanggal_lahir,
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

    const { jenis_beasiswa, keterangan, tahun_mulai, tahun_akhir, masih_menerima } = req.body;

    const beasiswa = new Beasiswa({
      jenis_beasiswa,
      keterangan,
      tahun_mulai,
      tahun_akhir,
      masih_menerima,
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

    const { status_kepegawaian, jenis_ptk, nip, niy, nuptk, sumber_gaji } = req.body;
    const kepegawaian = new Kepegawaian({
      status_kepegawaian,
      jenis_ptk,
      nip,
      niy,
      nuptk,
      sumber_gaji,
    });

    const savedKepegawaian = await kepegawaian.save();

    dataGtk.kepegawaian_id.push(savedKepegawaian._id);
    await dataGtk.save();

    res.status(200).json({
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

export const createPendidikan = async (req, res) => {
  try {
    const { id } = req.params;
    const dataPendidikan = req.body;

    const dataGtk = await Gtk.findById(id);

    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        error: "Data GTK Not Found",
        message: "Data GTK Tidak di Temukan",
      });
    }

    const pendidikan = new RiwayatPendidikan({
      ...dataPendidikan,
    });

    const savedPendidikan = await pendidikan.save();

    dataGtk.pendidikan_id.push(savedPendidikan._id);
    await dataGtk.save();

    res.status(200).json({
      message: "Berhasil Menambahkan Data Riwayat Pendidikan",
      riwayat_pendidikan: savedPendidikan,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: error.message,
      message: "Gagal Menambahkan Data Riwayat Pendidikan",
    });
  }
};

export const createSertifikasi = async (req, res) => {
  try {
    const { id } = req.params;
    const dataSertifikasi = req.body;

    const dataGtk = await Gtk.findById(id);

    if (!dataGtk) {
      console.log(dataGtk);
      return res.status(404).json({
        error: "Data GTK Not Found",
        message: "Data GTK Tidak di Temukan",
      });
    }

    const sertifikasi = new Sertifikasi({
      ...dataSertifikasi,
    });

    const savedSertifikasi = await sertifikasi.save();

    dataGtk.sertifikasi_id.push(savedSertifikasi._id);
    await dataGtk.save();

    res.status(200).json({
      message: "Berhasil Menambahkan Data Sertifikasi",
      sertifikasi: savedSertifikasi,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: error.message,
      message: "Gagal Menambahkan Data Riwayat Pendidikan",
    });
  }
};

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

    const dataDiklat = req.body;
    const diklat = new Diklat({ ...dataDiklat });

    const savedDiklat = await diklat.save();

    dataGtk.diklat_id.push(savedDiklat._id);
    await dataGtk.save();

    res.status(200).json({
      message: "Berhasil Menambahkan Data Diklat",
      diklat: savedDiklat,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: error.message,
      message: "Gagal Menambahkan Data Diklat",
    });
  }
};

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

    const dataPenugasan = req.body;
    const penugasan = new Penugasan({
      ...dataPenugasan,
    });

    const savedPenugasan = await penugasan.save();

    dataGtk.penugasan_id.push(savedPenugasan._id);
    await dataGtk.save();

    res.status(200).json({
      message: "Berhasil Menambahkan Data Penugasan",
      penugasan: savedPenugasan,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: error.message,
      message: "Gagal Menambahkan Data Penugasan",
    });
  }
};

export const getStatus = async (req, res) => {
  try {
    const statusKepegawaian = await StatusKepegawaian.find();

    if (!statusKepegawaian) {
      return res.status(404).json({ message: "Data Status Kepegawaian Not Found" });
    }

    res.status(200).json({
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

export const getJenis = async (req, res) => {
  try {
    const jenisPtk = await JenisPtk.find();

    if (!jenisPtk) {
      return res.status(404).json({ message: "Data Jenis PTK Not Found" });
    }

    res.status(200).json({
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
      ])
      .lean();

    res.status(200).json({
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
    res.status(404).json({ message: error.message });
  }
};

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

    res.status(200).json({
      message: "Berhasil Menambahkan Status Pegawai",
      saveStatus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
};

export const createJenis = async (req, res) => {
  try {
    const { jenis_ptk } = req.body;
    const jenis = new JenisPtk({
      jenis_ptk: jenis_ptk,
    });

    const savedJenis = await jenis.save();

    res.status(200).json({
      message: "Berhasil Menambahkan Jenis PTK",
      savedJenis,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateDataAnak = async function (req, res) {
  try {
    const { id } = req.params;
    const updateDataAnak = req.body;
    const isUpdate = await Anak.findByIdAndUpdate(id, updateDataAnak, {
      new: true,
    });
    if (!isUpdate) {
      return res.status(404).json({ massage: "Data Tidak Ditemukan" });
    }
    return res.status(200).json({
      message: "Success",
      isUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error",
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
