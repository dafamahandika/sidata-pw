import path from "path";
import multer from "multer";
import Student from "../models/Student/Student";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatar/student");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, "profile-" + uniqueSuffix + extname);
  },
});

const upload = multer({ storage });

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Data Student Not Found",
      });
    }

    upload.single("imageProfile")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan saat mengunggah gambar" });
      } else if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan saat memperbarui profil" });
      }

      const imageProfile = req.file;

      if (imageProfile) {
        student.imageProfile = imageProfile.path;
        await student.save();
      }

      res.status(200).json({ message: "Profil berhasil diperbarui" });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat memperbarui profil" });
  }
};
