
const express = require("express");
const router = express.Router();

const {
  getDispatches,
  createDispatch,
  updateDispatchStatus,
  deleteDispatch,
} = require("../controllers/dispatchController");

// Saare dispatch records dekhna

router.get("/", getDispatches);

// Naya dispatch banana
router.post("/", createDispatch);

// Dispatch ka status update karna
router.patch("/:id/status", updateDispatchStatus);

// Dispatch record delete karna
router.delete("/:id", deleteDispatch);

module.exports = router;
