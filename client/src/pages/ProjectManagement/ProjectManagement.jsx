
// import { useState } from "react";
// import {
//   Plus,
//   Search,
//   FolderKanban,
//   X,
//   CalendarDays,
//   IndianRupee,
//   Eye,
// } from "lucide-react";
// import "./ProjectManagement.css";

// const initialProjects = [];

// export default function ProjectManagement() {
//   const [projects, setProjects] = useState(initialProjects);
//   const [showForm, setShowForm] = useState(false);
//   const [search, setSearch] = useState("");
//   const [form, setForm] = useState({
//     name: "",
//     customer: "",
//     type: "Structural Steel",
//     orderValue: "",
//     startDate: "",
//     dueDate: "",
//     status: "Planning",
//     description: "",
//   });

//   const updateField = (event) => {
//     const { name, value } = event.target;
//     setForm((previous) => ({ ...previous, [name]: value }));
//   };

//   const handleSave = (event) => {
//     event.preventDefault();

//     const newProject = {
//       ...form,
//       id: `PRJ-${Date.now()}`,
//       createdAt: new Date().toISOString(),
//     };

//     setProjects((previous) => [newProject, ...previous]);
//     setForm({
//       name: "",
//       customer: "",
//       type: "Structural Steel",
//       orderValue: "",
//       startDate: "",
//       dueDate: "",
//       status: "Planning",
//       description: "",
//     });
//     setShowForm(false);
//   };

//   const filteredProjects = projects.filter((project) =>
//     `${project.id} ${project.name} ${project.customer}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const formatCurrency = (value) =>
//     value !== "" && value != null
//       ? Number(value).toLocaleString("en-IN", {
//           style: "currency",
//           currency: "INR",
//           maximumFractionDigits: 0,
//         })
//       : "—";

//   return (
//     <div className="pm-page">
//       <div className="pm-heading">
//         <div>
//           <span className="pm-eyebrow">PROJECT OPERATIONS</span>
//           <h1>Project Management</h1>
//           <p>Manage fabrication projects, customer orders and delivery timelines.</p>
//         </div>

//         <button
//           className="pm-primary-btn"
//           onClick={() => setShowForm(true)}
//           type="button"
//         >
//           <Plus size={18} />
//           Create New Project
//         </button>
//       </div>

//       <div className="pm-summary-grid">
//         <article className="pm-summary-card">
//           <span>Total Projects</span>
//           <strong>{projects.length}</strong>
//           <FolderKanban size={20} />
//         </article>
//         <article className="pm-summary-card">
//           <span>In Progress</span>
//           <strong>
//             {projects.filter((p) => p.status === "In Progress").length}
//           </strong>
//           <CalendarDays size={20} />
//         </article>
//         <article className="pm-summary-card">
//           <span>Planning</span>
//           <strong>
//             {projects.filter((p) => p.status === "Planning").length}
//           </strong>
//           <Eye size={20} />
//         </article>
//         <article className="pm-summary-card">
//           <span>Recorded Order Value</span>
//           <strong>
//             {formatCurrency(
//               projects.reduce((sum, p) => sum + Number(p.orderValue || 0), 0)
//             )}
//           </strong>
//           <IndianRupee size={20} />
//         </article>
//       </div>

//       <section className="pm-panel">
//         <div className="pm-toolbar">
//           <div>
//             <h2>All Projects</h2>
//             <p>{projects.length} project(s) in this session</p>
//           </div>
//           <label className="pm-search">
//             <Search size={17} />
//             <input
//               value={search}
//               onChange={(event) => setSearch(event.target.value)}
//               placeholder="Search projects or customers..."
//             />
//           </label>
//         </div>

//         {filteredProjects.length === 0 ? (
//           <div className="pm-empty">
//             <div className="pm-empty-icon">
//               <FolderKanban size={30} />
//             </div>
//             <h3>{search ? "No matching projects" : "No projects yet"}</h3>
//             <p>
//               {search
//                 ? "Try another project ID, project name or customer."
//                 : "Create your first project to start tracking fabrication work."}
//             </p>
//             {!search && (
//               <button
//                 className="pm-primary-btn"
//                 onClick={() => setShowForm(true)}
//                 type="button"
//               >
//                 <Plus size={17} />
//                 Create First Project
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="pm-table-wrap">
//             <table className="pm-table">
//               <thead>
//                 <tr>
//                   <th>Project</th>
//                   <th>Customer</th>
//                   <th>Type</th>
//                   <th>Order Value</th>
//                   <th>Due Date</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProjects.map((project) => (
//                   <tr key={project.id}>
//                     <td>
//                       <strong>{project.name}</strong>
//                       <small>{project.id}</small>
//                     </td>
//                     <td>{project.customer}</td>
//                     <td>{project.type}</td>
//                     <td>{formatCurrency(project.orderValue)}</td>
//                     <td>{project.dueDate || "—"}</td>
//                     <td>
//                       <span
//                         className={`pm-status pm-status-${project.status
//                           .toLowerCase()
//                           .replaceAll(" ", "-")}`}
//                       >
//                         {project.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>

//       {showForm && (
//         <div
//           className="pm-modal-backdrop"
//           onMouseDown={(event) => {
//             if (event.target === event.currentTarget) {
//               setShowForm(false);
//             }
//           }}
//         >
//           <section
//             className="pm-modal"
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="pm-form-title"
//           >
//             <div className="pm-modal-header">
//               <div>
//                 <span className="pm-eyebrow">PROJECT REGISTRATION</span>
//                 <h2 id="pm-form-title">Create New Project</h2>
//                 <p>Enter the details provided by your company.</p>
//               </div>
//               <button
//                 type="button"
//                 className="pm-close-btn"
//                 onClick={() => setShowForm(false)}
//                 aria-label="Close form"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <form onSubmit={handleSave}>
//               <div className="pm-form-grid">
//                 <label className="pm-field">
//                   Project Name *
//                   <input
//                     name="name"
//                     value={form.name}
//                     onChange={updateField}
//                     placeholder="Enter project name"
//                     required
//                   />
//                 </label>

//                 <label className="pm-field">
//                   Customer / Company *
//                   <input
//                     name="customer"
//                     value={form.customer}
//                     onChange={updateField}
//                     placeholder="Enter customer name"
//                     required
//                   />
//                 </label>

//                 <label className="pm-field">
//                   Project Type
//                   <select
//                     name="type"
//                     value={form.type}
//                     onChange={updateField}
//                   >
//                     <option>Structural Steel</option>
//                     <option>Industrial Fabrication</option>
//                     <option>Equipment Manufacturing</option>
//                     <option>Other</option>
//                   </select>
//                 </label>

//                 <label className="pm-field">
//                   Order Value (₹)
//                   <input
//                     type="number"
//                     name="orderValue"
//                     value={form.orderValue}
//                     onChange={updateField}
//                     placeholder="Enter order value"
//                     min="0"
//                   />
//                 </label>

