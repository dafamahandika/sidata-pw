import Gtk from "../models/Gtk/Gtk.js";
import Kepegawaian from "../models/Gtk/Kepegawaian.js";
import StatusKepegawaian from "../models/Gtk/StatusKepegawaian.js";
import JenisPtk from "../models/Gtk/JenisPtk.js";

export const createStatus = async (res, req) => {
  try {
    const { jenis_status } = req.body;
    const status = new StatusKepegawaian({
      jenis_status: jenis_status,
    });

    const savedStatus = await status.save();

    res.status(200).json({
      massage: "Berhasil Menambahkan Status Pegawai",
      savedStatus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      massage: "Error",
    });
  }
};

export const createJenis = async (res, req) => {
  try {
    const { jenis_ptk } = req.body;
    const jenis = new JenisPtk({
      jenis_ptk: jenis_ptk,
    });

    const savedJenis = await jenis.save();

    res.status(200).json({
      massage: "Berhasil Menambahkan Jenis PTK",
      savedJenis,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      massage: "Error",
    });
  }
};
