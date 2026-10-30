// const db = require("../config/db");
// const fs = require("fs");
// const path = require("path");

// Get all saved drawings
// async function getDrawings(req, res) {
//   try {
//     const [drawings] = await db.query(
//       `SELECT id, drawing_number, drawing_name, project_code,
//               engineer, revision, drawing_date, status, remarks,
//               original_file_name, mime_type, created_at

            
//        FROM design_drawings
//        ORDER BY id DESC`
//     );

//     res.json(drawings);
//   } catch (error) {
//     console.error("Get drawings error:", error.message);
//     res.status(500).json({ message: "Failed to load drawings." });
//   }
// }

// Upload drawing and save its details in MySQL

// async function uploadDrawing(req, res) {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Please select a file." });
//     }

//     const {
//       drawingNumber,
//       drawingName,
//       projectCode,
//       engineer,
//       drawingDate,
//       remarks,
//     } = req.body;

//     if (!drawingNumber?.trim() || !drawingName?.trim() || !projectCode?.trim()) {
//       fs.unlink(req.file.path, () => {});

//       return res.status(400).json({
//         message: "Drawing number, drawing name and project code are required.",
//       });
//     }

//     const validDate =
//       drawingDate && /^\d{4}-\d{2}-\d{2}$/.test(drawingDate)
//         ? drawingDate
//         : null;

//     const [result] = await db.query(
//       `INSERT INTO design_drawings
//        (drawing_number, drawing_name, project_code, engineer,
//         drawing_date, remarks, original_file_name, stored_file_name,
//         mime_type, file_path)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         drawingNumber.trim(),
//         drawingName.trim(),
//         projectCode.trim(),
//         engineer || null,
//         validDate,
//         remarks || null,
//         req.file.originalname,
//         req.file.filename,
//         req.file.mimetype,
//         req.file.path,
//       ]
//     );

//     res.status(201).json({
//       message: "Drawing uploaded successfully.",
//       id: result.insertId,
//     });
//   } catch (error) {
//     if (req.file) fs.unlink(req.file.path, () => {});

//     console.error("Upload drawing error:", error.message);
//     res.status(500).json({ message: "Failed to upload drawing." });
//   }
// }

// Open the saved PDF or image

// async function viewDrawing(req, res) {
//   try {
//     const [rows] = await db.query(
//       `SELECT original_file_name, file_path, mime_type
//        FROM design_drawings
//        WHERE id = ?`,
//       [req.params.id]
//     );

//     if (rows.length === 0) {
//       return res.status(404).json({ message: "Drawing not found." });
//     }

//     const drawing = rows[0];
//     const filePath = path.resolve(drawing.file_path);

//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ message: "Drawing file not found on server." });
//     }

//     res.setHeader(
//       "Content-Type",
//       drawing.mime_type || "application/octet-stream"
//     );

//     res.setHeader(
//       "Content-Disposition",
//       `inline; filename*=UTF-8''${encodeURIComponent(drawing.original_file_name)}`
//     );

//     res.sendFile(filePath);
//   } catch (error) {
//     console.error("View drawing error:", error.message);
//     res.status(500).json({ message: "Failed to open drawing." });
//   }
// }
// module.exports = {
//   getDrawings,
//   uploadDrawing,
//   viewDrawing,
// };
















const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// Validate project code against the real project table

async function findProject(projectCode) {
  const [rows] = await db.query(
    "SELECT id, projectCode FROM project WHERE projectCode = ? LIMIT 1",
    [projectCode]
  );

  return rows[0] || null;
}

// Get all drawings

async function getDrawings(req, res) {
  try {
    const [drawings] = await db.query(`
      SELECT id, drawing_number, drawing_name, project_code,
             engineer, revision, drawing_date, status, remarks,
             original_file_name, mime_type, created_at
      FROM design_drawings
      ORDER BY id DESC
    `);

    res.json(drawings);
  } catch (error) {
    console.error("Get drawings error:", error.message);
    res.status(500).json({ message: "Failed to load drawings." });
  }
}

