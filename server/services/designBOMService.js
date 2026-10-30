
const db = require("../config/db");
const path = require("path");
const fs = require("fs");

async function getDrawings(req, res) {
  try {
    const [rows] = await db.query(
      `SELECT id, drawing_number, drawing_name, project_code,
              engineer, revision, drawing_date, status, remarks,
              original_file_name, mime_type, created_at
       FROM design_drawings
       ORDER BY id DESC`
    );

    res.json(rows);
  } catch (error) {
    console.error("Get drawings error:", error);
    res.status(500).json({ message: "Could not load drawings." });
  }
}

async function uploadDrawing(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please select a file." });
    }

    const {
      drawingNumber,
      drawingName,
      projectCode,
      engineer,
      drawingDate,
      remarks,
    } = req.body;

    if (!drawingNumber || !drawingName || !projectCode) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({
        message: "Drawing number, drawing name and project code are required.",
      });
    }

    const validDate =
      drawingDate && /^\d{4}-\d{2}-\d{2}$/.test(drawingDate)
        ? drawingDate
        : null;

    const [result] = await db.query(
      `INSERT INTO design_drawings
       (drawing_number, drawing_name, project_code, engineer,
        drawing_date, remarks, original_file_name, stored_file_name,
        mime_type, file_path)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        drawingNumber.trim(),
        drawingName.trim(),
        projectCode.trim(),
        engineer || null,
        validDate,
        remarks || null,
        req.file.originalname,
        req.file.filename,
        req.file.mimetype,
        req.file.path,
      ]
    );

    res.status(201).json({
      message: "Drawing uploaded successfully.",
      id: result.insertId,
    });
  } catch (error) {
    if (req.file) fs.unlink(req.file.path, () => {});
    console.error("Upload drawing error:", error);
    res.status(500).json({ message: "Could not save the drawing." });
  }
}

async function viewDrawing(req, res) {
  try {
    const [rows] = await db.query(
      `SELECT original_file_name, file_path, mime_type
       FROM design_drawings WHERE id = ?`,
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Drawing not found." });
    }

    const drawing = rows[0];
    const filePath = path.resolve(drawing.file_path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "Drawing record exists, but its file is missing from the server.",
      });
    }

    res.setHeader("Content-Type", drawing.mime_type || "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      `inline; filename*=UTF-8''${encodeURIComponent(drawing.original_file_name)}`
    );

    res.sendFile(filePath);
  } catch (error) {
    console.error("View drawing error:", error);
    res.status(500).json({ message: "Could not open the drawing." });
  }
}

module.exports = {
  getDrawings,
  uploadDrawing,
  viewDrawing,
};