//                 <label className="pm-field">
//                   Start Date
//                   <input
//                     type="date"
//                     name="startDate"
//                     value={form.startDate}
//                     onChange={updateField}
//                   />
//                 </label>

//                 <label className="pm-field">
//                   Target Completion Date
//                   <input
//                     type="date"
//                     name="dueDate"
//                     value={form.dueDate}
//                     onChange={updateField}
//                   />
//                 </label>

//                 <label className="pm-field">
//                   Project Status
//                   <select
//                     name="status"
//                     value={form.status}
//                     onChange={updateField}
//                   >
//                     <option>Planning</option>
//                     <option>In Progress</option>
//                     <option>On Hold</option>
//                     <option>Completed</option>
//                   </select>
//                 </label>

//                 <label className="pm-field pm-field-full">
//                   Project Description
//                   <textarea
//                     name="description"
//                     value={form.description}
//                     onChange={updateField}
//                     placeholder="Enter scope, material specifications, quantity or notes"
//                     rows={3}
//                   />
//                 </label>
//               </div>

//               <div className="pm-form-footer">
//                 <button
//                   type="button"
//                   className="pm-secondary-btn"
//                   onClick={() => setShowForm(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button className="pm-primary-btn" type="submit">
//                   <Plus size={17} />
//                   Save Project
//                 </button>
//               </div>
//             </form>
//           </section>
//         </div>
//       )}
//     </div>
//   );
// }























// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   Plus,
//   Search,
//   FolderKanban,
//   X,
//   CalendarDays,
//   IndianRupee,
//   Clock3,
//   CheckCircle2,
//   CircleAlert,
//   ArrowUpRight,
//   ArrowRight,
//   Layers3,
//   ClipboardList,
//   PackageCheck,
//   SlidersHorizontal,
//   ChartNoAxesCombined,
//   Building2,
//   RefreshCw,
//   ChevronRight,
// } from "lucide-react";
// import "./ProjectManagement.css";

// const API_URL = "http://localhost:5000/api/projects";

// const emptyForm = {
//   projectCode: "",
//   name: "",
//   customer: "",
//   workOrderNumber: "",
//   type: "Structural Steel",
//   orderValue: "",
//   startDate: "",
//   dueDate: "",
//   priority: "MEDIUM",
//   status: "Planning",
//   description: "",
// };

// const mapProject = (project) => ({
//   ...project,
//   name: project.projectName,
//   customer: project.customerName,
//   type: project.projectType,
//   projectCode: project.projectCode || "",
//   workOrderNumber: project.workOrderNumber || "",
//   dueDate: project.deliveryDate
//     ? String(project.deliveryDate).slice(0, 10)
//     : "",
//   startDate: project.startDate
//     ? String(project.startDate).slice(0, 10)
//     : "",
//   status:
//     ({
//       PLANNING: "Planning",
//       "IN PROGRESS": "In Progress",
//       COMPLETED: "Completed",
//       "ON HOLD": "On Hold",
//     })[String(project.status).toUpperCase()] || project.status,
// });

// const statusClass = (status) =>
//   (status || "Planning").toLowerCase().replaceAll(" ", "-");

// const formatCurrency = (value) =>
//   Number(value || 0).toLocaleString("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   });

// const formatDate = (date) => {
//   if (!date) return "Not scheduled";

//   const dateOnly = String(date).slice(0, 10);
//   const parsedDate = new Date(`${dateOnly}T00:00:00`);

//   if (Number.isNaN(parsedDate.getTime())) return "Not scheduled";

//   return parsedDate.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// export default function ProjectManagement() {
//   const [projects, setProjects] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [form, setForm] = useState(emptyForm);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [apiError, setApiError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   // Load projects from the MySQL database through the backend API.
//   const loadProjects = useCallback(async () => {
//     try {
//       setApiError("");

//       const response = await fetch(API_URL);
//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Projects load nahi ho sake.");
//       }

//       setProjects(
//         (result.data || []).map(mapProject)
//       );
//     } catch (error) {
//       setApiError(
//         error.message || "Backend se connection nahi ho raha."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadProjects();
//   }, [loadProjects]);

//   const counts = useMemo(
//     () => ({
//       total: projects.length,
//       planning: projects.filter((p) => p.status === "Planning").length,
//       active: projects.filter((p) => p.status === "In Progress").length,
//       completed: projects.filter((p) => p.status === "Completed").length,
//       onHold: projects.filter((p) => p.status === "On Hold").length,
//       value: projects.reduce(
//         (sum, p) => sum + Number(p.orderValue || 0),
//         0
//       ),
//     }),
//     [projects]
//   );

//   const filteredProjects = useMemo(() => {
//     const term = search.trim().toLowerCase();

//     return projects.filter((project) => {
//       const searchableText = [
//         project.id,
//         project.projectCode,
//         project.workOrderNumber,
//         project.name,
//         project.customer,
//         project.type,
//       ]
//         .filter(Boolean)
//         .join(" ")
//         .toLowerCase();

//       const matchesSearch = searchableText.includes(term);
//       const matchesStatus =
//         statusFilter === "All" || project.status === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [projects, search, statusFilter]);

//   const upcomingProjects = useMemo(() => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     return projects
//       .filter((project) => project.dueDate && project.status !== "Completed")
//       .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
//       .slice(0, 4)
//       .map((project) => ({
//         ...project,
//         overdue: new Date(`${project.dueDate}T00:00:00`) < today,
//       }));
//   }, [projects]);

//   const updateField = (event) => {
//     const { name, value } = event.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   // Save a new project in the database.
//   const handleSave = async (event) => {
//     event.preventDefault();

//     if (saving) return;

//     if (
//       form.startDate &&
//       form.dueDate &&
//       form.dueDate < form.startDate
//     ) {
//       window.alert(
//         "Delivery date cannot be earlier than the start date."
//       );
//       return;
//     }

//     setSaving(true);
//     setApiError("");
//     setSuccessMessage("");

//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           projectCode: form.projectCode.trim(),
//           projectName: form.name.trim(),
//           customerName: form.customer.trim(),
//           workOrderNumber: form.workOrderNumber.trim() || null,
//           projectType: form.type,
//           orderValue: form.orderValue || 0,
//           startDate: form.startDate || null,
//           deliveryDate: form.dueDate || null,
//           priority: form.priority,
//           status: form.status,
//           description: form.description.trim() || null,
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Project save nahi ho saka.");
//       }

//       // Add the saved database record to the current screen.
//       setProjects((previous) => [
//         mapProject(result.data),
//         ...previous,
//       ]);

//       setForm(emptyForm);
//       setShowForm(false);
//       setSearch("");
//       setStatusFilter("All");
//       setSuccessMessage("Project successfully database mein save ho gaya.");
//     } catch (error) {
//       setApiError(
//         error.message || "Project save nahi ho saka."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="pm-page">
//       <header className="pm-heading">
//         <div className="pm-heading-copy">
//           <div className="pm-breadcrumb">
//             <span>Workspace</span>
//             <ChevronRight size={14} />
//             <span>Project Operations</span>
//           </div>

