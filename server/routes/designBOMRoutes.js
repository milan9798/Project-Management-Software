

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  getDrawings,
  uploadDrawing,
  viewDrawing,
  getBOMItems,
  createBOMItem,
  getRevisions,
  uploadRevision,
  viewRevision,
} = require("../controllers/designBOMController");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads/design-bom");

// Ensure the upload directory exists
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${ext}`;

    cb(null, safeName);
  },
});

const allowedTypes = new Set([".pdf", ".jpg", ".jpeg", ".png"]);

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedTypes.has(ext)) {
      return cb(
        new Error("Only PDF, JPG, JPEG and PNG files are allowed.")
      );
    }

    cb(null, true);
  },
});


// Drawings

router.get("/", getDrawings);
router.post("/upload", upload.single("file"), uploadDrawing);

// BOM materials
router.get("/bom", getBOMItems);
router.post("/bom", createBOMItem);

// Drawing revisions — keep these routes before the general file route
router.get("/:id/revisions", getRevisions);
router.post("/:id/revisions", upload.single("file"), uploadRevision);
router.get("/:id/revisions/:revisionId/file", viewRevision);

// Open original drawing
router.get("/:id/file", viewDrawing);

module.exports = router;