// Upload a drawing linked to a real project

async function uploadDrawing(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please select a drawing file." });
    }

    const {
      drawingNumber,
      drawingName,
      projectCode,
      engineer,
      drawingDate,
      remarks,
    } = req.body;

    if (
      !drawingNumber?.trim() ||
      !drawingName?.trim() ||
      !projectCode?.trim()
    ) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({
        message: "Drawing number, drawing name and project code are required.",
      });
    }

    const project = await findProject(projectCode.trim());

    if (!project) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({
        message: "Project code does not exist. Please select a valid project.",
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
        project.projectCode,
        engineer?.trim() || null,
        validDate,
        remarks?.trim() || null,
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
    console.error("Upload drawing error:", error.message);
    res.status(500).json({ message: "Failed to upload drawing." });
  }
}

// Open a saved drawing

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
        message: "Drawing file not found on server.",
      });
    }

    res.setHeader(
      "Content-Type",
      drawing.mime_type || "application/octet-stream"
    );
    res.setHeader(
      "Content-Disposition",
      `inline; filename*=UTF-8''${encodeURIComponent(
        drawing.original_file_name
      )}`
    );

    res.sendFile(filePath);
  } catch (error) {
    console.error("View drawing error:", error.message);
    res.status(500).json({ message: "Failed to open drawing." });
  }
}

// Get BOM materials from MySQL

async function getBOMItems(req, res) {
  try {
    const { projectCode } = req.query;

    let sql = `
      SELECT b.id, b.project_id, b.project_code, b.material_name,
             b.material_grade, b.material_size, b.length_mm,
             b.width_mm, b.quantity, b.unit, b.weight_per_unit,
             b.remarks, b.created_at, b.updated_at
      FROM design_bom_items b
    `;

    const params = [];

    if (projectCode) {
      sql += " WHERE b.project_code = ?";
      params.push(projectCode);
    }

    sql += " ORDER BY b.id DESC";

    const [items] = await db.query(sql, params);
    res.json(items);
  } catch (error) {
    console.error("Get BOM items error:", error.message);
    res.status(500).json({ message: "Failed to load BOM materials." });
  }
}

// Save a BOM material in MySQL

async function createBOMItem(req, res) {
  try {
    const {
      projectCode,
      materialName,
      materialGrade,
      materialSize,
      length,
      width,
      quantity,
      unit,
      weight,
      remarks,
    } = req.body;

    if (!projectCode?.trim() || !materialName?.trim()) {
      return res.status(400).json({
        message: "Project code and material name are required.",
      });
    }

    const qty = Number(quantity ?? 1);
    const weightValue = Number(weight ?? 0);

    if (!Number.isFinite(qty) || qty <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than zero.",
      });
    }

    if (!Number.isFinite(weightValue) || weightValue < 0) {
      return res.status(400).json({
        message: "Weight must be zero or greater.",
      });
    }

    const validDimension = (value) => {
      if (value === "" || value === null || value === undefined) {
        return null;
      }

      const number = Number(value);
      return Number.isFinite(number) && number >= 0 ? number : NaN;
    };

    const lengthValue = validDimension(length);
    const widthValue = validDimension(width);

    if (Number.isNaN(lengthValue) || Number.isNaN(widthValue)) {
      return res.status(400).json({
        message: "Length and width must be valid non-negative numbers.",
      });
    }

    const allowedUnits = ["Piece", "kg", "Meter", "Sheet"];

    if (unit && !allowedUnits.includes(unit)) {
      return res.status(400).json({ message: "Invalid material unit." });
    }

    const project = await findProject(projectCode.trim());

    if (!project) {
      return res.status(400).json({
        message: "Project code does not exist. Please select a valid project.",
      });
    }

    const [result] = await db.query(
      `INSERT INTO design_bom_items
       (project_id, project_code, material_name, material_grade,
        material_size, length_mm, width_mm, quantity, unit,
        weight_per_unit, remarks)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        project.id,
        project.projectCode,
        materialName.trim(),
        materialGrade?.trim() || null,
        materialSize?.trim() || null,
        lengthValue,
        widthValue,
        qty,
        unit || "Piece",
        weightValue,
        remarks?.trim() || null,
      ]
    );

    const [savedRows] = await db.query(
      `SELECT * FROM design_bom_items WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      message: "BOM material saved successfully.",
      data: savedRows[0],
    });
  } catch (error) {
    console.error("Create BOM item error:", error.message);
    res.status(500).json({ message: "Failed to save BOM material." });
  }
}