//           <span className="pm-eyebrow">
//             <span className="pm-live-dot" />
//             PROJECT OPERATIONS
//           </span>

//           <h1>Project Management</h1>
//           <p>
//             Plan, track and deliver fabrication projects with confidence.
//           </p>
//         </div>

//         <button
//           className="pm-primary-btn"
//           onClick={() => {
//             setApiError("");
//             setSuccessMessage("");
//             setShowForm(true);
//           }}
//           type="button"
//         >
//           <Plus size={18} />
//           Create New Project
//         </button>
//       </header>

//       <section className="pm-welcome-banner">
//         <div className="pm-banner-content">
//           <span className="pm-banner-kicker">
//             TOPLAND ENGINE · PROJECT CONTROL
//           </span>

//           <h2>Every project. One clear view.</h2>

//           <p>
//             Keep project schedules, customer orders and delivery commitments
//             organised in one workspace.
//           </p>

//           <button
//             type="button"
//             className="pm-banner-link"
//             onClick={() => {
//               setApiError("");
//               setSuccessMessage("");
//               setShowForm(true);
//             }}
//           >
//             Set up a project <ArrowRight size={16} />
//           </button>
//         </div>

//         <div className="pm-banner-art" aria-hidden="true">
//           <div className="pm-art-ring pm-art-ring-one" />
//           <div className="pm-art-ring pm-art-ring-two" />

//           <div className="pm-art-card">
//             <Layers3 size={29} />
//             <span>PROJECT CONTROL</span>
//             <strong>{String(counts.total).padStart(2, "0")}</strong>
//             <small>Projects tracked</small>
//           </div>

//           <div className="pm-art-chip">
//             <CheckCircle2 size={15} /> Organised workflow
//           </div>
//         </div>
//       </section>

//       <section className="pm-summary-grid">
//         <article className="pm-summary-card pm-card-blue">
//           <div className="pm-card-top">
//             <span>Total Projects</span>
//             <span className="pm-metric-icon">
//               <FolderKanban size={19} />
//             </span>
//           </div>

//           <strong className="pm-metric-value">{counts.total}</strong>

//           <div className="pm-card-bottom">
//             <span>Across all project stages</span>
//             <ArrowUpRight size={16} />
//           </div>

//           <div className="pm-card-accent" />
//         </article>

//         <article className="pm-summary-card">
//           <div className="pm-card-top">
//             <span>In Progress</span>
//             <span className="pm-metric-icon pm-icon-green">
//               <RefreshCw size={19} />
//             </span>
//           </div>

//           <strong className="pm-metric-value">{counts.active}</strong>

//           <div className="pm-card-bottom">
//             <span>Currently active</span>
//             <span className="pm-mini-dot green" />
//           </div>
//         </article>

//         <article className="pm-summary-card">
//           <div className="pm-card-top">
//             <span>Planning</span>
//             <span className="pm-metric-icon pm-icon-violet">
//               <ClipboardList size={19} />
//             </span>
//           </div>

//           <strong className="pm-metric-value">{counts.planning}</strong>

//           <div className="pm-card-bottom">
//             <span>Awaiting execution</span>
//             <span className="pm-mini-dot violet" />
//           </div>
//         </article>

//         <article className="pm-summary-card">
//           <div className="pm-card-top">
//             <span>Completed</span>
//             <span className="pm-metric-icon pm-icon-teal">
//               <CheckCircle2 size={19} />
//             </span>
//           </div>

//           <strong className="pm-metric-value">{counts.completed}</strong>

//           <div className="pm-card-bottom">
//             <span>Successfully completed</span>
//             <span className="pm-mini-dot teal" />
//           </div>
//         </article>

//         <article className="pm-summary-card pm-value-card">
//           <div className="pm-card-top">
//             <span>Recorded Order Value</span>
//             <span className="pm-metric-icon pm-icon-amber">
//               <IndianRupee size={19} />
//             </span>
//           </div>

//           <strong className="pm-metric-value pm-value-number">
//             {formatCurrency(counts.value)}
//           </strong>

//           <div className="pm-card-bottom">
//             <span>Sum of entered project values</span>
//           </div>
//         </article>
//       </section>

//       <section className="pm-insights-grid">
//         <article className="pm-panel pm-overview-panel">
//           <div className="pm-section-heading">
//             <div>
//               <span className="pm-section-kicker">WORKLOAD SNAPSHOT</span>
//               <h2>Project Overview</h2>
//               <p>See how projects are distributed across stages.</p>
//             </div>

//             <span className="pm-section-icon">
//               <ChartNoAxesCombined size={20} />
//             </span>
//           </div>

//           <div className="pm-overview-content">
//             <div className="pm-donut-wrap">
//               <div
//                 className="pm-donut"
//                 style={{
//                   "--planning": counts.total
//                     ? (counts.planning / counts.total) * 100
//                     : 0,
//                   "--active": counts.total
//                     ? (counts.active / counts.total) * 100
//                     : 0,
//                   "--completed": counts.total
//                     ? (counts.completed / counts.total) * 100
//                     : 0,
//                 }}
//               >
//                 <div className="pm-donut-center">
//                   <strong>{counts.total}</strong>
//                   <span>Total</span>
//                 </div>
//               </div>
//             </div>

//             <div className="pm-legend">
//               <div>
//                 <span className="pm-legend-dot planning" />
//                 <span>Planning</span>
//                 <strong>{counts.planning}</strong>
//               </div>

//               <div>
//                 <span className="pm-legend-dot active" />
//                 <span>In Progress</span>
//                 <strong>{counts.active}</strong>
//               </div>

//               <div>
//                 <span className="pm-legend-dot completed" />
//                 <span>Completed</span>
//                 <strong>{counts.completed}</strong>
//               </div>

//               <div>
//                 <span className="pm-legend-dot hold" />
//                 <span>On Hold</span>
//                 <strong>{counts.onHold}</strong>
//               </div>
//             </div>
//           </div>

//           {counts.total === 0 && (
//             <div className="pm-insight-note">
//               <CircleAlert size={16} />
//               Your overview will populate when you add your first project.
//             </div>
//           )}
//         </article>

//         <article className="pm-panel pm-delivery-panel">
//           <div className="pm-section-heading">
//             <div>
//               <span className="pm-section-kicker">DEADLINE TRACKER</span>
//               <h2>Upcoming Deliveries</h2>
//               <p>Keep an eye on target completion dates.</p>
//             </div>

//             <span className="pm-section-icon pm-delivery-icon">
//               <CalendarDays size={20} />
//             </span>
//           </div>

