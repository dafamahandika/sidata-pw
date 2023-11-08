import Student from "../models/Student/Student";
import xlsx from "xlsx";
import { PDFDocument } from "pdf-lib";

export const exportData = async (req, res) => {
  try {
    const students = await Student.find();

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(students);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Students");
    const excelBuffer = xlsx.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    const excelData = excelBuffer.toString("base64");

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText("Students", { x: 50, y: 50, size: 24 });
    for (const student of students) {
      page.drawText(`Name: ${student.name}`, { x: 50, y: 100, size: 12 });
      page.drawText(`Email: ${student.email}`, { x: 50, y: 120, size: 12 });
      page.addPage();
    }
    const pdfBytes = await pdfDoc.save();
    const pdfData = pdfBytes.toString("base64");

    res.json({ excelData, pdfData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
