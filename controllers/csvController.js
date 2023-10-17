import fs from "fs";
import csv from "csv-parser";
import Gtk from "../models/Gtk/Gtk.js";

export const importCsv = async (req, res) => {
  try {
    const result = [];

    fs.createReadStream("data.csv")
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan", error: error });
  }
};
