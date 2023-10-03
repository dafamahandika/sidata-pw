import Formulir from "../models/Form.js";
import Family from "../models/Family.js";

export const create = async (req, res) => {
  try {
    const { nama, jk, nisn } = req.body;

    const newForm = new Formulir({
      nama: nama,
      jk: jk,
      nisn: nisn,
    });

    await newForm.save();

    const {
      student_id,
      nama_ayah,
      nik_ayah,
      tanggal_lahir_ayah,
      pendidikan_ayah,
      pekerjaan_ayah,
      penghasilan_ayah,
      nama_ibu,
      nik_ibu,
      tanggal_lahir_ibu,
      pendidikan_ibu,
      pekerjaan_ibu,
      penghasilan_ibu,
      nama_wali,
      nik_wali,
      tanggal_lahir_wali,
      pendidikan_wali,
      pekerjaan_wali,
      penghasilan_wali,
    } = req.body;

    const newFamily = new Family({
      student_id: student_id,
      nama_ayah: nama_ayah,
      nik_ayah: nik_ayah,
      tanggal_lahir_ayah: tanggal_lahir_ayah,
      pendidikan_ayah: pendidikan_ayah,
      pekerjaan_ayah: pekerjaan_ayah,
      penghasilan_ayah: penghasilan_ayah,
      nama_ibu: nama_ibu,
      nik_ibu: nik_ibu,
      tanggal_lahir_ibu: tanggal_lahir_ibu,
      pendidikan_ibu: pendidikan_ibu,
      pekerjaan_ibu: pekerjaan_ibu,
      penghasilan_ibu: penghasilan_ibu,
      nama_wali: nama_wali,
      nik_wali: nik_wali,
      tanggal_lahir_wali: tanggal_lahir_wali,
      pendidikan_wali: pendidikan_wali,
      pekerjaan_wali: pekerjaan_wali,
      penghasilan_wali: penghasilan_wali,
    });

    const savedFamily = await newFamily.save();

    res.status(201).json({ message: "Formulir created successfully", newForm, savedFamily });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Gagal", newForm, savedFamily });
  }
};
