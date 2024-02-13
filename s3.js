import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import AWS from "aws-sdk";

const bucketName = process.env.AWS_BUCKET_NAME;
const endpointUrl = process.env.S3_ENDPOINT_URL;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(endpointUrl),
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const uploadFileToS3 = function (file, key) {
  if (!file.path || !fs.existsSync(file.path)) {
    return Promise.reject(new Error("File not found."));
  }
  console.log(`Uploading file: ${file.path} with key: ${key}`);

  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: key,
  };

  return s3
    .upload(uploadParams)
    .promise()
    .finally(() => {
      fs.unlink(fileStream.path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
};

export const handleSingleFileUpload = function (req, res, next) {
  const file = req.files && req.files.file;

  if (!file) {
    return res.status(400).json({ message: "No file was uploaded." });
  }
  console.log(file);

  const currentTime = Date.now();
  const key = `dokument_ijazah_${currentTime}_${file.name}`;

  uploadFileToS3(file, key)
    .then(() => {
      res.status(200).json({ message: "File uploaded successfully." });
    })
    .catch((error) => {
      console.error("Failed to upload file:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};
