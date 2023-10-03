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

    res.status(201).json({
      message: "Formulir created successfully",
      newForm: savedForm,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
