const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const Techician = require("../../models/Technicians");

const router = express.Router({ mergeParams: true });

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../../uploads/technicians");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const techId = req.params.id;
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${techId}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error("Only image files are allowed!"));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

// Export the upload middleware and handler separately
exports.uploadMiddleware = upload.single("profileImage");
exports.handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const techId = req.params.id;
    if (!techId) {
      fs.unlinkSync(req.file.path);
      return res
        .status(400)
        .json({ success: false, message: "Tech ID is required" });
    }

    const tech = await Techician.findById(techId);
    if (!tech) {
      fs.unlinkSync(req.file.path);
      return res
        .status(404)
        .json({ success: false, message: "Tech not found" });
    }

    const imagePath = `${req.file.filename}`;
    await Techician.findByIdAndUpdate(techId, { profileImg: imagePath });

    res.json({
      success: true,
      imageUrl: imagePath,
    });
  } catch (error) {
    if (req.file?.path) {
      fs.unlinkSync(req.file.path);
    }
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
