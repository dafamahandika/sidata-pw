import Family from "../models/Student/Family.js";
import Dokumen from "../models/Student/Dokumen.js";
import Student from "../models/Student/Student.js";
import Rombel from "../models/Student/Rombel.js";
import Rayon from "../models/Student/Rayon.js";
import User from "../models/User.js";
import Gtk from "../models/Gtk/Gtk.js";
import path from "path";
import multer from "multer";
import argon2 from "argon2";

export const createRayon = async (req, res) => {
  try {
    const {
      nama_rayon,
      nama_pembimbing,
      nip,
      email,
      nik,
      jk,
      tempat_lahir,
      tanggal_lahir,
      agama,
      no_telp,
    } = req.body;

    const hashedNip = await argon2.hash(nip);

    const accPembimbing = new User({
      username: nama_pembimbing,
      email: email,
      password: hashedNip,
      role: "guru",
    });

    const savedAccPemb = await accPembimbing.save();

    const rayon = new Rayon({
      pembimbing_id: savedAccPemb._id,
      nama_rayon: nama_rayon,
      nama_pembimbing: nama_pembimbing,
    });

    const savedRayon = await rayon.save();

    const gtk = new Gtk({
      user_id: savedAccPemb._id,
      nama_lengkap: nama_pembimbing,
      nik: nik,
      jk: jk,
      tempat_lahir: tempat_lahir,
      tanggal_lahir: tanggal_lahir,
      agama: agama,
      no_telp: no_telp,
      email: email,
      nip: nip,
    });

    const savedGtk = await gtk.save();
    res.status(200).json({
      massage: "success",
      rayon: savedRayon,
      acc: savedAccPemb._id,
      gtk: savedGtk,
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
    const dataRayon = await Rayon.find()
      .populate({ path: "pembimbing_id", model: "User" })
      .lean();

    res.status(200).json({
      message: "Success Get Data Rayon",
      rayon: dataRayon,
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

    const resultAccPemb = await User.findByIdAndUpdate(
      pembimbing_id,
      updateAccPemb,
      {
        new: true,
      }
    );

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

    const deleteUser = await User.findByIdAndDelete(pembimbing_id);
    const deletedRayon = await Rayon.findByIdAndDelete(id);

    if (!deletedRayon) {
      return res.status(404).json({ message: "Data Not Found" });
    }

    return res.status(200).json({
      message: "Success",
      deleteUser,
      deletedRayon,
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
    const rombel = await Rombel.find().lean();
    if (!rombel) {
      console.log(rombel);
      return res.status(404).json({
        message: "Data Rombel Not Found",
      });
    }

    res.status(200).json({
      message: "Success Get Data Rombel",
      rombel: rombel,
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
    const { email, nama, rombel, rayon, nis, jk } = req.body;

    const hashedPassword = await argon2.hash(nis);

    const existingStudent = await Student.findOne({ nis });

    if (existingStudent) {
      return res.status(500).json({
        message: "Student Sudah Terdaftar",
      });
    }
    const user = new User({
      username: nama,
      password: hashedPassword,
      email: email,
      role: "student",
    });

    const savedUser = await user.save();

    const student = new Student({
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

    const resultFamily = new Family({ ...formFamily });

    const savedFamily = await resultFamily.save();

    if (!savedFamily) {
      console.log(savedFamily);
      return res.status(404).json({
        message: "Error",
      });
    }
    const updateStudent = {
      family_id: savedFamily._id,
      nama: req.body.nama,
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
      tahun_ajaran: req.body.tahun_ajaran,
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

    res.status(201).json({
      message: "Berhasil Update Data Student",
      student: resultStudent,
      family: savedFamily,
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
    const user_id = student.user_id;

    const deleteFamily = await Family.findByIdAndDelete(family_id);
    const deleteDokumen = await Dokumen.findByIdAndDelete(dokumen_id);
    const deleteAcc = await User.findByIdAndDelete(user_id);
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/students");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const multipleUpload = upload.fields([
  { name: "documentIjazah", maxCount: 1 },
  { name: "documentAkte", maxCount: 1 },
  { name: "documentSkhun", maxCount: 1 },
  { name: "documentKk", maxCount: 1 },
]);

console.log(multipleUpload);

export const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;

    multipleUpload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      try {
        const { documentIjazah, documentAkte, documentSkhun, documentKk } =
          req.files;

        if (!documentIjazah || !documentAkte || !documentSkhun || !documentKk) {
          return res
            .status(400)
            .json({ message: "All documents are required" });
        }

        const student = await Student.findById(id);

        if (!student) {
          return res.status(404).json({
            message: "Data Student Not Found",
          });
        }

        const dokumenId = new Dokumen({
          documentIjazah: documentIjazah[0].path,
          documentAkte: documentAkte[0].path,
          documentSkhun: documentSkhun[0].path,
          documentKk: documentKk[0].path,
        });

        const savedDokumenId = await dokumenId.save();

        await Student.updateOne({ _id: id }, { dokumen_id: id });

        const response = {
          message: "Files uploaded successfully",
          documents: {
            documentIjazah: savedDokumenId.documentIjazah,
            documentAkte: savedDokumenId.documentAkte,
            documentSkhun: savedDokumenId.documentSkhun,
            documentKk: savedDokumenId.documentKk,
          },
          dokumen_id: savedDokumenId._id,
        };

        return res.json(response);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
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

export const addNewTahunAjran = async (req, res) => {
  const { newTahunAjaran } = req.body;

  try {
    const oldestStudent = await Student.findOne(
      { isDeleted: false },
      {},
      { sort: { tahun_ajaran: 1 } }
    );
    if (oldestStudent) {
      oldestStudent.isDeleted = true;
      await oldestStudent.save();
    }
    const newStudent = new Student({
      tahun_ajaran: newTahunAjaran,
    });
    await newStudent.save();

    return res.json({ message: "New tahun ajaran added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const isCountStudentsWithMissingData = async (req, res) => {
  try {
    const { rayonName } = req.params;

    const studentsData = await Student.find({
      rayon: rayonName,
      nama: { $nin: [null, ""] },
    });

    const requiredFields = [
      "status_data_diri",
      "status_data_family",
      "status_data_dokumen",
      "tahun_ajaran",
      "isDeleted",
      "_id",
      "keluarga_id",
      "dokumen_id",
      "nama",
      "nis",
      "jk",
      "rombel",
      "rayon",
      "nisn",
      "nik",
      "no_kk",
      "tempat_lahir",
      "tanggal_lahir",
      "no_akta",
      "agama",
      "kewarganegaraan",
      "alamat",
      "rt",
      "rw",
      "nama_dusun",
      "kecamatan",
      "nama_kota",
      "provinsi",
      "kode_pos",
      "transportasi",
      "anak_ke",
      "tinggal_bersama",
      "email",
      "no_telp",
      "tb",
      "bb",
      "gol_darah",
      "status",
      "asal_smp",
      "no_ijazah_smp",
      "skhun",
      "no_un",
    ];

    const incompleteDataStudents = studentsData.filter((student) =>
      requiredFields.some(
        (field) => student[field] === null || student[field] === undefined
      )
    );

    const incompleteDataCount = incompleteDataStudents.length;

    if (incompleteDataCount > 0) {
      const incompleteDataDetails = incompleteDataStudents.map((student) => {
        const missingFields = requiredFields.filter(
          (field) => student[field] === null || student[field] === undefined
        );
        return {
          _id: student._id,
          nama: student.nama,
          data_yang_belum: missingFields,
        };
      });

      return res.status(200).json({
        message: "Data Masih Kurang",
        totalStudents: studentsData.length,
        incompleteDataCount,
        students: incompleteDataDetails,
      });
    } else {
      return res.status(200).json({
        message: "Data Sudah",
        totalStudents: studentsData.length,
        incompleteDataCount: 0,
        students: studentsData,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Count and Fetch Failed",
      error: error.message,
    });
  }
};

export const isCountStudensCompleteData = async (req, res) => {
  try {
    const { rayonName } = req.params;

    const totalStudents = await Student.countDocuments({ rayon: rayonName });

    const studentsData = await Student.find({
      rayon: rayonName,
      nama: { $nin: [null, ""] },
    });

    const studentsWithCompleteData = studentsData.filter(
      (student) =>
        student.dokumen_id !== null &&
        student.keluarga_id !== null &&
        student.user_id !== null
    );

    const countStudentsWithCompleteData = studentsWithCompleteData.length;

    if (countStudentsWithCompleteData > 0) {
      const completeDataFields = studentsWithCompleteData.map((student) => {
        return {
          _id: student._id,
          nama: student.nama,
          user_id: student.keluarga_id,
          keluarga_id: student.keluarga_id,
          dokumen_id: student.keluarga_id,
        };
      });

      return res.status(200).json({
        message: "Students with complete data",
        totalStudents,
        completeData: countStudentsWithCompleteData,
        students: completeDataFields,
      });
    } else {
      return res.status(200).json({
        message: "No students with complete data found",
        totalStudents,
        completeData: 0,
        students: [],
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Count and Fetch Failed",
      error: error.message,
    });
  }
};

export const isNoValidateData = async (req, res) => {
  try {
    const { rayonName } = req.params;

    const totalStudents = await Student.countDocuments({ rayon: rayonName });

    const studentsData = await Student.find({
      rayon: rayonName,
      nama: { $nin: [null, ""] },
    });

    const studentsWithPendingStatus = studentsData.filter(
      (student) =>
        student.status_data_diri === "Pending" ||
        student.status_data_family === "Pending" ||
        student.status_data_dokumen === "Pending"
    );

    const pendingStudentsCount = studentsWithPendingStatus.length;

    if (pendingStudentsCount > 0) {
      const completeDataFields = studentsWithPendingStatus.map((student) => {
        return {
          _id: student._id,
          nama: student.nama,
          status_data_diri: student.status_data_diri,
          status_data_family: student.status_data_family,
          status_data_dokumen: student.status_data_dokumen,
        };
      });

      return res.status(200).json({
        message: "Students with Pending Data",
        totalStudents,
        pendingData: pendingStudentsCount,
        students: completeDataFields,
      });
    } else {
      return res.status(200).json({
        message: "No students with no Pending data found",
        totalStudents,
        completeData: 0,
        students: [],
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Fetch Pending Status Failed",
      error: error.message,
    });
  }
};

export const isValidateData = async (req, res) => {
  try {
    const { rayonName } = req.params;

    const totalStudents = await Student.countDocuments({ rayon: rayonName });

    const studentsData = await Student.find({
      rayon: rayonName,
      nama: { $nin: [null, ""] },
    });

    const studentsWithCompleteData = studentsData.filter(
      (student) =>
        student.status_data_diri !== "Pending" &&
        student.status_data_family !== "Pending" &&
        student.status_data_dokumen !== "Pending"
    );

    const validatedStudentsCount = studentsWithCompleteData.length;

    if (validatedStudentsCount > 0) {
      const completeDataFields = studentsWithCompleteData.map((student) => {
        return {
          _id: student._id,
          nama: student.nama,
          status_data_diri: student.status_data_diri,
          status_data_family: student.status_data_family,
          status_data_dokumen: student.status_data_dokumen,
        };
      });

      return res.status(200).json({
        message: "Students with non-pending status",
        totalStudents,
        validatedStudentsCount,
        students: completeDataFields,
      });
    } else {
      return res.status(200).json({
        message: "No students with pending status found",
        totalStudents,
        validatedStudentsCount: 0,
        students: [],
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Fetch Non-Pending Status Failed",
      error: error.message,
    });
  }
};

export const getUpload = async (req, res) => {
  try {
    const { dokumen_id } = req.params;
    const dokumen = await Dokumen.findById(dokumen_id);

    if (!dokumen) {
      return res.status(404).json({
        message: "Dokumen Not Found",
      });
    }
    const student = await Student.findOne({ dokumen_id });

    if (!student) {
      return res.status(404).json({
        message: "Student Not Found for the specified Dokumen ID",
      });
    }
    const response = {
      message: "Data upload retrieved successfully",
      student_name: student.nama,
      dokumen_id: dokumen._id,
      documents: {
        documentIjazah: dokumen.documentIjazah,
        documentAkte: dokumen.documentAkte,
        documentSkhun: dokumen.documentSkhun,
        documentKk: dokumen.documentKk,
      },
    };

    return res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