//           {upcomingProjects.length > 0 ? (
//             <div className="pm-delivery-list">
//               {upcomingProjects.map((project) => {
//                 const deliveryDate = new Date(
//                   `${project.dueDate}T00:00:00`
//                 );

//                 return (
//                   <div className="pm-delivery-item" key={project.id}>
//                     <div
//                       className={`pm-date-tile ${
//                         project.overdue ? "is-overdue" : ""
//                       }`}
//                     >
//                       <strong>{deliveryDate.getDate()}</strong>
//                       <span>
//                         {deliveryDate.toLocaleDateString("en-IN", {
//                           month: "short",
//                         })}
//                       </span>
//                     </div>

//                     <div className="pm-delivery-info">
//                       <strong>{project.name}</strong>
//                       <span>{project.customer || "Customer not specified"}</span>
//                     </div>

//                     <span
//                       className={`pm-deadline-label ${
//                         project.overdue ? "overdue" : ""
//                       }`}
//                     >
//                       {project.overdue ? "Overdue" : "Target"}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="pm-delivery-empty">
//               <div className="pm-empty-mini-icon">
//                 <CalendarDays size={21} />
//               </div>

//               <strong>No delivery dates to display</strong>
//               <span>
//                 Project deadlines will appear here once projects are added.
//               </span>
//             </div>
//           )}
//         </article>
//       </section>

//       <section className="pm-panel pm-projects-panel">
//         <div className="pm-toolbar">
//           <div className="pm-section-heading pm-table-heading">
//             <div>
//               <span className="pm-section-kicker">PROJECT REGISTER</span>
//               <h2>
//                 All Projects <span className="pm-count-pill">{projects.length}</span>
//               </h2>
//               <p>Search and manage your fabrication project records.</p>
//             </div>
//           </div>

//           <div className="pm-toolbar-actions">
//             <label className="pm-search">
//               <Search size={17} />

//               <input
//                 value={search}
//                 onChange={(event) => setSearch(event.target.value)}
//                 placeholder="Search projects, customers..."
//                 aria-label="Search projects and customers"
//               />

//               {search && (
//                 <button
//                   type="button"
//                   onClick={() => setSearch("")}
//                   aria-label="Clear search"
//                 >
//                   <X size={15} />
//                 </button>
//               )}
//             </label>

//             <label className="pm-filter">
//               <SlidersHorizontal size={16} />

//               <select
//                 value={statusFilter}
//                 onChange={(event) => setStatusFilter(event.target.value)}
//                 aria-label="Filter by project status"
//               >
//                 <option value="All">All statuses</option>
//                 <option value="Planning">Planning</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="On Hold">On Hold</option>
//                 <option value="Completed">Completed</option>
//               </select>
//             </label>

//             <button
//               type="button"
//               className="pm-secondary-btn"
//               onClick={loadProjects}
//               disabled={loading}
//             >
//               <RefreshCw size={15} />
//               {loading ? "Loading..." : "Refresh"}
//             </button>
//           </div>
//         </div>

//         {apiError && (
//           <div className="pm-insight-note" role="alert">
//             <CircleAlert size={17} />
//             <span>{apiError}</span>
//             <button type="button" onClick={loadProjects}>
//               Retry
//             </button>
//           </div>
//         )}

//         {successMessage && (
//           <div className="pm-insight-note" role="status">
//             <CheckCircle2 size={17} />
//             <span>{successMessage}</span>
//           </div>
//         )}

//         {loading ? (
//           <div className="pm-delivery-empty" role="status">
//             <RefreshCw size={22} />
//             <strong>Loading projects...</strong>
//             <span>Fetching project records from the database.</span>
//           </div>
//         ) : filteredProjects.length === 0 ? (
//           <div className="pm-empty">
//             <div className="pm-empty-illustration">
//               <div className="pm-empty-orbit" />
//               <div className="pm-empty-icon">
//                 <FolderKanban size={29} />
//               </div>
//               <span className="pm-float-icon pm-float-one">
//                 <CalendarDays size={17} />
//               </span>
//               <span className="pm-float-icon pm-float-two">
//                 <PackageCheck size={17} />
//               </span>
//             </div>

//             <span className="pm-empty-kicker">
//               {search || statusFilter !== "All"
//                 ? "NO MATCHES FOUND"
//                 : "YOUR WORKSPACE IS READY"}
//             </span>

//             <h3>
//               {search || statusFilter !== "All"
//                 ? "No matching projects"
//                 : "Let's get your first project started"}
//             </h3>

//             <p>
//               {search || statusFilter !== "All"
//                 ? "Try changing your search or selecting a different status filter."
//                 : "Add a fabrication project to begin tracking customer orders, deadlines and project status in one place."}
//             </p>

//             {search || statusFilter !== "All" ? (
//               <button
//                 type="button"
//                 className="pm-secondary-btn"
//                 onClick={() => {
//                   setSearch("");
//                   setStatusFilter("All");
//                 }}
//               >
//                 Clear filters
//               </button>
//             ) : (
//               <button
//                 className="pm-primary-btn"
//                 onClick={() => {
//                   setApiError("");
//                   setSuccessMessage("");
//                   setShowForm(true);
//                 }}
//                 type="button"
//               >
//                 <Plus size={17} /> Create Your First Project
//               </button>
//             )}

//             <div className="pm-empty-footnote">
//               <CheckCircle2 size={15} />
//               Project records will appear here after creation.
//             </div>
//           </div>
//         ) : (
//           <div className="pm-table-wrap">
//             <table className="pm-table">
//               <thead>
//                 <tr>
//                   <th>Project Details</th>
//                   <th>Customer</th>
//                   <th>Project Type</th>
//                   <th>Order Value</th>
//                   <th>Target Delivery</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredProjects.map((project) => (
//                   <tr key={project.id}>
//                     <td>
//                       <div className="pm-project-cell">
//                         <span className="pm-project-row-icon">
//                           <FolderKanban size={17} />
//                         </span>

//                         <span>
//                           <strong>{project.name}</strong>
//                           <small>{project.projectCode || `ID: ${project.id}`}</small>
//                         </span>
//                       </div>
//                     </td>

//                     <td>
//                       <span className="pm-customer-cell">
//                         <Building2 size={15} />
//                         {project.customer}
//                       </span>
//                     </td>

//                     <td>{project.type}</td>

//                     <td className="pm-money-cell">
//                       {formatCurrency(project.orderValue)}
//                     </td>

//                     <td>
//                       <span className="pm-date-cell">
//                         <CalendarDays size={14} />
//                         {formatDate(project.dueDate)}
//                       </span>
//                     </td>

//                     <td>
//                       <span
//                         className={`pm-status pm-status-${statusClass(
//                           project.status
//                         )}`}
//                       >
//                         {project.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div className="pm-table-footer">
//           <span>
//             Showing <strong>{filteredProjects.length}</strong> of{" "}
//             <strong>{projects.length}</strong> projects
//           </span>