// Get revision history for a drawing

async function getRevisions(req, res) {
  try {
    const [drawings] = await db.query(
      "SELECT id FROM design_drawings WHERE id = ?",
      [req.params.id]
    );

    if (!drawings.length) {
      return res.status(404).json({ message: "Drawing not found." });
    }

    const [revisions] = await db.query(
      `SELECT id, drawing_id, revision_number, file_name,
              mime_type, remarks, created_at
       FROM design_drawing_revisions
       WHERE drawing_id = ?
       ORDER BY id DESC`,
      [req.params.id]
    );

    res.json(revisions);
  } catch (error) {
    console.error("Get revisions error:", error.message);
    res.status(500).json({ message: "Failed to load revisions." });
  }
}

// Save a new revision without deleting the earlier file

async function uploadRevision(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please select a revision file." });
    }

    const { revisionNumber, remarks } = req.body;

    if (!revisionNumber?.trim()) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({
        message: "Revision number is required.",
      });
    }

    const [drawings] = await db.query(
      "SELECT id FROM design_drawings WHERE id = ?",
      [req.params.id]
    );

    if (!drawings.length) {
      fs.unlink(req.file.path, () => {});
      return res.status(404).json({ message: "Drawing not found." });
    }

    const [result] = await db.query(
      `INSERT INTO design_drawing_revisions
       (drawing_id, revision_number, file_name, stored_file_name,
        mime_type, file_path, remarks)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        req.params.id,
        revisionNumber.trim(),
        req.file.originalname,
        req.file.filename,
        req.file.mimetype,
        req.file.path,
        remarks?.trim() || null,
      ]
    );

    await db.query(
      `UPDATE design_drawings
       SET revision = ?, status = 'Under Review'
       WHERE id = ?`,
      [revisionNumber.trim(), req.params.id]
    );

    res.status(201).json({
      message: "New drawing revision saved successfully.",
      id: result.insertId,
    });
  } catch (error) {
    if (req.file) fs.unlink(req.file.path, () => {});
    console.error("Upload revision error:", error.message);
    res.status(500).json({ message: "Failed to save drawing revision." });
  }
}

// Open a saved revision file

async function viewRevision(req, res) {
  try {
    const [rows] = await db.query(
      `SELECT file_name, file_path, mime_type
       FROM design_drawing_revisions
       WHERE id = ? AND drawing_id = ?`,
      [req.params.revisionId, req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Revision not found." });
    }

    const revision = rows[0];
    const filePath = path.resolve(revision.file_path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "Revision file not found on server.",
      });
    }

    res.setHeader(
      "Content-Type",
      revision.mime_type || "application/octet-stream"
    );
    res.setHeader(
      "Content-Disposition",
      `inline; filename*=UTF-8''${encodeURIComponent(revision.file_name)}`
    );

    res.sendFile(filePath);
  } catch (error) {
    console.error("View revision error:", error.message);
    res.status(500).json({ message: "Failed to open revision." });
  }
}

module.exports = {
  getDrawings,
  uploadDrawing,
  viewDrawing,
  getBOMItems,
  createBOMItem,
  getRevisions,
  uploadRevision,
  viewRevision,
};
