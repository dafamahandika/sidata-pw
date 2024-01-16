import fs from "fs";
import csv from "csv-parser";
import argon2 from "argon2";
import User from "../models/User.js";
import Student from "../models/Student/Student.js";

export const importCsvStudent = async (req, res) => {
  try {
    const result = [];

    if (req.file) {
      const csvFilePath = req.file.path;

      if (fs.existsSync(csvFilePath)) {
        fs.createReadStream(csvFilePath)
          .pipe(csv())
          .on("data", (data) => {
            result.push({
              username: data.nama,
              email: data.email,
              password: data.nis,
              nis: data.nis,
              rombel: data.rombel,
              rayon: data.rayon,
              jk: data.jk,
              nama: data.nama,
            });
          })
          .on("end", async () => {
            try {
              const hashedResult = await Promise.all(
                result.map(async (user) => ({
                  username: user.username,
                  email: user.email,
                  password: await argon2.hash(user.password),
                }))
              );

              const insertedUserData = await User.insertMany(hashedResult);
              const userIds = insertedUserData.map((user) => user._id);

              const studentData = result.map((student, index) => ({
                email: student.email,
                user_id: userIds[index],
                nis: student.nis,
                rombel: student.rombel,
                rayon: student.rayon,
                jk: student.jk,
                nama: student.nama,
              }));

              const insertedStudentData = await Student.insertMany(studentData);

              res.status(200).json({
                message: "Import selesai",
                data: {
                  users: insertedUserData,
                  students: insertedStudentData,
                },
              });
            } catch (error) {
              console.error(error);
              res.status(500).json({
                message: "Gagal mengimpor data ke model Student atau User",
                error: error,
              });
            }
          });
      } else {
        res.status(400).json({ message: "File CSV not found" });
      }
    } else {
      res.status(400).json({ message: "No file uploaded" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan", error: error });
  }
};
