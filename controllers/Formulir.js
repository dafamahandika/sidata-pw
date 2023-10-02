import Formulir from "../models/Form.js";

export const create = async (req, res) => {
  try {
    const { nama, jk, nisn } = req.body;

    const newForm = new Formulir({
      nama: nama,
      jk: jk,
      nisn: nisn,
    });

    await newForm.save();

    res.status(201).json({ message: "Formulir created successfully", newForm });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Gagal", newForm });
  }
};
