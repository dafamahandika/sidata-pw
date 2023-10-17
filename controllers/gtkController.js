import Gtk from "../models/Gtk/Gtk.js";
import Kepegawaian from "../models/Gtk/Kepegawaian.js";
import RiwayatPendidikan from "../models/Gtk/RiwayatPendidikan.js";
import StatusKepegawaian from "../models/Gtk/StatusKepegawaian.js";
import JenisPtk from "../models/Gtk/JenisPtk.js";
import Anak from "../models/Gtk/Anak.js";
import Beasiswa from "../models/Gtk/Beasiswa.js";
import Diklat from "../models/Gtk/Diklat.js";
import Inpassing from "../models/Gtk/Inpassing.js";
import Kompetensi from "../models/Gtk/Kompetensi.js";
import Penugasan from "../models/Gtk/Penugasan.js";
import Sertifikasi from "../models/Gtk/Sertifikasi.js";
import TugasTambahan from "../models/Gtk/TugasTambahan.js";
import Tunjangan from "../models/Gtk/Tunjangan.js";

export const createAnak = async (req, res) => {
  try {
    const { id } = req.params;

    const gtk = await Gtk.findById(id);
    if (!gtk) {
      return res.status(404).json({
        error: "Data GTK Not Found",
        message: "Data GTK Tidak di Temukan",
      });
    }

    const {
      nama,
      status,
      jenjang_pendidikan,
      nisn,
      tahun_masuk,
      jk,
      tempat_lahir,
      tanggal_lahir,
    } = req.body;

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

    gtk.anak_id.push(savedAnak._id);
    await gtk.save();

    res.status(201).json({
      anak: savedAnak,
      message: "Berhasil Menambahkan Data Anak",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createBeasiswa = async (req, res) => {
  try {
    const { id } = req.params;

    const gtk = await Gtk.findById(id);
    if (!gtk) {
      return res.status(404).json({
        error: `${res.status(404)} Data GTK Not Found `,
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

    gtk.beasiswa_id.push(savedBeasiswa._id);
    await gtk.save();

    res.status(201).json({
      Beasiswa: savedBeasiswa,
      message: "Berhasil Menambahkan Data Beasiswa",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getStatus = async (req, res) => {
  try {
    const statusKepegawaian = await StatusKepegawaian.find();

    if (!statusKepegawaian) {
      return res
        .status(404)
        .json({ message: "Data Status Kepegawaian Not Found" });
    }

    res.status(200).json({
      message: "Get Data Status Kepegawaian Success",
      datas: statusKepegawaian,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Get Data Status Kepegawaian Failed" });
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
      datas: jenisPtk,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Get Data Jenis PTK Failed" });
  }
};

export const getData = async (req, res) => {
  try {
    const gtk = await Gtk.find()
      // .populate({
      //   path: "gtk_id",
      //   model: "Kepegawaian",
      // })
      // .populate({
      //   path: "pendidikan_id",
      //   model: "RiwayatPendidikan",
      // })
      .populate({
        path: "gtk_id",
        model: "Kepegawaian",
      })
      .populate({
        path: "gtk_id",
        model: "RiwayatPendidikan",
      })
      .populate({
        path: "gtk_id",
        model: "Anak",
      })
      .populate({
        path: "beasiswa_id",
        model: "Beasiswa",
      })
      // .populate({
      //   path: "sertifikasi_id",
      //   model: "Sertifikasi",
      // })
      // .populate({
      //   path: "diklat_id",
      //   model: "Diklat",
      // })
      // .populate([
      //   { path: "gtk_id", model: "Anak" },
      //   { path: "gtk_id", model: "Beasiswa" },
      // ])
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

export const createKepegawaian = async (req, res) => {
  try {
    const { id } = req.params;
    const { status_kepegawaian, jenis_ptk, nip, niy, nuptk, sumber_gaji } =
      req.body;
    const dataGtk = await Gtk.findById(id);

    const kepegawaian = new Kepegawaian({
      gtk_id: dataGtk.id,
      status_kepegawaian,
      jenis_ptk,
      nip,
      niy,
      nuptk,
      sumber_gaji,
    });

    const savedKepegawaian = await kepegawaian.save();
    res.status(200).json({ massage: "success", savedKepegawaian });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Error" });
  }
};

export const createPendidikan = async (req, res) => {
  try {
    const { id } = req.params;
    const dataPendidikan = req.body;
    const dataGtk = await Gtk.findById(id);

    if (!dataGtk) {
      return res.status(404).json({ message: "Data GTK Not Found" });
    }

    const pendidikan = new RiwayatPendidikan({
      gtk_id: dataGtk.id,
      ...dataPendidikan,
    });

    const savePendidikan = await pendidikan.save();

    res.status(200).json({
      message: "Success",
      savePendidikan,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error" });
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
      // pendidikan_id: savedPendidikan._id,
      // anak_id: saveAnak._id,
      // beasiswa_id: saveBeasiswa._id,
      // sertifikasi_id: saveSertifikasi._id,
      // diklat_id: saveDiklat._id,
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
    // const { bidang_studi, jenjang_pendidikan, gelar_akademik, satuan_pendidikan, tahun_masuk, tahun_keluar, nim, mata_kuliah, semester, ipk } = req.body;

    // const riwayat_pendidikan = new RiwayatPendidikan({
    //   bidang_studi,
    //   jenjang_pendidikan,
    //   gelar_akademik,
    //   satuan_pendidikan,
    //   tahun_masuk,
    //   tahun_keluar,
    //   nim,
    //   mata_kuliah,
    //   semester,
    //   ipk,
    // });

    // const savedPendidikan = await riwayat_pendidikan.save();

    // const { nama_anak, status, jenjang_pendidikan_anak, nisn, tahun_masuk_anak, jk_anak, tempat_lahir_anak, tanggal_lahir_anak } = req.body;

    // const isAnak = new Anak({
    //   nama_anak,
    //   status,
    //   jenjang_pendidikan_anak,
    //   nisn,
    //   tahun_masuk_anak,
    //   jk_anak,
    //   tempat_lahir_anak,
    //   tanggal_lahir_anak,
    // });

    // const saveAnak = await isAnak.save();

    // const { jenis_beasiswa, keterangan, tahun_mulai, tahun_akhir, masih_menerima } = req.body;

    // const beasiswa = new Beasiswa({
    //   jenis_beasiswa,
    //   keterangan,
    //   tahun_mulai,
    //   tahun_akhir,
    //   masih_menerima,
    // });

    // const saveBeasiswa = await beasiswa.save();

    // const { jenis_sertifikasi, no_sertifikasi, no_reg, no_peserta } = req.body;

    // const sertifikasi = new Sertifikasi({
    //   jenis_sertifikasi,
    //   no_sertifikasi,
    //   no_reg,
    //   no_peserta,
    // });

    // const saveSertifikasi = await sertifikasi.save();

    // const { jenis_diklat, nama_diklat, penyelenggara, tahun_diklat, peran, tingkat_diklat, berapa_jam, sertifikat } = req.body;

    // const diklat = new Diklat({
    //   jenis_diklat,
    //   nama_diklat,
    //   penyelenggara,
    //   tahun_diklat,
    //   peran,
    //   tingkat_diklat,
    //   berapa_jam,
    //   sertifikat,
    // });

    // const saveDiklat = await diklat.save();

    // const { lisensi_kepsek, keahliah_lab } = req.body;

    res.status(201).json({
      message: "Berhasil Menambahkan GTK",
      Gtk: savedGtk,
      // Pendidikan: savedPendidikan,
      // Anak: saveAnak,
      // Beasiswa: saveBeasiswa,
      // Diklat: saveDiklat,
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
