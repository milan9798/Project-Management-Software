// const express = require("express");
// const router = express.Router();

// const {
//   getProjects,
//   createProject,
// } = require("../controllers/projectController");

// router.get("/", getProjects);
// router.post("/", createProject);

// module.exports = router;















const express = require("express");
const router = express.Router();

const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// Project list
router.get("/", getProjects);

// New project save
router.post("/", createProject);

// Existing project update
router.put("/:id", updateProject);

// Project delete
router.delete("/:id", deleteProject);

module.exports = router;