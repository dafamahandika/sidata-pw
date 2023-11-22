import Family from "../models/Student/Family.js";
import Dokumen from "../models/Student/Dokumen.js";
import Student from "../models/Student/Student.js";
import Rombel from "../models/Student/Rombel.js";
import Rayon from "../models/Student/Rayon.js";
import User from "../models/User.js";
import argon2 from "argon2";

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

export const getOneRayon = async (req, res) => {
  try {
    const { id } = req.params;
    const rayon = await Rayon.findById(id)
      .populate({
        path: "pembimbing_id",
        model: "User",
      })
      .lean();

    if (!rayon) {
      console.log(rayon);
      return res.status(404).json({
        message: "Data Rayon Not Found",
      });
    }

    res.status(200).json({
      message: "Get One Rayon Success",
      rayon: rayon,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Get One Rayon Failed",
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

    const user = await User.findByIdAndDelete(pembimbing_id);
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

    const { email, nama, rombel, rayon, nis, jk } = req.body;

    const hashedPassword = await argon2.hash(nis);

    const existingStudent = await Student.findOne({ nis });

    if (existingStudent) {
      return res.status(500).json({
        message: "Student Sudah Terdaftar",
      });
    }
    const user = new User({
      username: nis,
      password: hashedPassword,
      email: email,
      role: "student",
    });

    const savedUser = await user.save();

    const student = new Student({
      keluarga_id: savedFamily._id,
      user_id: savedUser._id,
      nama: nama,
      rombel: rombel,
      rayon: rayon,
      nis: nis,
      jk: jk,
      email: email,
    });

    const savedStudent = await student.save();

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
    const students = await Student.find()
      .populate([
        { path: "keluarga_id", model: "Family" },
        { path: "dokumen_id", model: "Dokumen" },
      ])
      .lean();
    if (!students) {
      console.log(students);
      return res.status(404).json({
        message: "Data Student is Empty",
      });
    }

    res.status(200).json({
      message: "Success To Get Data Student",
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

export const getOneStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id)
      .populate([
        { path: "dokumen_id", model: "Dokumen" },
        { path: "keluarga_id", model: "Family" },
        { path: "user_id", model: "User" },
      ])
      .lean();

    if (!student) {
      console.log(student);
      return res.status(404).json({
        message: "Data Student Not Found",
      });
    }
    res.status(200).json({
      message: "Success to Get One Student",
      student: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Failed to Get One Student",
    });
  }
};

export const getOneStudentLogin = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ user_id: id })
      .populate([
        { path: "dokumen_id", model: "Dokumen" },
        { path: "keluarga_id", model: "Family" },
        { path: "user_id", model: "User" },
      ])
      .lean();

    if (!student) {
      console.log(student);
      return res.status(404).json({
        message: "Student Not Found",
      });
    }

    res.status(200).json({
      message: "Get Data Success",
      student: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Get Data Failed",
      error: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    const family_id = student.keluarga_id;

    if (!student) {
      console.log(student);
      return res.status(404).json({
        message: "Data Student Not Found",
      });
    }

    const updateStudent = {
      nama: req.body.nama,
      rombel: req.body.rombel,
      rayon: req.body.rayon,
      nis: req.body.nis,
      jk: req.body.jk,
      email: req.body.email,
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
    const resultStudent = await Student.findByIdAndUpdate(id, updateStudent, {
      new: true,
    });

    if (!resultStudent) {
      console.log(resultStudent);
      return res.status(404).json({
        message: "Data Student Not Found",
      });
    }

    const updatedFamily = {
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

    const resultFamily = await Family.findByIdAndUpdate(family_id, updatedFamily, {
      new: true,
    });

    if (!resultFamily) {
      console.log(resultFamily);
      return res.status(404).json({
        message: "Data Family Not Found",
      });
    }
    res.status(201).json({
      message: "Berhasil Update Data Student",
      student: resultStudent,
      family: resultFamily,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Update Data Student",
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      console.log(student);
      return res.status(404).json({
        message: "Data Student Not Found",
      });
    }

    const family_id = student.keluarga_id;
    const dokumen_id = student.dokumen_id;
    const nis = student.nis;

    const deleteFamily = await Family.findByIdAndDelete(family_id);
    const deleteDokumen = await Dokumen.findByIdAndDelete(dokumen_id);
    const deleteAcc = await User.findOneAndDelete({ username: nis });
    const deleteStudent = await Student.findByIdAndDelete(id);

    res.status(200).json({
      message: "Berhasil Menghapus Data Student",
      student: deleteStudent,
      family: deleteFamily,
      dokumen: deleteDokumen,
      user: deleteAcc,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.massage,
      message: "Gagal Menghapus Data Student",
    });
  }
};

export const uploadFile = async (req, res) => {
  try {
    const { id } = req.params;

    const { ijazah_smp } = req.body;
    const { akte_kelahiran } = req.body;
    const { skhun } = req.body;
    const { kk } = req.body;

    const result = await Dokumen.create({
      ijazah_smp: ijazah_smp,
      akte_kelahiran: akte_kelahiran,
      skhun: skhun,
      kk: kk,
    });

    const student = await Student.findById(id);

    if (!student) {
      console.log(student);
      return res.status(404).json({
        message: "Data Student Not Found",
      });
    }

    await student.updateOne({
      dokumen_id: result._id,
    });

    return res.status(200).json({
      message: "Behasil",
      data: result,
      dokumen_id: result._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

export const verifikasiData = async (req, res) => {
  try {
    const { id } = req.params;

    const verifikasi = {
      status_data_diri: "Verifikasi",
    };

    const updateStatus = await Student.findByIdAndUpdate(id, verifikasi, {
      new: true,
    });

    res.status(200).json({
      message: "Berhasil Verifikasi",
      status: updateStatus.status_data_diri,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Verifikasi",
    });
  }
};

export const verifikasiFamily = async (req, res) => {
  try {
    const { id } = req.params;
    const verifikasi = {
      status_data_family: "Verifikasi",
    };

    const updateStatus = await Student.findByIdAndUpdate(id, verifikasi, {
      new: true,
    });

    res.status(200).json({
      message: "Berhasil Verifikasi",
      status: updateStatus.status_data_family,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Verifikasi",
    });
  }
};

export const verifikasiDokumen = async (req, res) => {
  try {
    const { id } = req.params;
    const verifikasi = {
      status_data_dokumen: "Verifikasi",
    };

    const updateStatus = await Student.findByIdAndUpdate(id, verifikasi, {
      new: true,
    });

    res.status(200).json({
      message: "Berhasil Verifikasi",
      status: updateStatus.status_data_dokumen,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Gagal Verifikasi",
    });
  }
};
