import Family from "../models/Family.js";
import Student from "../models/Student.js";

export const studentCreate = async (req, res) => {
  try {
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
      kode_pos,
      transportasi,
      anak_ke,
      tinggal_bersama,
      email,
      no_telp,
    } = req.body;

    const date = new Date();
    const tanggal_lahir = date.setHours(date.getHours() + 7);

    const newForm = new Student({
      nama: nama,
      jk: jk,
      nisn: nisn,
      nik: nik,
      no_kk: no_kk,
      tempat_lahir: tempat_lahir,
      tanggal_lahir: tanggal_lahir,
      no_akta: no_akta,
      agama: agama,
      kewarganegaraan: kewarganegaraan,
      alamat: alamat,
      rt: rt,
      rw: rw,
      nama_dusun: nama_dusun,
      kecamatan: kecamatan,
      kode_pos: kode_pos,
      transportasi: transportasi,
      anak_ke: anak_ke,
      tinggal_bersama: tinggal_bersama,
      email: email,
      no_telp: no_telp,
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

    const newFamily = new Family({
      student_id: savedForm._id,
      nama_ayah: nama_ayah,
      nik_ayah: nik_ayah,
      tanggal_lahir_ayah: tanggal_lahir,
      pendidikan_ayah: pendidikan_ayah,
      pekerjaan_ayah: pekerjaan_ayah,
      penghasilan_ayah: penghasilan_ayah,
      nama_ibu: nama_ibu,
      nik_ibu: nik_ibu,
      tanggal_lahir_ibu: tanggal_lahir,
      pendidikan_ibu: pendidikan_ibu,
      pekerjaan_ibu: pekerjaan_ibu,
      penghasilan_ibu: penghasilan_ibu,
      nama_wali: nama_wali,
      nik_wali: nik_wali,
      tanggal_lahir_wali: tanggal_lahir,
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
    res.status(404).json({ message: "Gagal", savedForm, savedFamily });
  }
};

// PR
export const reaData = async (req, res) => {
  try {
    const family = await Family.findById("651bc8f1176e11fb5c623d71");
    await family.populate("student_id");
    console.log(family);
    res.status(200).json({ massage: "Success", family });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