//           <span>
//             <span className="pm-live-dot" /> Database-connected workspace
//           </span>
//         </div>
//       </section>

//       <div className="pm-bottom-note">
//         <span>
//           <Clock3 size={15} />
//           Keep project dates and statuses up to date for reliable tracking.
//         </span>

//         <span>TOPLAND ENGINE · PROJECT OPERATIONS</span>
//       </div>

//       {showForm && (
//         <div
//           className="pm-modal-backdrop"
//           onMouseDown={(event) => {
//             if (event.target === event.currentTarget && !saving) {
//               setShowForm(false);
//             }
//           }}
//         >
//           <section
//             className="pm-modal"
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="pm-form-title"
//           >
//             <div className="pm-modal-header">
//               <div>
//                 <span className="pm-eyebrow">PROJECT REGISTRATION</span>
//                 <h2 id="pm-form-title">Create New Project</h2>
//                 <p>Enter the details provided by your company.</p>
//               </div>

//               <button
//                 type="button"
//                 className="pm-close-btn"
//                 onClick={() => !saving && setShowForm(false)}
//                 aria-label="Close form"
//                 disabled={saving}
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <form onSubmit={handleSave}>
//               <div className="pm-form-grid">
//                 <label className="pm-field">
//                   Project Code *
//                   <input
//                     name="projectCode"
//                     value={form.projectCode}
//                     onChange={updateField}
//                     placeholder="e.g. PRJ-2026-001"
//                     maxLength={50}
//                     required
//                   />
//                 </label>

//                 <label className="pm-field">
//                   Project Name *
//                   <input
//                     name="name"
//                     value={form.name}
//                     onChange={updateField}
//                     placeholder="e.g. Steel Structure Fabrication"
//                     required
//                   />
//                 </label>

//                 <label className="pm-field">
//                   Customer / Company *
//                   <input
//                     name="customer"
//                     value={form.customer}
//                     onChange={updateField}
//                     placeholder="Enter customer name"
//                     required
//                   />
//                 </label>

//                 <label className="pm-field">
//                   PO / Work Order Number
//                   <input
//                     name="workOrderNumber"
//                     value={form.workOrderNumber}
//                     onChange={updateField}
//                     placeholder="Enter work order number"
//                     maxLength={100}
//                   />
//                 </label>

//                 <label className="pm-field">
//                   Project Type
//                   <select
//                     name="type"
//                     value={form.type}
//                     onChange={updateField}
//                   >
//                     <option>Structural Steel</option>
//                     <option>Industrial Fabrication</option>
//                     <option>Equipment Manufacturing</option>
//                     <option>Other</option>
//                   </select>
//                 </label>

//                 <label className="pm-field">
//                   Order Value (₹)
//                   <input
//                     type="number"
//                     name="orderValue"
//                     value={form.orderValue}
//                     onChange={updateField}
//                     placeholder="Enter order value"
//                     min="0"
//                     step="0.01"
//                   />
//                 </label>

//                 <label className="pm-field">
//                   Start Date
//                   <input
//                     type="date"
//                     name="startDate"
//                     value={form.startDate}
//                     onChange={updateField}
//                   />
//                 </label>

//                 <label className="pm-field">
//                   Target Completion Date
//                   <input
//                     type="date"
//                     name="dueDate"
//                     value={form.dueDate}
//                     onChange={updateField}
//                     min={form.startDate || undefined}
//                   />
//                 </label>

//                 <label className="pm-field">
//                   Project Status
//                   <select
//                     name="status"
//                     value={form.status}
//                     onChange={updateField}
//                   >
//                     <option>Planning</option>
//                     <option>In Progress</option>
//                     <option>On Hold</option>
//                     <option>Completed</option>
//                   </select>
//                 </label>

//                 <label className="pm-field">
//                   Priority
//                   <select
//                     name="priority"
//                     value={form.priority}
//                     onChange={updateField}
//                   >
//                     <option value="LOW">Low</option>
//                     <option value="MEDIUM">Medium</option>
//                     <option value="HIGH">High</option>
//                     <option value="URGENT">Urgent</option>
//                   </select>
//                 </label>

//                 <label className="pm-field pm-field-full">
//                   Project Description
//                   <textarea
//                     name="description"
//                     value={form.description}
//                     onChange={updateField}
//                     placeholder="Scope, material specifications, quantity or notes..."
//                     rows={3}
//                   />
//                 </label>
//               </div>

//               {apiError && (
//                 <div className="pm-insight-note" role="alert">
//                   <CircleAlert size={16} />
//                   {apiError}
//                 </div>
//               )}

//               <div className="pm-form-footer">
//                 <button
//                   type="button"
//                   className="pm-secondary-btn"
//                   onClick={() => setShowForm(false)}
//                   disabled={saving}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   className="pm-primary-btn"
//                   type="submit"
//                   disabled={saving}
//                 >
//                   <Plus size={17} />
//                   {saving ? "Saving Project..." : "Save Project"}
//                 </button>
//               </div>

//               <p className="pm-form-note">
//                 Project details will be saved to the company database.
//               </p>
//             </form>
//           </section>
//         </div>
//       )}
//     </div>
//   );
// }
















import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  FolderKanban,
  X,
  CalendarDays,
  IndianRupee,
  Clock3,
  CheckCircle2,
  CircleAlert,
  ArrowUpRight,
  ArrowRight,
  Layers3,
  ClipboardList,
  PackageCheck,
  SlidersHorizontal,
  ChartNoAxesCombined,
  Building2,
  RefreshCw,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react";
import "./ProjectManagement.css";

const API_URL = "http://localhost:5000/api/projects";

const emptyForm = {
  projectCode: "",
  name: "",
  customer: "",
  workOrderNumber: "",
  type: "Structural Steel",
  orderValue: "",
  startDate: "",
  dueDate: "",
  priority: "MEDIUM",
  status: "Planning",
  description: "",
};

const mapProject = (project) => ({
  ...project,
  name: project.projectName,
  customer: project.customerName,
  type: project.projectType,
  projectCode: project.projectCode || "",
  workOrderNumber: project.workOrderNumber || "",
  dueDate: project.deliveryDate
    ? String(project.deliveryDate).slice(0, 10)
    : "",
  startDate: project.startDate
    ? String(project.startDate).slice(0, 10)
    : "",
  status:
    ({
      PLANNING: "Planning",
      "IN PROGRESS": "In Progress",
      COMPLETED: "Completed",
      "ON HOLD": "On Hold",
    })[String(project.status).toUpperCase()] || project.status,
});

const statusClass = (status) =>
  (status || "Planning").toLowerCase().replaceAll(" ", "-");

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

