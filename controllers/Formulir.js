import Family from "../models/Student/Family.js";
import Student from "../models/Student/Student.js";
import Rombel from "../models/Student/Rombel.js";
import Rayon from "../models/Student/Rayon.js";
import User from "../models/User.js";
import argon2, { hash } from "argon2";

export const createRayon = async (req, res) => {
  try {
    const { nama_rayon, nama_pembimbing, username, password, email_pembimbing } = req.body;

    const hashedPassword = await argon2.hash(password);

    const accPembimbing = new User({
      username: username,
      email: email_pembimbing,
      password: hashedPassword,
      role: "guru",
    });

    const savedAccPemb = await accPembimbing.save();

    const rayon = new Rayon({
      pembimbing_id: savedAccPemb._id,
      nama_rayon: nama_rayon,
      nama_pembimbing: nama_pembimbing,
    });

    const savedRayon = await rayon.save();

    res.status(200).json({
      massage: "success",
      rayon: savedRayon,
      acc: savedAccPemb._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      massage: "Error",
    });
  }
};

export const getRayon = async (req, res) => {
  try {
    const dataRayon = await Rayon.find().populate({ path: "pembimbing_id", model: "User" }).lean();
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

    const rayon = await Rayon.findById(id);

    const pembimbing_id = rayon.pembimbing_id;

    const updateDataRayon = {
      nama_rayon: req.body.nama_rayon,
      nama_pembimbing: req.body.nama_pembimbing,
    };
    const resultRayon = await Rayon.findByIdAndUpdate(id, updateDataRayon, {
      new: true,
    });

    const password = req.body.password;

    const hashedPassword = await argon2.hash(password);

    const updateAccPemb = {
      username: req.body.username,
      password: hashedPassword,
    };

    const resultAccPemb = await User.findByIdAndUpdate(pembimbing_id, updateAccPemb, {
      new: true,
    });

    res.status(200).json({
      message: "Success",
      resultRayon,
      resultAccPemb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed", error: error.message });
  }
};

export const deleteRayon = async (req, res) => {
  try {
    const { id } = req.params;

    const rayon = await Rayon.findById(id);

    const pembimbing_id = rayon.pembimbing_id;

    const user = await User.findOneAndDelete({ pembimbing_id });
    const result = await Rayon.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Data Not Found" });
    }

    return res.status(200).json({
      message: "Success",
      result,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed", error: error });
  }
};

export const createRombel = async (req, res) => {
  try {
    const { nama_rombel } = req.body;

    const rombel = new Rombel({
      nama_rombel,
    });

    const saveRombel = await rombel.save();

    res.status(200).json({
      massage: "success",
      saveRombel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
      massage: "Error",
    });
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
      return res.status(404).json({ message: "Data Not Found" });
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

export const createStudent = async (req, res) => {
  try {
    const family = new Family();
    const savedFamily = await family.save();

    const { username, password, email, nama, rombel, rayon, nis, jk } = req.body;

    const hashedPassword = await argon2.hash(password);

    const existingStudent = await Student.findOne({ nis });

    if (existingStudent) {
      return res.status(500).json({
        message: "Student Sudah Terdaftar",
      });
    }

    const student = new Student({
      keluarga_id: savedFamily._id,
      nama: nama,
      rombel: rombel,
      rayon: rayon,
      nis: nis,
      jk: jk,
      email: email,
      status: "Pending",
    });

    const savedStudent = await student.save();

    const user = new User({
      username: username,
      password: hashedPassword,
      email: email,
      role: "student",
    });

    const savedUser = await user.save();

    res.status(200).json({
      message: "Berhasil Menambahkan Data Student",
      student: savedStudent,
      family: savedFamily,
      user: savedUser.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Menambahkan Data Student",
    });
  }
};

export const getStudent = async (req, res) => {
  try {
    const students = await Student.find().populate({ path: "keluarga_id", model: "Family" }).lean();
    if (!students) {
      console.log(student);
      return res.status(404).json({
        message: "Data Student is Empty",
      });
    }

    res.status(200).json({
      message: "Succes To Get Data Student",
      students: students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Failed To Get Data Student",
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await findById(id);

    if (!student) {
      console.log(student);
      return res.status(404).json({
        message: "Data Student Not Found",
      });
    }

    const family_id = student.keluarga_id;

    const formStudent = {
      nisn: req.body.nisn,
      nik: req.body.nik,
      no_kk: req.body.no_kk,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      no_akta: req.body.no_akta,
      agama: req.body.agama,
      kewarganegaraan: req.body.kewarganegaraan,
      alamat: req.body.alamat,
      rt: req.body.rt,
      rw: req.body.rw,
      nama_dusun: req.body.nama_dusun,
      kecamatan: req.body.kecamatan,
      nama_kota: req.body.nama_kota,
      provinsi: req.body.provinsi,
      kode_pos: req.body.kode_pos,
      transportasi: req.body.transportasi,
      anak_ke: req.body.anak_ke,
      tinggal_bersama: req.body.tinggal_bersama,
      no_telp: req.body.no_telp,
      tb: req.body.tb,
      bb: req.body.bb,
      gol_darah: req.body.gol_darah,
      asal_smp: req.body.asal_smp,
      no_ijazah_smp: req.body.no_ijazah_smp,
      skhun: req.body.skhun,
      no_un: req.body.no_un,
    };
    const updateStudent = await Student.findByIdAndUpdate(id, formStudent, {
      new: true,
    });

    if (!updateStudent) {
      console.log(updateStudent);
      return res.status(404).json({
        message: "Data Student Not Found",
      });
    }

    const formFamily = {
      nama_ayah: req.body.nama_ayah,
      nik_ayah: req.body.nik_ayah,
      tanggal_lahir_ayah: req.body.tanggal_lahir_ayah,
      pendidikan_ayah: req.body.pendidikan_ayah,
      pekerjaan_ayah: req.body.pekerjaan_ayah,
      penghasilan_ayah: req.body.penghasilan_ayah,
      nama_ibu: req.body.nama_ibu,
      nik_ibu: req.body.nik_ibu,
      tanggal_lahir_ibu: req.body.tanggal_lahir_ibu,
      pendidikan_ibu: req.body.pendidikan_ibu,
      pekerjaan_ibu: req.body.pekerjaan_ibu,
      penghasilan_ibu: req.body.penghasilan_ibu,
      nama_wali: req.body.nama_wali,
      nik_wali: req.body.nik_wali,
      tanggal_lahir_wali: req.body.tanggal_lahir_wali,
      pendidikan_wali: req.body.pendidikan_wali,
      pekerjaan_wali: req.body.pekerjaan_wali,
      penghasilan_wali: req.body.penghasilan_wali,
    };
    const updatedFamily = await Family.findByIdAndUpdate(family_id, formFamily, {
      new: true,
    });

    if (!updatedFamily) {
      console.log(updateStudent);
      return res.status(404).json({
        message: "Data Student Not Found",
      });
    }

    res.status(200).json({
      message: "Berhasil Update Data Student",
      student: updateStudent,
      family: updatedFamily,
    });
  } catch (error) {
    console.loh(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Update Data Student",
    });
  }
};

export const searchStudent = async (req, res) => {
  try {
    const keyword = req.params;
    const student = await Student.find({ nama: keyword });

    if (!student) {
      console.log(student);
      return res.status(404).json({
        message: "Data Student Not Found",
      });
    }

    res.status(200).json({
      student: student,
      message: "Berhasil mencari data student",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal mencari data student",
    });
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

    const deletedStudent = await Student.findByIdAndDelete(deletedFamily.student_id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student data not found" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
