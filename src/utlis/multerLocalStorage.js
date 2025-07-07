const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create directories dynamically if needed
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "Storage";
    const userId = req.params?.id || "unknownUser";

    if (req.originalUrl.includes("/test") && file.fieldname === "photo") {
      folder = `/profile/${userId}`;
    } else if (req.originalUrl.includes("/profile")) {
      folder = `/profile/temp_uploads`;
    }

    ensureDirExists(folder);
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,

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

    cb(null, true);
  },

  limits: {
    fileSize: 1 * 1024 * 1024 * 1024, // 1 GB
  },
});

module.exports = upload;
