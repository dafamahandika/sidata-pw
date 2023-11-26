import fs from "fs";
import csv from "csv-parser";
import exceljs from "exceljs";
import Gtk from "../models/Gtk/Gtk.js";

export const importCsv = async (req, res) => {
  try {
    const result = [];

    const { csvFile, pdfFile, excelFile } = req.files;

    if (csvFile) {
      fs.createReadStream(csvFile.path)
        .pipe(csv())
        .on("data", (data) => {
          result.push(data);
        })
        .on("end", async () => {
          try {
            const insertedData = await Gtk.insertMany(result);
            res
              .status(200)
              .json({ message: "Data berhasil diimpor", data: insertedData });
          } catch (error) {
            console.error(error);
            res
              .status(500)
              .json({ message: "Gagal mengimpor data", error: error });
          }
        });
    } else if (pdfFile) {
      fs.readFile(pdfFile.path, async (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: "Gagal memproses file PDF", error });
        } else {
          res.status(200).json({ message: "File PDF berhasil diproses" });
        }
      });
    } else if (excelFile) {
      const workbook = new exceljs.Workbook();
      await workbook.xlsx.readFile(excelFile.path);
      const worksheet = workbook.getWorksheet(1);

      const result = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
          const rowData = {};
          row.eachCell((cell, colNumber) => {
            const cellValue = cell.value;
            const headerCell = worksheet.getRow(1).getCell(colNumber);
            const headerValue = headerCell.value;
            rowData[headerValue] = cellValue;
          });
          result.push(rowData);
        }
      });

      try {
        const insertedData = await Gtk.insertMany(result);
        res
          .status(200)
          .json({ message: "Data berhasil diimpor", data: insertedData });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal mengimpor data", error: error });
      }
    } else {
      res.status(400).json({ message: "No supported file found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan", error: error });
  }
};
