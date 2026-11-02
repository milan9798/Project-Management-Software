const db = require("../config/db");

// Allowed dispatch statuses
const VALID_STATUSES = [
  "PLANNED",
  "READY",
  "DISPATCHED",
  "DELIVERED",
  "ON_HOLD",
  "DELIVERY_ISSUE",
];

// Get all dispatch records with search and status filter

exports.getDispatches = async (req, res) => {
  try {
    const search =
      typeof req.query.search === "string" ? req.query.search.trim() : "";

    const status =
      typeof req.query.status === "string" ? req.query.status.trim() : "";

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid dispatch status.",
      });
    }

    let sql = `
      SELECT
        d.*,
        p.projectCode,
        p.projectName
      FROM dispatches d
      LEFT JOIN project p ON p.id = d.projectId
      WHERE 1 = 1
    `;

    const params = [];

    if (search) {
      sql += `
        AND (
          d.dispatchNumber LIKE ?
          OR d.customerName LIKE ?
          OR d.vehicleNumber LIKE ?
          OR p.projectName LIKE ?
          OR p.projectCode LIKE ?
        )
      `;

      const searchValue = `%${search}%`;

      params.push(
        searchValue,
        searchValue,
        searchValue,
        searchValue,
        searchValue
      );
    }

    if (status) {
      sql += " AND d.status = ?";
      params.push(status);
    }

    sql += " ORDER BY d.createdAt DESC";

    const [dispatches] = await db.execute(sql, params);

    return res.status(200).json({
      success: true,
      count: dispatches.length,
      dispatches,
    });
  } catch (error) {
    console.error("Get dispatches error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dispatch records.",
    });
  }
};

// Create a new dispatch record

exports.createDispatch = async (req, res) => {
  try {
    const {
      dispatchNumber,
      projectId,
      customerName,
      dispatchDate,
      destination,
      materialDescription,
      quantity,
      unit,
      vehicleNumber,
      transporterName,
      driverName,
      driverPhone,
      status,
      deliveryDate,
      remarks,
    } = req.body;

    if (
      !dispatchNumber?.trim() ||
      !projectId ||
      !customerName?.trim() ||
      !dispatchDate
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Dispatch number, project, customer name and dispatch date are required.",
      });
    }

    const numericProjectId = Number(projectId);
    const numericQuantity = Number(quantity ?? 0);
    const dispatchStatus = status || "PLANNED";

    if (
      !Number.isSafeInteger(numericProjectId) ||
      numericProjectId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid project.",
      });
    }

    if (!Number.isFinite(numericQuantity) || numericQuantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a valid non-negative number.",
      });
    }

    if (!VALID_STATUSES.includes(dispatchStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid dispatch status.",
      });
    }

    const [projects] = await db.execute(
      "SELECT id FROM project WHERE id = ?",
      [numericProjectId]
    );

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Selected project was not found.",
      });
    }

    const [result] = await db.execute(
      `INSERT INTO dispatches (
        dispatchNumber,
        projectId,
        customerName,
        dispatchDate,
        destination,
        materialDescription,
        quantity,
        unit,
        vehicleNumber,
        transporterName,
        driverName,
        driverPhone,
        status,
        deliveryDate,
        remarks
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        dispatchNumber.trim(),
        numericProjectId,
        customerName.trim(),
        dispatchDate,
        destination?.trim() || null,
        materialDescription?.trim() || null,
        numericQuantity,
        unit?.trim() || "Piece",
        vehicleNumber?.trim() || null,
        transporterName?.trim() || null,
        driverName?.trim() || null,
        driverPhone?.trim() || null,
        dispatchStatus,
        deliveryDate || null,
        remarks?.trim() || null,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Dispatch created successfully.",
      id: result.insertId,
    });

    
  } catch (error) {
    console.error("Create dispatch error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "This dispatch number already exists.",
      });
    }

    if (
      error.code === "ER_NO_REFERENCED_ROW_2" ||
      error.code === "ER_NO_REFERENCED_ROW"
    ) {
      return res.status(400).json({
        success: false,
        message: "Selected project does not exist.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create dispatch record.",
    });
  }
};

// Update the status of a dispatch

exports.updateDispatchStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid dispatch ID.",
      });
    }

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid dispatch status.",
      });
    }

    const [result] = await db.execute(
      "UPDATE dispatches SET status = ? WHERE id = ?",
      [status, Number(id)]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Dispatch record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Dispatch status updated successfully.",
    });
  } catch (error) {
    console.error("Update dispatch status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update dispatch status.",
    });
  }
};

// Delete a dispatch record from Dispatch Register

exports.deleteDispatch = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid dispatch ID.",
      });
    }

    const dispatchId = Number(id);

    // Check whether the dispatch exists
    const [existing] = await db.execute(
      "SELECT id, dispatchNumber FROM dispatches WHERE id = ?",
      [dispatchId]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Dispatch record not found. It may already be deleted.",
      });
    }

    // Delete the selected record only
    const [result] = await db.execute(
      "DELETE FROM dispatches WHERE id = ?",
      [dispatchId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Dispatch record could not be deleted because it was not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Dispatch ${existing[0].dispatchNumber} deleted successfully.`,
      deletedId: dispatchId,
    });
  } catch (error) {
    console.error("Delete dispatch error:", error);

    if (
      error.code === "ER_ROW_IS_REFERENCED_2" ||
      error.code === "ER_ROW_IS_REFERENCED"
    ) {
      return res.status(409).json({
        success: false,
        message:
          "This dispatch is linked to another database record and cannot be deleted until that relationship is resolved.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete dispatch record.",
    });
  }
};
