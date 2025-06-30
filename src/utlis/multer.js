const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();
const s3 = require("./s3");
const path = require("path");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      let folder = "CRM_New_Home";
      const userId = req.params?.id || "unknownUser";
      console.log("req.originalUrl", req.originalUrl);
      if (req.originalUrl.includes("/user") && file.fieldname === "photo") {
        folder = `CRM_New_Home/Storage/profile/${userId}`;
      } else if (req.originalUrl.includes("/confidential")) {
        folder = `CRM_New_Home/Storage/confidential/temp_uploads`;
      }

      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;

      const filePath = `${folder}/${uniqueName}`;
      cb(null, filePath);
    },
  }),

  // ✅ Safer file filter: allow all office/media files, block dangerous extensions
  fileFilter: (req, file, cb) => {
    const forbiddenExtensions = [
      ".exe",
      ".js",
      ".sh",
      ".bat",
      ".cmd",
      ".scr",
      ".php",
      ".pl",
      ".py",
      ".jar",
      ".msi",
      ".vbs",
    ];
    const ext = path.extname(file.originalname).toLowerCase();

    if (forbiddenExtensions.includes(ext)) {
      return cb(
        new Error(`Files with extension ${ext} are not allowed.`),
        false
      );
    }

    cb(null, true); // Allow everything else (Office, PDF, images, etc.)
  },

  limits: {
    fileSize: 1 * 2024 * 1024 * 1024, // 1 GB max
  },
});

module.exports = upload;
