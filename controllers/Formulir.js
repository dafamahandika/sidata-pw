import Family from "../models/Student/Family.js";
import Student from "../models/Student/Student.js";
import Rombel from "../models/Student/Rombel.js";
import Rayon from "../models/Student/Rayon.js";
// import Gtk from "../models/Gtk/Gtk.js";

export const isRayon = async (req, res) => {
  try {
    const { nama_rayon, ruang_rayon } = req.body;

    const rayon = new Rayon({
      nama_rayon: nama_rayon,
      ruang_rayon: ruang_rayon,
    });

    const saveRayon = await rayon.save();

    res.status(200).json({
      massage: "success",
      saveRayon,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "error" });
  }
};

export const getRayon = async (req, res) => {
  try {
    const dataRayon = await Rayon.find();
    if (!dataRayon) {
      console.log(dataRayon);
      return res.status(404).json({
        message: "Data Rayon Not Found",
      });
    }

    res.status(200).json({
      rayon: dataRayon,
      message: "Success Get Data Rayon",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: error.message,
      message: "Failed Get Data Rayon",
    });
  }
};

export const updateRayon = async (req, res) => {
  try {
    const { id } = req.params;
    const updateDataRayon = req.body;
    const result = await Rayon.findByIdAndUpdate(id, updateDataRayon, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Data Tidak Ditemukan" });
    }

    return res.status(200).json({
      message: "Success",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed", error: error });
  }
};

export const deleteRayon = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Rayon.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Data Tidak Ditemukan" });
    }

    return res.status(200).json({
      message: "Success",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed", error: error });
  }
};

export const isRombel = async (req, res) => {
  try {
    const { nama_rombel, tingkat, tahun_ajaran } = req.body;

    const rombel = new Rombel({
      nama_rombel: nama_rombel,
      tingkat: tingkat,
      tahun_ajaran: tahun_ajaran,
    });

    const saveRombel = await rombel.save();

    res.status(200).json({ massage: "success", saveRombel });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "error" });
  }
};

