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

export const getStatus = async (req, res) => {
  try {
    const statusKepegawaian = await StatusKepegawaian.find();

    if (!statusKepegawaian) {
      return res.status(404).json({ message: "Data Status Kepegawaian Not Found" });
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
    const kepegawaian = await Kepegawaian.find()
      .populate({
        path: "gtk_id",
        model: "Gtk",
        // populate: [{ path: "gtk_id", model: "RiwayatPendidikan" }],
        // populate: [
        //   { path: "status_kepegawaian_id", model: "StatusKepegawaian" },
        //   { path: "jenis_ptk_id", model: "JenisPtk" },
        // ],
      })
      .lean();
    if (!kepegawaian) {
      return res.status(404).json({ message: "Tidak Ada Data GTK" });
    }
    // const result = kepegawaian.map((data) => {
    //   const gtk = data.gtk_id;
    //   // const status_kepegawaian = data.status_kepegawaian_id.jenis_status;
    //   // const jenis_ptk = data.jenis_ptk_id.jenis_ptk;
    //   return {
    //     ...gtk,
    //     status_kepegawaian: status_kepegawaian_id,
    //     jenis_ptk: jenis_ptk_id,
    //     nip: nip,
    //     niy: niy,
    //     nuptk: nuptk,
    //     sumber_gaji: sumber_gaji,
    //   };
    // });
    res.status(200).json({
      message: "Succes",
      data: kepegawaian,
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

    const { status_kepegawaian, jenis_ptk, nip, niy, nuptk, sumber_gaji } = req.body;

    const gtk_id = savedGtk._id;

    const kepegawaian = new Kepegawaian({
      gtk_id: gtk_id,
      status_kepegawaian,
      jenis_ptk,
      nip,
      niy,
      nuptk,
      sumber_gaji,
    });

    const savedKepegawaian = await kepegawaian.save();

    const { bidang_studi, jenjang_pendidikan, gelar_akademik, satuan_pendidikan, tahun_masuk, tahun_keluar, nim, mata_kuliah, semester, ipk } = req.body;

    const riwayat_pendidikan = new RiwayatPendidikan({
      gtk_id: gtk_id,
      bidang_studi,
      jenjang_pendidikan,
      gelar_akademik,
      satuan_pendidikan,
      tahun_masuk,
      tahun_keluar,
      nim,
      mata_kuliah,
      semester,
      ipk,
    });

    const savedPendidikan = await riwayat_pendidikan.save();

    res.status(201).json({
      message: "Berhasil Menambahkan GTK",
      Gtk: savedGtk,
      Kepegawaian: savedKepegawaian,
      Pendidikan: savedPendidikan,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Gagal Menambahkan Data" });
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
      message: "Error",
    });
  }
};