const formatDate = (date) => {
  if (!date) return "Not scheduled";

  const dateOnly = String(date).slice(0, 10);
  const parsedDate = new Date(`${dateOnly}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) return "Not scheduled";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Load projects from the database.
  const loadProjects = useCallback(async () => {
    try {
      setApiError("");

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Projects load nahi ho sake.");
      }

      setProjects((result.data || []).map(mapProject));
    } catch (error) {
      setApiError(error.message || "Backend se connection nahi ho raha.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const counts = useMemo(
    () => ({
      total: projects.length,
      planning: projects.filter((p) => p.status === "Planning").length,
      active: projects.filter((p) => p.status === "In Progress").length,
      completed: projects.filter((p) => p.status === "Completed").length,
      onHold: projects.filter((p) => p.status === "On Hold").length,
      value: projects.reduce(
        (sum, p) => sum + Number(p.orderValue || 0),
        0
      ),
    }),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const term = search.trim().toLowerCase();

    return projects.filter((project) => {
      const searchableText = [
        project.id,
        project.projectCode,
        project.workOrderNumber,
        project.name,
        project.customer,
        project.type,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(term);
      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const upcomingProjects = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return projects
      .filter(
        (project) => project.dueDate && project.status !== "Completed"
      )
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 4)
      .map((project) => ({
        ...project,
        overdue: new Date(`${project.dueDate}T00:00:00`) < today,
      }));
  }, [projects]);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Open a blank form for creating a new project.
  const openCreateForm = () => {
    setEditingProject(null);
    setForm({ ...emptyForm });
    setApiError("");
    setSuccessMessage("");
    setShowForm(true);
  };

  // Open the same form with the selected project's saved details.
  const handleEdit = (project) => {
    setEditingProject(project);
    setForm({
      projectCode: project.projectCode || "",
      name: project.name || "",
      customer: project.customer || "",
      workOrderNumber: project.workOrderNumber || "",
      type: project.type || "Structural Steel",
      orderValue:
        project.orderValue === null || project.orderValue === undefined
          ? ""
          : String(project.orderValue),
      startDate: project.startDate || "",
      dueDate: project.dueDate || "",
      priority: project.priority || "MEDIUM",
      status: project.status || "Planning",
      description: project.description || "",
    });

    setApiError("");
    setSuccessMessage("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingProject(null);
    setForm({ ...emptyForm });
    setApiError("");
  };

  // Create a new project OR update an existing project in MySQL.
  const handleSave = async (event) => {
    event.preventDefault();

    if (saving) return;

    if (
      form.startDate &&
      form.dueDate &&
      form.dueDate < form.startDate
    ) {
      window.alert(
        "Delivery date cannot be earlier than the start date."
      );
      return;
    }

    setSaving(true);
    setApiError("");
    setSuccessMessage("");

    const isEditing = Boolean(editingProject);

    try {
      const payload = {
        projectCode: form.projectCode.trim(),
        projectName: form.name.trim(),
        customerName: form.customer.trim(),
        workOrderNumber: form.workOrderNumber.trim() || null,
        projectType: form.type,
        orderValue: form.orderValue === "" ? 0 : Number(form.orderValue),
        startDate: form.startDate || null,
        deliveryDate: form.dueDate || null,
        priority: form.priority,
        status: form.status,
        description: form.description.trim() || null,
      };

      const response = await fetch(
        isEditing ? `${API_URL}/${editingProject.id}` : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            (isEditing
              ? "Project update nahi ho saka."
              : "Project save nahi ho saka.")
        );
      }

      const savedProject = mapProject(result.data);

      if (isEditing) {
        setProjects((previous) =>
          previous.map((project) =>
            project.id === savedProject.id ? savedProject : project
          )
        );

        setSuccessMessage("Project database mein successfully update ho gaya.");
      } else {
        setProjects((previous) => [savedProject, ...previous]);
        setSearch("");
        setStatusFilter("All");
        setSuccessMessage("Project database mein successfully save ho gaya.");
      }

      setShowForm(false);
      setEditingProject(null);
      setForm({ ...emptyForm });
    } catch (error) {
      setApiError(error.message || "Request complete nahi ho saki.");
    } finally {
      setSaving(false);
    }
  };

  // Delete a project from the database after confirmation.
  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Kya aap "${project.name}" project ko delete karna chahte hain?\n\nYe action database se project record delete karega.`
    );

    if (!confirmed) return;

    setDeletingId(project.id);
    setApiError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_URL}/${project.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Project delete nahi ho saka.");
      }

      setProjects((previous) =>
        previous.filter((item) => item.id !== project.id)
      );

      setSuccessMessage(`"${project.name}" project successfully delete ho gaya.`);

      if (editingProject?.id === project.id) {
        setShowForm(false);
        setEditingProject(null);
        setForm({ ...emptyForm });
      }
    } catch (error) {
      setApiError(error.message || "Project delete nahi ho saka.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="pm-page">
      <header className="pm-heading">
        <div className="pm-heading-copy">
          <div className="pm-breadcrumb">
            <span>Workspace</span>
            <ChevronRight size={14} />
            <span>Project Operations</span>
          </div>

          <span className="pm-eyebrow">
            <span className="pm-live-dot" />
            PROJECT OPERATIONS
          </span>

          <h1>Project Management</h1>
          <p>
            Plan, track and deliver fabrication projects with confidence.
          </p>
        </div>

        <button
          className="pm-primary-btn"
          onClick={openCreateForm}
          type="button"
        >
          <Plus size={18} />
          Create New Project
        </button>
      </header>

      <section className="pm-welcome-banner">
        <div className="pm-banner-content">
          <span className="pm-banner-kicker">
            TOPLAND ENGINE · PROJECT CONTROL
          </span>

          <h2>Every project. One clear view.</h2>

          <p>
            Keep project schedules, customer orders and delivery commitments
            organised in one workspace.
          </p>

          <button
            type="button"
            className="pm-banner-link"
            onClick={openCreateForm}
          >
            Set up a project <ArrowRight size={16} />
          </button>
        </div>

        <div className="pm-banner-art" aria-hidden="true">
          <div className="pm-art-ring pm-art-ring-one" />
          <div className="pm-art-ring pm-art-ring-two" />

          <div className="pm-art-card">
            <Layers3 size={29} />
            <span>PROJECT CONTROL</span>
            <strong>{String(counts.total).padStart(2, "0")}</strong>
            <small>Projects tracked</small>
          </div>

          <div className="pm-art-chip">
            <CheckCircle2 size={15} /> Organised workflow
          </div>
        </div>
      </section>

      <section className="pm-summary-grid">
        <article className="pm-summary-card pm-card-blue">
          <div className="pm-card-top">
            <span>Total Projects</span>
            <span className="pm-metric-icon">
              <FolderKanban size={19} />
            </span>
          </div>

          <strong className="pm-metric-value">{counts.total}</strong>

          <div className="pm-card-bottom">
            <span>Across all project stages</span>
            <ArrowUpRight size={16} />
          </div>

          <div className="pm-card-accent" />
        </article>

        <article className="pm-summary-card">
          <div className="pm-card-top">
            <span>In Progress</span>
            <span className="pm-metric-icon pm-icon-green">
              <RefreshCw size={19} />
            </span>
          </div>

          <strong className="pm-metric-value">{counts.active}</strong>

          <div className="pm-card-bottom">
            <span>Currently active</span>
            <span className="pm-mini-dot green" />
          </div>
        </article>

        <article className="pm-summary-card">
          <div className="pm-card-top">
            <span>Planning</span>
            <span className="pm-metric-icon pm-icon-violet">
              <ClipboardList size={19} />
            </span>
          </div>

          <strong className="pm-metric-value">{counts.planning}</strong>

          <div className="pm-card-bottom">
            <span>Awaiting execution</span>
            <span className="pm-mini-dot violet" />
          </div>
        </article>

        <article className="pm-summary-card">
          <div className="pm-card-top">
            <span>Completed</span>
            <span className="pm-metric-icon pm-icon-teal">
              <CheckCircle2 size={19} />
            </span>
          </div>

          <strong className="pm-metric-value">{counts.completed}</strong>

          <div className="pm-card-bottom">
            <span>Successfully completed</span>
            <span className="pm-mini-dot teal" />
          </div>
        </article>

        <article className="pm-summary-card pm-value-card">
          <div className="pm-card-top">
            <span>Recorded Order Value</span>
            <span className="pm-metric-icon pm-icon-amber">
              <IndianRupee size={19} />
            </span>
          </div>

          <strong className="pm-metric-value pm-value-number">
            {formatCurrency(counts.value)}
          </strong>

          <div className="pm-card-bottom">
            <span>Sum of entered project values</span>
          </div>
        </article>
      </section>

      <section className="pm-insights-grid">
        <article className="pm-panel pm-overview-panel">
          <div className="pm-section-heading">
            <div>
              <span className="pm-section-kicker">WORKLOAD SNAPSHOT</span>
              <h2>Project Overview</h2>
              <p>See how projects are distributed across stages.</p>
            </div>

            <span className="pm-section-icon">
              <ChartNoAxesCombined size={20} />
            </span>
          </div>

          <div className="pm-overview-content">
            <div className="pm-donut-wrap">
              <div
                className="pm-donut"
                style={{
                  "--planning": counts.total
                    ? (counts.planning / counts.total) * 100
                    : 0,
                  "--active": counts.total
                    ? (counts.active / counts.total) * 100
                    : 0,
                  "--completed": counts.total
                    ? (counts.completed / counts.total) * 100
                    : 0,
                }}
              >
                <div className="pm-donut-center">
                  <strong>{counts.total}</strong>
                  <span>Total</span>
                </div>
              </div>
            </div>

            <div className="pm-legend">
              <div>
                <span className="pm-legend-dot planning" />
                <span>Planning</span>
                <strong>{counts.planning}</strong>
              </div>

              <div>
                <span className="pm-legend-dot active" />
                <span>In Progress</span>
                <strong>{counts.active}</strong>
              </div>

              <div>
                <span className="pm-legend-dot completed" />
                <span>Completed</span>
                <strong>{counts.completed}</strong>
              </div>

              <div>
                <span className="pm-legend-dot hold" />
                <span>On Hold</span>
                <strong>{counts.onHold}</strong>
              </div>
            </div>
          </div>

          {counts.total === 0 && (
            <div className="pm-insight-note">
              <CircleAlert size={16} />
              Your overview will populate when you add your first project.
            </div>
          )}
        </article>

        <article className="pm-panel pm-delivery-panel">
          <div className="pm-section-heading">
            <div>
              <span className="pm-section-kicker">DEADLINE TRACKER</span>
              <h2>Upcoming Deliveries</h2>
              <p>Keep an eye on target completion dates.</p>
            </div>

            <span className="pm-section-icon pm-delivery-icon">
              <CalendarDays size={20} />
            </span>
          </div>

          {upcomingProjects.length > 0 ? (
            <div className="pm-delivery-list">
              {upcomingProjects.map((project) => {
                const deliveryDate = new Date(
                  `${project.dueDate}T00:00:00`
                );

                return (
                  <div className="pm-delivery-item" key={project.id}>
                    <div
                      className={`pm-date-tile ${
                        project.overdue ? "is-overdue" : ""
                      }`}
                    >
                      <strong>{deliveryDate.getDate()}</strong>
                      <span>
                        {deliveryDate.toLocaleDateString("en-IN", {
                          month: "short",
                        })}
                      </span>
                    </div>

                    <div className="pm-delivery-info">
                      <strong>{project.name}</strong>
                      <span>{project.customer || "Customer not specified"}</span>
                    </div>

                    <span
                      className={`pm-deadline-label ${
                        project.overdue ? "overdue" : ""
                      }`}
                    >
                      {project.overdue ? "Overdue" : "Target"}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="pm-delivery-empty">
              <div className="pm-empty-mini-icon">
                <CalendarDays size={21} />
              </div>

              <strong>No delivery dates to display</strong>
              <span>
                Project deadlines will appear here once projects are added.
              </span>
            </div>
          )}
        </article>
      </section>

      <section className="pm-panel pm-projects-panel">
        <div className="pm-toolbar">
          <div className="pm-section-heading pm-table-heading">
            <div>
              <span className="pm-section-kicker">PROJECT REGISTER</span>
              <h2>
                All Projects{" "}
                <span className="pm-count-pill">{projects.length}</span>
              </h2>
              <p>Search and manage your fabrication project records.</p>
            </div>
          </div>

          <div className="pm-toolbar-actions">
            <label className="pm-search">
              <Search size={17} />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects, customers..."
                aria-label="Search projects and customers"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </label>

            <label className="pm-filter">
              <SlidersHorizontal size={16} />

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter by project status"
              >
                <option value="All">All statuses</option>
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </label>

            <button
              type="button"
              className="pm-secondary-btn"
              onClick={loadProjects}
              disabled={loading}
            >
              <RefreshCw size={15} />
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>

        {apiError && (
          <div className="pm-insight-note" role="alert">
            <CircleAlert size={17} />
            <span>{apiError}</span>
            <button type="button" onClick={loadProjects}>
              Retry
            </button>
          </div>
        )}

        {successMessage && (
          <div className="pm-insight-note" role="status">
            <CheckCircle2 size={17} />
            <span>{successMessage}</span>
          </div>
        )}

        {loading ? (
          <div className="pm-delivery-empty" role="status">
            <RefreshCw size={22} />
            <strong>Loading projects...</strong>
            <span>Fetching project records from the database.</span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="pm-empty">
            <div className="pm-empty-illustration">
              <div className="pm-empty-orbit" />
              <div className="pm-empty-icon">
                <FolderKanban size={29} />
              </div>
              <span className="pm-float-icon pm-float-one">
                <CalendarDays size={17} />
              </span>
              <span className="pm-float-icon pm-float-two">
                <PackageCheck size={17} />
              </span>
            </div>

            <span className="pm-empty-kicker">
              {search || statusFilter !== "All"
                ? "NO MATCHES FOUND"
                : "YOUR WORKSPACE IS READY"}
            </span>

            <h3>
              {search || statusFilter !== "All"
                ? "No matching projects"
                : "Let's get your first project started"}
            </h3>

            <p>
              {search || statusFilter !== "All"
                ? "Try changing your search or selecting a different status filter."
                : "Add a fabrication project to begin tracking customer orders, deadlines and project status in one place."}
            </p>

            {search || statusFilter !== "All" ? (
              <button
                type="button"
                className="pm-secondary-btn"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
              >
                Clear filters
              </button>
            ) : (
              <button
                className="pm-primary-btn"
                onClick={openCreateForm}
                type="button"
              >
                <Plus size={17} /> Create Your First Project
              </button>
            )}

            <div className="pm-empty-footnote">
              <CheckCircle2 size={15} />
              Project records will appear here after creation.
            </div>
          </div>
        ) : (
          <div className="pm-table-wrap">
            <table className="pm-table">
              <thead>
                <tr>
                  <th>Project Details</th>
                  <th>Customer</th>
                  <th>Project Type</th>
                  <th>Order Value</th>
                  <th>Target Delivery</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <div className="pm-project-cell">
                        <span className="pm-project-row-icon">
                          <FolderKanban size={17} />
                        </span>

                        <span>
                          <strong>{project.name}</strong>
                          <small>
                            {project.projectCode || `ID: ${project.id}`}
                          </small>
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="pm-customer-cell">
                        <Building2 size={15} />
                        {project.customer}
                      </span>
                    </td>

                    <td>{project.type}</td>

                    <td className="pm-money-cell">
                      {formatCurrency(project.orderValue)}
                    </td>

                    <td>
                      <span className="pm-date-cell">
                        <CalendarDays size={14} />
                        {formatDate(project.dueDate)}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`pm-status pm-status-${statusClass(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </td>

                    <td>
                      <div className="pm-row-actions">
                        <button
                          type="button"
                          className="pm-secondary-btn pm-action-btn"
                          onClick={() => handleEdit(project)}
                          disabled={deletingId === project.id || saving}
                          title={`Edit ${project.name}`}
                          aria-label={`Edit ${project.name}`}
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          className="pm-secondary-btn pm-action-btn pm-delete-btn"
                          onClick={() => handleDelete(project)}
                          disabled={deletingId === project.id || saving}
                          title={`Delete ${project.name}`}
                          aria-label={`Delete ${project.name}`}
                        >
                          <Trash2 size={15} />
                          {deletingId === project.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="pm-table-footer">
          <span>
            Showing <strong>{filteredProjects.length}</strong> of{" "}
            <strong>{projects.length}</strong> projects
          </span>

          <span>
            <span className="pm-live-dot" /> Database-connected workspace
          </span>
        </div>
      </section>

      <div className="pm-bottom-note">
        <span>
          <Clock3 size={15} />
          Keep project dates and statuses up to date for reliable tracking.
        </span>

        <span>TOPLAND ENGINE · PROJECT OPERATIONS</span>
      </div>

      {showForm && (
        <div
          className="pm-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) {
              closeForm();
            }
          }}
        >
          <section
            className="pm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pm-form-title"
          >
            <div className="pm-modal-header">
              <div>
                <span className="pm-eyebrow">
                  {editingProject ? "EDIT PROJECT DETAILS" : "PROJECT REGISTRATION"}
                </span>

                <h2 id="pm-form-title">
                  {editingProject ? "Edit Project" : "Create New Project"}
                </h2>

                <p>
                  {editingProject
                    ? "Update the project details and save your changes."
                    : "Enter the details provided by your company."}
                </p>
              </div>

              <button
                type="button"
                className="pm-close-btn"
                onClick={closeForm}
                aria-label="Close form"
                disabled={saving}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="pm-form-grid">
                <label className="pm-field">
                  Project Code *
                  <input
                    name="projectCode"
                    value={form.projectCode}
                    onChange={updateField}
                    placeholder="e.g. PRJ-2026-001"
                    maxLength={50}
                    required
                  />
                </label>

                <label className="pm-field">
                  Project Name *
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder="e.g. Steel Structure Fabrication"
                    required
                  />
                </label>

                <label className="pm-field">
                  Customer / Company *
                  <input
                    name="customer"
                    value={form.customer}
                    onChange={updateField}
                    placeholder="Enter customer name"
                    required
                  />
                </label>

                <label className="pm-field">
                  PO / Work Order Number
                  <input
                    name="workOrderNumber"
                    value={form.workOrderNumber}
                    onChange={updateField}
                    placeholder="Enter work order number"
                    maxLength={100}
                  />
                </label>

                <label className="pm-field">
                  Project Type
                  <select
                    name="type"
                    value={form.type}
                    onChange={updateField}
                  >
                    <option>Structural Steel</option>
                    <option>Industrial Fabrication</option>
                    <option>Equipment Manufacturing</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="pm-field">
                  Order Value (₹)
                  <input
                    type="number"
                    name="orderValue"
                    value={form.orderValue}
                    onChange={updateField}
                    placeholder="Enter order value"
                    min="0"
                    step="0.01"
                  />
                </label>

                <label className="pm-field">
                  Start Date
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={updateField}
                  />
                </label>

                <label className="pm-field">
                  Target Completion Date
                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={updateField}
                    min={form.startDate || undefined}
                  />
                </label>

                <label className="pm-field">
                  Project Status
                  <select
                    name="status"
                    value={form.status}
                    onChange={updateField}
                  >
                    <option>Planning</option>
                    <option>In Progress</option>
                    <option>On Hold</option>
                    <option>Completed</option>
                  </select>
                </label>

                <label className="pm-field">
                  Priority
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={updateField}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </label>

                <label className="pm-field pm-field-full">
                  Project Description
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={updateField}
                    placeholder="Scope, material specifications, quantity or notes..."
                    rows={3}
                  />
                </label>
              </div>

              {apiError && (
                <div className="pm-insight-note" role="alert">
                  <CircleAlert size={16} />
                  {apiError}
                </div>
              )}

              <div className="pm-form-footer">
                <button
                  type="button"
                  className="pm-secondary-btn"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  className="pm-primary-btn"
                  type="submit"
                  disabled={saving}
                >
                  {saving ? (
                    <RefreshCw size={17} />
                  ) : editingProject ? (
                    <Pencil size={17} />
                  ) : (
                    <Plus size={17} />
                  )}

                  {saving
                    ? editingProject
                      ? "Updating Project..."
                      : "Saving Project..."
                    : editingProject
                      ? "Update Project"
                      : "Save Project"}
                </button>
              </div>

              <p className="pm-form-note">
                Project details will be saved to the company database.
              </p>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
