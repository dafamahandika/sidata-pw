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
    const families = await Family.find().populate("student_id").lean();
    res.status(200).json({
      message: "Success",
      families: families.map((family) => ({
        ...family.student_id,
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
      })),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

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
