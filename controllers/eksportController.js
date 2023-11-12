import Gtk from "../models/Gtk/Gtk";
import Student from "../models/Student/Student";
import xlsx from "xlsx";
import { PDFDocument } from "pdf-lib";

export const exportGtkData = async (req, res) => {
  try {
    const gtkData = await Gtk.find();

    if (!gtkData || gtkData.length === 0) {
      return res.status(404).json({ message: "Gtk data not found" });
    }

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(gtkData);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Gtk");
    const excelBuffer = xlsx.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    const excelData = excelBuffer.toString("base64");

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText("Gtk Data", { x: 50, y: 50, size: 24 });
    for (const gtk of gtkData) {
      page.drawText(`Name: ${gtk.name}, Age: ${gtk.age}`, { x: 50, y: 50 });
    }
    const pdfBytes = await pdfDoc.save();
    const pdfData = pdfBytes.toString("base64");

    res.json({ excelData, pdfData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const exportStudentData = async (req, res) => {
  try {
    const studentData = await Student.find();

    if (!studentData || studentData.length === 0) {
      return res.status(404).json({ message: "Student data not found" });
    }

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(studentData);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Students");
    const excelBuffer = xlsx.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    const excelData = excelBuffer.toString("base64");

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText("Students", { x: 50, y: 50, size: 24 });
    for (const student of studentData) {
      page.drawText(`Name: ${student.name}, Age: ${student.age}`, {
        x: 50,
        y: 50,
      });
    }
    const pdfBytes = await pdfDoc.save();
    const pdfData = pdfBytes.toString("base64");

    res.json({ excelData, pdfData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
