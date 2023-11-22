import multer from "multer";

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder penyimpanan untuk file-file yang diunggah
  },
  filename: function (req, file, cb) {
    // Menggunakan timestamp saat ini sebagai nama file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Fungsi filter untuk memeriksa tipe file yang diunggah
const fileFilter = function (req, file, cb) {
  // Hanya menerima file dengan tipe gambar
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Membuat middleware upload menggunakan konfigurasi storage dan filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
