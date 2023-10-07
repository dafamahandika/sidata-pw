import Gtk from "../models/Gtk/Gtk.js";
import Kepegawaian from "../models/Gtk/Kepegawaian.js";
import StatusKepegawaian from "../models/Gtk/StatusKepegawaian.js";
import JenisPtk from "../models/Gtk/JenisPtk.js";

export const getGtk = async (req, res) => {
  try {
    const gtk = await Gtk.find();
    if (!gtk) {
      return res.status(404).json({ message: "Tidak Ada Data GTK" });
    }
    res.status(200).json({
      message: "Succes",
      data: gtk,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
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

    const { nip, niy, nuptk, sumber_gaji } = req.body;

    const gtk_id = savedGtk._id;
    const status_kepegawaian_id = req.body.status_kepegawaian_id;
    const jenis_ptk_id = req.body.jenis_ptk_id;

    const kepegawaian = new Kepegawaian({
      gtk_id: gtk_id,
      status_kepegawaian_id: status_kepegawaian_id,
      jenis_ptk_id: jenis_ptk_id,
      nip: nip,
      niy: niy,
      nuptk: nuptk,
      sumber_gaji: sumber_gaji,
    });

    const savedKepegawaian = await kepegawaian.save();

    res.status(201).json({
      message: "Berhasil Menambahkan GTK",
      savedGtk,
      savedKepegawaian,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Gagal" });
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
