
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const financeRoutes = require("./routes/financeRoutes");
const designBOMRoutes = require("./routes/designBOMRoutes");
const dispatchRoutes = require("./routes/dispatchRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Project Management API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/design-bom", designBOMRoutes);
app.use("/api/dispatches", dispatchRoutes);


module.exports = app;
