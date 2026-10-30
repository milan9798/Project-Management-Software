
const express = require("express");
const router = express.Router();

const {
  getFinanceSummary,
  getRevenue,
  createRevenue,
  getExpenses,
  createExpense,
} = require("../controllers/financeController");

router.get("/summary", getFinanceSummary);

router.get("/revenue", getRevenue);
router.post("/revenue", createRevenue);

router.get("/expenses", getExpenses);
router.post("/expenses", createExpense);

module.exports = router;