export const updateRombel = async (req, res) => {
  try {
    const { id } = req.params;
    const updateDataRombel = req.body;
    const result = await Rombel.findByIdAndUpdate(id, updateDataRombel, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Data Tidak Ditemukan" });
    }

    return res.status(200).json({
      message: "Success",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed", error: error });
  }
};

export const deleteRombel = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Rombel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Data Tidak Ditemukan" });
    }

    return res.status(200).json({
      message: "Success",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed", error: error });
  }
};

export const getRombel = async (req, res) => {
  try {
    const rombel = await Rombel.find();
    if (!rombel) {
      console.log(rombel);
      return res.status(404).json({
        message: "Data Rombel Not Found",
      });
    }

    res.status(200).json({
      rombel: rombel,
      message: "Success Get Data Rombel",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: error.message,
      message: "Failed Get Data Rombel",
    });
  }
};

export const getOnlyGty = async (req, res) => {
  try {
    const dataGtk = await Gtk.find().populate({
      path: "kepegawaian_id",
      model: "Kepegawaian",
    });

    const onlyGty = dataGtk.find({
      status_kepegawaian: "GTY/PTY ",
    });

    if (!onlyGty) {
      console.log(onlyGty);
      return res.status(404).json({
        message: "Data onlyGty Not Found",
      });
    }

    res.status(200).json({
      message: "Get Data onlyGty Success ",
      only_gty: onlyGty,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: error.message,
      message: "Get Data onlyGty Failed",
    });
  }
};

export const studentCreate = async (req, res) => {
  try {
    const rayonId = req.body.rayon_id;
    const rayon = await Rayon.findById(rayonId);
    if (!rayon) {
      return res.status(404).json({ message: "Rayon tidak ditemukan" });
    }

    const rayonData = await Rayon.findById(rayonId);
    if (!rayonData) {
      return res.status(404).json({ message: "Rayon tidak ditemukan" });
    }

    const nama_rayon = rayonData.nama_rayon;

    const rombelId = req.body.rombel_id;

    const rombel = await Rombel.findById(rombelId);
    if (!rombel) {
      return res.status(404).json({ message: "Rombel tidak ditemukan" });
    }

    const rombelData = await Rombel.findById(rombelId);

    if (!rombelData) {
      return res.status(404).json({ message: "Rombel tidak ditemukan" });
    }

    const nama_rombel = rombelData.nama_rombel;

    const {
      nama,
      jk,
      nisn,
      nik,
      no_kk,
      tempat_lahir,
      no_akta,
      agama,
      kewarganegaraan,
      alamat,
      rt,
      rw,
      nama_dusun,
      kecamatan,
      nama_kota,
      provinsi,
      kode_pos,
      transportasi,
      anak_ke,
      tinggal_bersama,
      email,
      no_telp,
      tb,
      bb,
      gol_darah,
    } = req.body;

    const date = req.body.tanggal_lahir;
    const resultDate = new Date(date);
    // const date = new Date();
    // const tanggal_lahir = date.setHours(date.getHours() + 7);

    const newForm = new Student({
      rayon_id: rayonId,
      rombel_id: rombelId,
      nama: nama,
      jk: jk,
      nisn: nisn,
      nik: nik,
      no_kk: no_kk,
      tempat_lahir: tempat_lahir,
      tanggal_lahir: resultDate,
      no_akta: no_akta,
      agama: agama,
      kewarganegaraan: kewarganegaraan,
      alamat: alamat,
      rt: rt,
      rw: rw,
      nama_dusun: nama_dusun,
      kecamatan: kecamatan,
      nama_kota: nama_kota,
      provinsi: provinsi,
      kode_pos: kode_pos,
      transportasi: transportasi,
      anak_ke: anak_ke,
      tinggal_bersama: tinggal_bersama,
      email: email,
      no_telp: no_telp,
      tb: tb,
      bb: bb,
      gol_darah: gol_darah,
      nama_rombel: nama_rombel,
      nama_rayon: nama_rayon,
      createdAt: date,
    });

    const savedForm = await newForm.save();

    const {
      nama_ayah,
      nik_ayah,
      pendidikan_ayah,
      pekerjaan_ayah,
      penghasilan_ayah,
      nama_ibu,
      nik_ibu,
      pendidikan_ibu,
      pekerjaan_ibu,
      penghasilan_ibu,
      nama_wali,
      nik_wali,
      pendidikan_wali,
      pekerjaan_wali,
      penghasilan_wali,
    } = req.body;

    // const isResultDate = req.body;
    // const isDate = new Date(isResultDate);

    const newFamily = new Family({
      student_id: savedForm._id,
      nama_ayah: nama_ayah,
      nik_ayah: nik_ayah,
      tanggal_lahir_ayah: resultDate,
      pendidikan_ayah: pendidikan_ayah,
      pekerjaan_ayah: pekerjaan_ayah,
      penghasilan_ayah: penghasilan_ayah,
      nama_ibu: nama_ibu,
      nik_ibu: nik_ibu,
      tanggal_lahir_ibu: resultDate,
      pendidikan_ibu: pendidikan_ibu,
      pekerjaan_ibu: pekerjaan_ibu,
      penghasilan_ibu: penghasilan_ibu,
      nama_wali: nama_wali,
      nik_wali: nik_wali,
      tanggal_lahir_wali: resultDate,
      pendidikan_wali: pendidikan_wali,
      pekerjaan_wali: pekerjaan_wali,
      penghasilan_wali: penghasilan_wali,
    });

    const savedFamily = await newFamily.save();

    res.status(201).json({
      message: "Formulir created successfully",
      savedForm,
      savedFamily,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Gagal" });
  }
};

// Untuk Menampilkan semua data yang ada di database
export const reaData = async (req, res) => {
  try {
    const families = await Family.find()
      .populate({
        path: "student_id",
        model: "Student",
        populate: [
          { path: "rombel_id", model: "Rombel" },
          { path: "rayon_id", model: "Rayon" },
        ],
      })
      // .populate({
      //   path: "guru_id",
      //   model: "Gtk",
      // })
      .lean();

    const result = families.map((family) => {
      const student = family.student_id;

      const rombelId = student.rombel_id ? student.rombel_id._id : null;
      const rayonId = student.rayon_id ? student.rayon_id._id : null;

      return {
        ...student,
        rombel_id: rombelId,
        nama_rombel: student.rombel_id ? student.rombel_id.nama_rombel : null,
        tingkat: student.rombel_id ? student.rombel_id.tingkat : null,
        tahun_ajaran: student.rombel_id ? student.rombel_id.tahun_ajaran : null,
        rayon_id: rayonId,
        nama_rayon: student.rayon_id ? student.rayon_id.nama_rayon : null,
        ruang_rayon: student.rayon_id ? student.rayon_id.ruang_rayon : null,
        nama_ayah: family.nama_ayah,
        nik_ayah: family.nik_ayah,
        tanggal_lahir_ayah: family.tanggal_lahir_ayah,
        pendidikan_ayah: family.pendidikan_ayah,
        pekerjaan_ayah: family.pekerjaan_ayah,
        penghasilan_ayah: family.penghasilan_ayah,
        nama_ibu: family.nama_ibu,
        nik_ibu: family.nik_ibu,
        tanggal_lahir_ibu: family.tanggal_lahir_ibu,
        pendidikan_ibu: family.pendidikan_ibu,
        pekerjaan_ibu: family.pekerjaan_ibu,
        penghasilan_ibu: family.penghasilan_ibu,
        nama_wali: family.nama_wali,
        nik_wali: family.nik_wali,
        tanggal_lahir_wali: family.tanggal_lahir_wali,
        pendidikan_wali: family.pendidikan_wali,
        pekerjaan_wali: family.pekerjaan_wali,
        penghasilan_wali: family.penghasilan_wali,
      };
    });

    res.status(200).json({
      message: "Success",
      families: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update data per Id
export const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedFamily = await Family.findByIdAndUpdate(id, updatedData, {
      new: true,
    })
      .populate("student_id")
      .lean();

    if (!updatedFamily) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json({
      message: "Success",
      family: {
        ...updatedFamily.student_id,
        nama_ayah: updatedFamily.nama_ayah,
        nik_ayah: updatedFamily.nik_ayah,
        tanggal_lahir_ayah: updatedFamily.tanggal_lahir_ayah,
        pendidikan_ayah: updatedFamily.pendidikan_ayah,
        pekerjaan_ayah: updatedFamily.pekerjaan_ayah,
        penghasilan_ayah: updatedFamily.penghasilan_ayah,
        nama_ibu: updatedFamily.nama_ibu,
        nik_ibu: updatedFamily.nik_ibu,
        tanggal_lahir_ibu: updatedFamily.tanggal_lahir_ibu,
        pendidikan_ibu: updatedFamily.pendidikan_ibu,
        pekerjaan_ibu: updatedFamily.pekerjaan_ibu,
        penghasilan_ibu: updatedFamily.penghasilan_ibu,
        nama_wali: updatedFamily.nama_wali,
        nik_wali: updatedFamily.nik_wali,
        tanggal_lahir_wali: updatedFamily.tanggal_lahir_wali,
        pendidikan_wali: updatedFamily.pendidikan_wali,
        pekerjaan_wali: updatedFamily.pekerjaan_wali,
        penghasilan_wali: updatedFamily.penghasilan_wali,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete data per Id
export const delData = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFamily = await Family.findByIdAndDelete(id);

    if (!deletedFamily) {
      return res.status(404).json({ message: "Data not found" });
    }

    const deletedStudent = await Student.findByIdAndDelete(
      deletedFamily.student_id
    );

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student data not found" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
