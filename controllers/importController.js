import Student from "../models/Student.js";
import Gtk from "../models/Gtk.js";
import xlsx from "xlsx";

export const importData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File not found" });
    }
    const workbook = xlsx.readFile(req.file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    for (const row of data) {
      const student = new Student(row);
      await student.save();
    }

    res.status(200).json({ message: "Data imported successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const importDataGtk = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File not found" });
    }
    const workbook = xlsx.readFile(req.file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    for (const row of data) {
      const student = new Gtk(row);
      await student.save();
    }

    res.status(200).json({ message: "Data imported successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
