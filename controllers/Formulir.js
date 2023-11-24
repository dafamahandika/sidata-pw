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
    const { nama_rayon, nama_pembimbing, nip, email, nik, jk, tempat_lahir, tanggal_lahir, agama, no_telp, npwp, no_kk, nama_wajib_pajak } = req.body;

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
      npwp: npwp,
      no_kk: no_kk,
      nama_wajib_pajak: nama_wajib_pajak,
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
    const dataRayonArray = await Rayon.find().populate({ path: "pembimbing_id", model: "User" }).lean();
    const dataRayon = dataRayonArray.reduce((acc, curr) => {
      acc[curr._id] = curr;
      return acc;
    }, {});

    if (!dataRayonArray.length) {
      console.log(dataRayonArray);
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
    const rombelArray = await Rombel.find().lean();

    const rombel = rombelArray.reduce((acc, curr) => {
      acc[curr._id] = curr;
      return acc;
    }, {});

    if (!rombelArray.length) {
      console.log(rombelArray);
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
      username: nama,
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
      status_data_diri: req.body.status_data_diri,
      status_data_family: req.body.status_data_family,
      status_data_dokumen: req.body.status_data_dokumen,
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

// export const uploadFile = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // const { ijazah_smp } = req.file;
//     // const { akte_kelahiran } = req.file;
//     // const { skhun } = req.file;
//     // const { kk } = req.file;

//     // const result = await Dokumen.create({
//     //   ijazah_smp,
//     //   akte_kelahiran,
//     //   skhun,
//     //   kk,
//     // });

//     let ijazah_smp = [];
//     let akte_kelahiran = [];
//     let skhun = [];
//     let kk = [];

//     if (req.files) {
//       if (req.files && req.files["ijazah_smp"]) {
//         req.files["ijazah_smp"].forEach((file) => {
//           const filePath = `${file.filename}`;
//           ijazah_smp.push(filePath);
//         });
//       }

//       if (req.files && req.files["akte_kelahiran"]) {
//         req.files["akte_kelahiran"].forEach((file) => {
//           const filePath = `${file.filename}`;
//           akte_kelahiran.push(filePath);
//         });
//       }

//       if (req.files && req.files["skhun"]) {
//         req.files["skhun"].forEach((file) => {
//           const filePath = `${file.filename}`;
//           skhun.push(filePath);
//         });
//       }

//       if (req.files && req.files["kk"]) {
//         req.files["kk"].forEach((file) => {
//           const filePath = `${file.filename}`;
//           kk.push(filePath);
//         });
//       }
//     }

//     const result = await Dokumen.create({
//       ijazah_smp: ijazah_smp,
//       akte_kelahiran: akte_kelahiran,
//       skhun: skhun,
//       kk: kk,
//     });

//     const student = await Student.findById(id);

//     if (!student) {
//       console.log(student);
//       return res.status(404).json({
//         message: "Data Student Not Found",
//       });
//     }

//     await student.updateOne({
//       dokumen_id: result._id,
//     });

//     return res.status(200).json({
//       message: "Behasil",
//       data: result,
//       dokumen_id: student.dokumen_id,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error" });
//   }
// };

// export const uploadMiddleware = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//       cb(
//         null,
//         file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//       );
//     },
//   }),
//   limits: { fileSize: 10000000000 }, // 10 GB limit
// }).fields([
//   { name: "documentIjazah", maxCount: 1 },
//   { name: "documentAkte", maxCount: 1 },
//   { name: "documentSkhun", maxCount: 1 },
//   { name: "documentKk", maxCount: 1 },
// ]);

// export const uploadImage = async (req, res) => {
//   try {
//     const { id } = req.params;

//     uploadMiddleware(req, res, async (err) => {
//       if (err) {
//         return res.status(500).json({ message: err.message });
//       }

//       const newImages = {};

//       // Iterate over the fields and map the paths of the uploaded files
//       Object.keys(req.files).forEach((field) => {
//         newImages[field] = req.files[field].map((file) => file.path);
//       });

//       console.log(req.files);

//       const student = await Student.findById(id);

//       if (!student) {
//         return res.status(404).json({
//           message: "Data Student Not Found",
//         });
//       }

//       try {
//         const images = await Dokumen.create(newImages);

//         // Create a response object with the desired structure
//         const response = {
//           message: "Files uploaded successfully",
//           documents: {
//             documentIjazah: images.documentIjazah || [],
//             documentAkte: images.documentAkte || [],
//             documentSkhun: images.documentSkhun || [],
//             documentKk: images.documentKk || [],
//             _id: images._id,
//             __v: images.__v,
//           },
//           dokumen_id: images._id,
//         };

//         return res.json(response);
//       } catch (error) {
//         return res.status(500).json({ message: error.message });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Multer middleware for handling multiple files
const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 17000000000000 }, // Adjust the limit as needed
}).fields([
  { name: "documentIjazah", maxCount: 1 },
  { name: "documentAkte", maxCount: 1 },
  { name: "documentSkhun", maxCount: 1 },
  { name: "documentKk", maxCount: 1 },
]);

console.log(uploadMiddleware);

export const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;

    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const { documentIjazah, documentAkte, documentSkhun, documentKk } = req.files;

      console.log(req.files);
      try {
        const student = await Student.findById(id);

        if (!student) {
          return res.status(404).json({
            message: "Data Student Not Found",
          });
        }

        const newImages = {
          documentIjazah: documentIjazah ? documentIjazah.map((file) => file.path) : [],
          documentAkte: documentAkte ? documentAkte.map((file) => file.path) : [],
          documentSkhun: documentSkhun ? documentSkhun.map((file) => file.path) : [],
          documentKk: documentKk ? documentKk.map((file) => file.path) : [],
        };

        const images = await Dokumen.create(newImages);

        // Update student with the new document ID
        await Student.updateOne({ _id: id }, { dokumen_id: images._id });

        const response = {
          message: "Files uploaded successfully",
          documents: {
            _id: images._id,
            __v: images.__v,
          },
          dokumen_id: images._id,
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
    const oldestStudent = await Student.findOne({ isDeleted: false }, {}, { sort: { tahun_ajaran: 1 } });
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
