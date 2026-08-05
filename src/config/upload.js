console.log("upload.js loaded");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const uploadBase = path.join(__dirname, "..", "..", "uploads");
const eventUploadDir = path.join(uploadBase, "events");

if (!fs.existsSync(eventUploadDir)) {
  fs.mkdirSync(eventUploadDir, { recursive: true });
}

const ALLOWED_EXTENSIONS = /jpeg|jpg|png|gif|webp/;
const ALLOWED_MIME_TYPES = /^image\/(jpeg|png|gif|webp)$/;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const MAGIC_BYTES = {
  png: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  jpeg: [0xff, 0xd8, 0xff],
  gif87: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
  gif89: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
  riff: [0x52, 0x49, 0x46, 0x46],
};

const validateMagicBytes = (filePath, ext) => {
  try {
    const fd = fs.openSync(filePath, "r");
    const buffer = Buffer.alloc(12);
    fs.readSync(fd, buffer, 0, 12, 0);
    fs.closeSync(fd);

    if (ext === ".png" && buffer.slice(0, 8).equals(Buffer.from(MAGIC_BYTES.png))) return true;

    if ((ext === ".jpg" || ext === ".jpeg") && buffer.slice(0, 3).equals(Buffer.from(MAGIC_BYTES.jpeg))) return true;

    if (ext === ".gif" && (buffer.slice(0, 6).equals(Buffer.from(MAGIC_BYTES.gif87)) || buffer.slice(0, 6).equals(Buffer.from(MAGIC_BYTES.gif89))))
      return true;

    if (ext === ".webp" && buffer.slice(0, 4).equals(Buffer.from(MAGIC_BYTES.riff)) && buffer.slice(8, 12).toString() === "WEBP")
      return true;

    return false;
  } catch (err) {
    return false;
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, eventUploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (!ALLOWED_EXTENSIONS.test(ext)) {
    return cb(new Error("Only image files (jpeg, jpg, png, gif, webp) are allowed"), false);
  }

  if (!ALLOWED_MIME_TYPES.test(mime)) {
    return cb(new Error("Invalid MIME type — only image files are allowed"), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },
});

const uploadEventsImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }

    if (err) {
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      console.log(err);
      return res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }

    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      if (!validateMagicBytes(req.file.path, ext)) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({
          status: "fail",
          message: "File content does not match a valid image (corrupt or fake file)",
        });
      }
    }

    next();
  });
};

module.exports = {
  upload,
  uploadEventsImage,
  eventUploadDir,
};