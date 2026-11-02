
const prisma = require("../config/prisma");

// GET: All projects

exports.getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: projects });
  } catch (error) {
    console.error("Get projects error:", error.message);
    res.status(500).json({
      success: false,
      message: "Projects load nahi ho sake.",
    });
  }
};

// POST: Create project

exports.createProject = async (req, res) => {
  try {
    const {
      projectCode,
      projectName,
      customerName,
      workOrderNumber,
      projectType,
      orderValue,
      startDate,
      deliveryDate,
      priority,
      status,
      description,
    } = req.body;

    if (
      !projectCode?.trim() ||
      !projectName?.trim() ||
      !customerName?.trim() ||
      !projectType?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Project Code, Project Name, Customer Name aur Project Type required hain.",
      });
    }

    const project = await prisma.project.create({
      data: {
        projectCode: projectCode.trim(),
        projectName: projectName.trim(),
        customerName: customerName.trim(),
        workOrderNumber: workOrderNumber || null,
        projectType: projectType.trim(),
        orderValue:
          orderValue === "" || orderValue == null
            ? 0
            : Number(orderValue),
        startDate: startDate ? new Date(startDate) : null,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
        priority: priority || "MEDIUM",
        status: status || "PLANNING",
        description: description || null,
      },
    });

    res.status(201).json({
      success: true,
      message: "Project successfully save ho gaya.",
      data: project,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Ye Project Code pehle se exist karta hai.",
      });
    }

    console.error("Create project error:", error.message);
    res.status(500).json({
      success: false,
      message: "Project save nahi ho saka.",
    });
  }
};

// PUT: Update project

exports.updateProject = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID.",
      });
    }

    const {
      projectCode,
      projectName,
      customerName,
      workOrderNumber,
      projectType,
      orderValue,
      startDate,
      deliveryDate,
      priority,
      status,
      description,
    } = req.body;

    if (
      !projectCode?.trim() ||
      !projectName?.trim() ||
      !customerName?.trim() ||
      !projectType?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Project Code, Project Name, Customer Name aur Project Type required hain.",
      });
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        projectCode: projectCode.trim(),
        projectName: projectName.trim(),
        customerName: customerName.trim(),
        workOrderNumber: workOrderNumber || null,
        projectType: projectType.trim(),
        orderValue:
          orderValue === "" || orderValue == null
            ? 0
            : Number(orderValue),
        startDate: startDate ? new Date(startDate) : null,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
        priority: priority || "MEDIUM",
        status: status || "PLANNING",
        description: description || null,
      },
    });

    res.json({
      success: true,
      message: "Project successfully update ho gaya.",
      data: project,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Ye Project Code kisi doosre project mein use ho raha hai.",
      });
    }

    console.error("Update project error:", error.message);

    res.status(error.code === "P2025" ? 404 : 500).json({
      success: false,
      message:
        error.code === "P2025"
          ? "Project nahi mila."
          : "Project update nahi ho saka.",
    });
  }
};

// DELETE: Delete project

exports.deleteProject = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID.",
      });
    }

    await prisma.project.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Project successfully delete ho gaya.",
    });
  } catch (error) {
    console.error("Delete project error:", error.message);

    res.status(error.code === "P2025" ? 404 : 500).json({
      success: false,
      message:
        error.code === "P2025"
          ? "Project nahi mila."
          : "Project delete nahi ho saka.",
    });
  }
};
