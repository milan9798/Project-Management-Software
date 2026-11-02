
const db = require("../config/db");

// Get finance summary for the current month

const getFinanceSummary = async (req, res) => {
  try {
    const [revenueRows] = await db.query(`
      SELECT COALESCE(SUM(amount), 0) AS total
      FROM revenue
      WHERE invoiceDate >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
        AND invoiceDate < DATE_ADD(
          DATE_FORMAT(CURDATE(), '%Y-%m-01'),
          INTERVAL 1 MONTH
        )
    `);

    const [expenseRows] = await db.query(`
      SELECT COALESCE(SUM(amount), 0) AS total
      FROM expense
      WHERE expenseDate >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
        AND expenseDate < DATE_ADD(
          DATE_FORMAT(CURDATE(), '%Y-%m-01'),
          INTERVAL 1 MONTH
        )
    `);

    // const [totals] = await db.query(`
    //   SELECT
    //     (SELECT COALESCE(SUM(amount), 0) FROM revenue)
    //       AS totalRevenue,
    //     (SELECT COALESCE(SUM(amount), 0) FROM expense)
    //       AS totalExpenses
    // `);

     
const [totals] = await db.query(`
  SELECT
    (SELECT COALESCE(SUM(amount), 0) FROM revenue)
      AS totalRevenue,
    (SELECT COALESCE(SUM(amount), 0) FROM expense)
      AS totalExpenses,
    (SELECT COUNT(*) FROM revenue)
      AS revenueCount,
    (SELECT COUNT(*) FROM expense)
      AS expenseCount
`);


    res.json({
      success: true,
      data: {
        revenueThisMonth: Number(revenueRows[0].total),
        expensesThisMonth: Number(expenseRows[0].total),
        totalRevenue: Number(totals[0].totalRevenue),
        totalExpenses: Number(totals[0].totalExpenses),
        revenueCount: Number(totals[0].revenueCount),
        expenseCount: Number(totals[0].expenseCount),
      },



    });
  } catch (error) {
    console.error("Finance summary error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch finance summary",
    });
  }
};

// Get revenue entries

const getRevenue = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM revenue
      ORDER BY invoiceDate DESC, id DESC
    `);

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Get revenue error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch revenue records",
    });
  }
};

// Add a revenue entry

const createRevenue = async (req, res) => {
  try {
    const {
      invoiceNumber,
      invoiceDate,
      customerName,
      projectCode,
      amount,
      description,
    } = req.body;

    if (
      !invoiceNumber?.trim() ||
      !invoiceDate ||
      !customerName?.trim() ||
      amount === undefined ||
      amount === null ||
      amount === "" ||
      !Number.isFinite(Number(amount)) ||
      Number(amount) <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invoice number, date, customer name and a positive amount are required",
      });
    }

    const [result] = await db.query(
      `INSERT INTO revenue
       (invoiceNumber, invoiceDate, customerName, projectCode, amount, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        invoiceNumber.trim(),
        invoiceDate,
        customerName.trim(),
        projectCode?.trim() || null,
        Number(amount),
        description?.trim() || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Revenue record saved",
      data: { id: result.insertId },
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "This invoice number already exists",
      });
    }

    console.error("Create revenue error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to save revenue record",
    });
  }
};

// Get expense entries

const getExpenses = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM expense
      ORDER BY expenseDate DESC, id DESC
    `);

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Get expenses error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch expense records",
    });
  }
};

// Add an expense entry

const createExpense = async (req, res) => {
  try {
    const {
      voucherNumber,
      expenseDate,
      category,
      projectCode,
      amount,
      description,
    } = req.body;

    if (
      !voucherNumber?.trim() ||
      !expenseDate ||
      !category?.trim() ||
      amount === undefined ||
      amount === null ||
      amount === "" ||
      !Number.isFinite(Number(amount)) ||
      Number(amount) <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Voucher number, date, category and a positive amount are required",
      });
    }

    const [result] = await db.query(
      `INSERT INTO expense
       (voucherNumber, expenseDate, category, projectCode, amount, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        voucherNumber.trim(),
        expenseDate,
        category.trim(),
        projectCode?.trim() || null,
        Number(amount),
        description?.trim() || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Expense record saved",
      data: { id: result.insertId },
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "This voucher number already exists",
      });
    }

    console.error("Create expense error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to save expense record",
    });
  }
};

module.exports = {
  getFinanceSummary,
  getRevenue,
  createRevenue,
  getExpenses,
  createExpense,
};
