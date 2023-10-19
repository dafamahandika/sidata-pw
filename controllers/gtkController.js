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

    const formDiklat = req.body;
    const diklat = new Diklat({ ...formDiklat });

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

    const formPenugasan = req.body;
    const penugasan = new Penugasan({
      ...formPenugasan,
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

    res.status(200).json({
      message: "Berhasil Menambahkan Data Tugas Tambahan",
      tugas_tambahan: savedTugas,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: error.message,
      message: "Gagal Menambahkan Data Tugas Tambahan",
    });
  }
};

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

    res.status(200).json({
      message: "Berhasil Menambahkan Data Penghargaan",
      penghargaan: savedPenghargaan,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Gagal Menambahkan Data Penghargaan",
    });
  }
};

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

    res.status(200).json({
      message: "Berhasil Menambahkan Data Riwayat Jabatan",
      riwayat_jabatan: savedJabatan,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: error.message,
      message: "Gagal Menambahkan Data Riwayat Jabatan",
    });
  }
};

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

    res.status(200).json({
      message: "Berhasil Menambahkan Data Riwayat Gaji",
      riwayat_gaji: savedGaji,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: error.message,
      message: "Gagal Menambahkan Data Riwayat Gaji",
    });
  }
};

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

    res.status(200).json({
      message: "Berhasil Menambahkan Data Inpassing",
      inpassing: savedInpassing,
    });
  } catch (error) {
    console.log(erro.massage);
    res.status(404).json({
      error: error.message,
      message: "Gagal Menambahkan Data Inpassing",
    });
  }
};

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

    res.status(200).json({
      message: "Berhasil Menambahkan Data Tunjangan",
      tunjangan: savedTunjangan,
    });
  } catch (error) {
    console.log(error.massage);
    res.status(404).json({
      error: error.message,
      message: "Gagal Menambahkan Data Tunjangan",
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
