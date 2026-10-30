
// import { useEffect, useMemo, useState } from "react";

// import "./DesignBOM.css";

// const initialDrawings = [
//   {
//     id: 1,
//     number: "DWG-001",
//     name: "Steel Platform Assembly",
//     project: "PRJ-001",
//     engineer: "Design Team",
//     revision: "Rev 00",
//     date: "2026-10-25",
//     status: "Under Review",
//     remarks: "Initial drawing",
//     fileName: "",
//   },
// ];

// const initialMaterials = [
//   {
//     id: 1,
//     project: "PRJ-001",
//     name: "MS Plate",
//     grade: "IS 2062 E250",
//     size: "10 mm",
//     length: "2400",
//     width: "1200",
//     quantity: 8,
//     unit: "Sheet",
//     weight: 180.96,
//     remarks: "Sample material",
//   },
// ];

// const statusOptions = [
//   "Draft",
//   "Under Review",
//   "Changes Required",
//   "Approved",
//   "Rejected",
// ];

// function DesignBOM() {
//   const [activeTab, setActiveTab] = useState("documents");
//  const [drawings, setDrawings] = useState([]);
//   const [materials, setMaterials] = useState(initialMaterials);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [showDrawingForm, setShowDrawingForm] = useState(false);
//   const [showBomForm, setShowBomForm] = useState(false);
//   const [selectedDrawing, setSelectedDrawing] = useState(null);
//   const [previewFile, setPreviewFile] = useState(null);
//   const [notice, setNotice] = useState("");

//   const [drawingForm, setDrawingForm] = useState({
//     number: "",
//     name: "",
//     project: "",
//     engineer: "",
//     date: new Date().toISOString().slice(0, 10),
//     remarks: "",
//     file: null,
//   });

//   const [bomForm, setBomForm] = useState({
//     project: "",
//     name: "",
//     grade: "",
//     size: "",
//     length: "",
//     width: "",
//     quantity: "1",
//     unit: "Piece",
//     weight: "",
//     remarks: "",
//   });

//   const filteredDrawings = useMemo(() => {
//     return drawings.filter((drawing) => {
//       const text = [
//         drawing.number,
//         drawing.name,
//         drawing.project,
//         drawing.engineer,
//       ]
//         .join(" ")
//         .toLowerCase();

//       return (
//         text.includes(search.toLowerCase()) &&
//         (statusFilter === "All" || drawing.status === statusFilter)
//       );
//     });
//   }, [drawings, search, statusFilter]);

//   const totalWeight = materials.reduce(
//     (sum, item) => sum + Number(item.weight || 0) * Number(item.quantity || 0),
//     0
//   );

//   const approvedCount = drawings.filter(
//     (item) => item.status === "Approved"
//   ).length;

//   const pendingCount = drawings.filter((item) =>
//     ["Draft", "Under Review", "Changes Required"].includes(item.status)
//   ).length;

//   const notify = (message) => {
//     setNotice(message);
//     window.setTimeout(() => setNotice(""), 3500);
//   };

//   const updateDrawingForm = (event) => {
//     const { name, value, files } = event.target;
//     setDrawingForm((previous) => ({
//       ...previous,
//       [name]: name === "file" ? files?.[0] || null : value,
//     }));
//   };

//   const updateBomForm = (event) => {
//     const { name, value } = event.target;
//     setBomForm((previous) => ({ ...previous, [name]: value }));
//   };

//   const saveDrawing = (event) => {
//     event.preventDefault();

//     if (!drawingForm.number.trim() || !drawingForm.name.trim() || !drawingForm.project.trim()) {
//       notify("Drawing Number, Drawing Name aur Project ID required hain.");
//       return;
//     }


//     // const newDrawing = {
//     //   ...drawingForm,
//     //   id: Date.now(),
//     //   revision: "Rev 00",
//     //   status: "Draft",
//     //   fileName: drawingForm.file?.name || "",
//     // };

     
// const newDrawing = {
//   ...drawingForm,
//   id: Date.now(),
//   revision: "Rev 00",
//   status: "Draft",
//   fileName: drawingForm.file?.name || "",
//   fileUrl: drawingForm.file
//     ? URL.createObjectURL(drawingForm.file)
//     : "",
// };

//     setDrawings((previous) => [newDrawing, ...previous]);
//     setShowDrawingForm(false);
//     setDrawingForm({
//       number: "",
//       name: "",
//       project: "",
//       engineer: "",
//       date: new Date().toISOString().slice(0, 10),
//       remarks: "",
//       file: null,
//     });
//     notify("Drawing demo list mein add ho gayi.");
//   };


//   const saveBom = (event) => {
//     event.preventDefault();

//     if (!bomForm.project.trim() || !bomForm.name.trim()) {
//       notify("Project ID aur Material Name required hain.");
//       return;
//     }

//     const newMaterial = {
//       ...bomForm,
//       id: Date.now(),
//       quantity: Number(bomForm.quantity) || 0,
//       weight: Number(bomForm.weight) || 0,
//     };

//     setMaterials((previous) => [newMaterial, ...previous]);
//     setShowBomForm(false);
//     setBomForm({
//       project: "",
//       name: "",
//       grade: "",
//       size: "",
//       length: "",
//       width: "",
//       quantity: "1",
//       unit: "Piece",
//       weight: "",
//       remarks: "",
//     });
//     notify("Material demo BOM mein add ho gaya.");
//   };

//   const changeStatus = (id, status) => {
//     setDrawings((previous) =>
//       previous.map((drawing) =>
//         drawing.id === id ? { ...drawing, status } : drawing
//       )
//     );
//     notify(`Demo status updated: ${status}`);
//   };

//   const addRevision = (drawing) => {
//     const revisionNumber =
//       Number.parseInt(drawing.revision.replace(/\D/g, ""), 10) || 0;
//     const nextRevision = `Rev ${String(revisionNumber + 1).padStart(2, "0")}`;

//     setDrawings((previous) =>
//       previous.map((item) =>
//         item.id === drawing.id
//           ? {
//               ...item,
//               revision: nextRevision,
//               status: "Under Review",
//               remarks: `${item.remarks || ""} | New revision created`,
//             }
//           : item
//       )
//     );

//     notify(`${nextRevision} demo revision created. Production history abhi connect nahi hai.`);
//   };

//   const tabs = [
//     { id: "documents", label: "Design Documents" },
//     { id: "revisions", label: "Drawing Revisions" },
//     { id: "bom", label: "Bill of Materials" },
//     { id: "approval", label: "Design Approval" },
//     { id: "summary", label: "Material Summary" },
//     { id: "activity", label: "Activity History" },
//   ];

//   return (
//     <main className="dbom-page">
//       <header className="dbom-page-header">
//         <div>
//           <div className="dbom-eyebrow">ENGINEERING WORKSPACE</div>
//           <h1>Design &amp; BOM</h1>
//           <p>Manage engineering drawings, revisions and project material requirements.</p>
//         </div>
//         <div className="dbom-header-actions">
//           <button className="dbom-btn dbom-btn-light" onClick={() => setShowBomForm(true)}>
//             + Create BOM
//           </button>
//           <button className="dbom-btn dbom-btn-primary" onClick={() => setShowDrawingForm(true)}>
//             + Upload Drawing
//           </button>
//         </div>
//       </header>

//       {notice && <div className="dbom-notice" role="status">{notice}</div>}

//       <section className="dbom-metrics">
//         <article className="dbom-metric-card">
//           <div className="dbom-metric-icon blue">▤</div>
//           <span>Total Drawings</span>
//           <strong>{drawings.length}</strong>
//           <small>Drawing records in this demo</small>
//         </article>
//         <article className="dbom-metric-card">
//           <div className="dbom-metric-icon amber">◷</div>
//           <span>Pending Review</span>
//           <strong>{pendingCount}</strong>
//           <small>Drafts and review items</small>
//         </article>
//         <article className="dbom-metric-card">
//           <div className="dbom-metric-icon purple">▦</div>
//           <span>BOM Items</span>
//           <strong>{materials.length}</strong>
//           <small>Material line items</small>
//         </article>
//         <article className="dbom-metric-card">
//           <div className="dbom-metric-icon green">✓</div>
//           <span>Approved Designs</span>
//           <strong>{approvedCount}</strong>
//           <small>Currently marked approved</small>
//         </article>
//       </section>

//       <section className="dbom-workspace">
//         <nav className="dbom-tabs" aria-label="Design and BOM sections">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               className={`dbom-tab ${activeTab === tab.id ? "active" : ""}`}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </nav>

//         {activeTab === "documents" && (
//           <section className="dbom-panel">
//             <div className="dbom-panel-heading">
//               <div>
//                 <h2>Design Documents</h2>
//                 <p>Engineering drawing register for fabrication projects.</p>
//               </div>
//               <button className="dbom-btn dbom-btn-primary" onClick={() => setShowDrawingForm(true)}>
//                 + Add Drawing
//               </button>
//             </div>

//             <div className="dbom-filters">
//               <input
//                 value={search}
//                 onChange={(event) => setSearch(event.target.value)}
//                 placeholder="Search drawing, project or engineer..."
//                 aria-label="Search drawings"
//               />
//               <select
//                 value={statusFilter}
//                 onChange={(event) => setStatusFilter(event.target.value)}
//                 aria-label="Filter by status"
//               >
//                 <option value="All">All statuses</option>
//                 {statusOptions.map((status) => (
//                   <option key={status}>{status}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="dbom-table-wrap">
//               <table className="dbom-table">
//                 <thead>
//                   <tr>
//                     <th>Drawing</th>
//                     <th>Project ID</th>
//                     <th>Engineer</th>
//                     <th>Revision</th>
//                     <th>Upload Date</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredDrawings.map((drawing) => (
//                     <tr key={drawing.id}>
//                       <td>
//                         <strong>{drawing.number}</strong>
//                         <small>{drawing.name}</small>
//                         {drawing.fileName && <small>File: {drawing.fileName}</small>}
//                       </td>
//                       <td>{drawing.project}</td>
//                       <td>{drawing.engineer || "—"}</td>
//                       <td>{drawing.revision}</td>
//                       <td>{drawing.date}</td>
//                       <td>
//                         <span className={`dbom-status ${drawing.status.toLowerCase().replaceAll(" ", "-")}`}>
//                           {drawing.status}
//                         </span>
//                       </td>
//                       <td>

//                         {/* <div className="dbom-row-actions">
//                           <button onClick={() => setSelectedDrawing(drawing)}>Details</button>
//                           <button onClick={() => addRevision(drawing)}>New revision</button>
//                         </div> */}

                     
                      
//                    <div className="dbom-row-actions">
//                         {drawing.fileUrl && (
//                            <button
//                                   type="button"
//                             onClick={() => setPreviewFile(drawing)}
//                               >
//                                   View
//                               </button>
//                              )}

//                       <button onClick={() => setSelectedDrawing(drawing)}>
//                                  Details
//                            </button>

//                        <button onClick={() => addRevision(drawing)}>
//                                 New revision
//                             </button>
//                          </div>




//                       </td>
//                     </tr>
//                   ))}
//                   {filteredDrawings.length === 0 && (
//                     <tr><td colSpan="7" className="dbom-empty">No drawings match your search.</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//             <p className="dbom-demo-note">Demo mode: records currently remain in page state only; backend persistence is not connected.</p>
//           </section>
//         )}

//         {activeTab === "revisions" && (
//           <section className="dbom-panel">
//             <div className="dbom-panel-heading">
//               <div>
//                 <h2>Drawing Revisions</h2>
//                 <p>Track current revision and revision updates.</p>
//               </div>
//             </div>
//             <div className="dbom-table-wrap">
//               <table className="dbom-table">
//                 <thead><tr><th>Drawing Number</th><th>Drawing Name</th><th>Current Revision</th><th>Revision Date</th><th>Change Description</th><th>Action</th></tr></thead>
//                 <tbody>
//                   {drawings.map((drawing) => (
//                     <tr key={drawing.id}>
//                       <td>{drawing.number}</td>
//                       <td>{drawing.name}</td>
//                       <td>{drawing.revision}</td>
//                       <td>{drawing.date}</td>
//                       <td>{drawing.remarks || "—"}</td>
//                       <td><button className="dbom-text-btn" onClick={() => addRevision(drawing)}>Create revision</button></td>
//                     </tr>
//                   ))}
//                   {drawings.length === 0 && <tr><td colSpan="6" className="dbom-empty">No revision records yet.</td></tr>}
//                 </tbody>
//               </table>
//             </div>
//             <p className="dbom-demo-note">Demo limitation: full historical snapshots of old revisions are not yet stored.</p>
//           </section>
//         )}

//         {activeTab === "bom" && (
//           <section className="dbom-panel">
//             <div className="dbom-panel-heading">
//               <div>
//                 <h2>Bill of Materials</h2>
//                 <p>Material requirements linked to a project.</p>
//               </div>
//               <button className="dbom-btn dbom-btn-primary" onClick={() => setShowBomForm(true)}>+ Add Material</button>
//             </div>
//             <div className="dbom-table-wrap">
//               <table className="dbom-table">
//                 <thead><tr><th>Project</th><th>Material / Grade</th><th>Size</th><th>Length × Width</th><th>Quantity</th><th>Unit</th><th>Weight / Unit (kg)</th><th>Remarks</th></tr></thead>
//                 <tbody>
//                   {materials.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.project}</td>
//                       <td><strong>{item.name}</strong><small>{item.grade || "Grade not specified"}</small></td>
//                       <td>{item.size || "—"}</td>
//                       <td>{item.length || "—"} × {item.width || "—"}</td>
//                       <td>{item.quantity}</td>
//                       <td>{item.unit}</td>
//                       <td>{Number(item.weight || 0).toFixed(2)}</td>
//                       <td>{item.remarks || "—"}</td>
//                     </tr>
//                   ))}
//                   {materials.length === 0 && <tr><td colSpan="8" className="dbom-empty">No BOM items yet. Add your first material.</td></tr>}
//                 </tbody>
//               </table>
//             </div>
//             <p className="dbom-demo-note">Enter weight per unit; total material weight is quantity × weight per unit.</p>
//           </section>
//         )}

//         {activeTab === "approval" && (
//           <section className="dbom-panel">
//             <div className="dbom-panel-heading">
//               <div>
//                 <h2>Design Approval</h2>
//                 <p>Track the review status of each drawing.</p>
//               </div>
//             </div>
//             <div className="dbom-table-wrap">
//               <table className="dbom-table">
//                 <thead><tr><th>Drawing</th><th>Project</th><th>Engineer</th><th>Current Status</th><th>Update Demo Status</th></tr></thead>
//                 <tbody>
//                   {drawings.map((drawing) => (
//                     <tr key={drawing.id}>
//                       <td><strong>{drawing.number}</strong><small>{drawing.name}</small></td>
//                       <td>{drawing.project}</td>
//                       <td>{drawing.engineer || "—"}</td>
//                       <td><span className={`dbom-status ${drawing.status.toLowerCase().replaceAll(" ", "-")}`}>{drawing.status}</span></td>
//                       <td>
//                         <select value={drawing.status} onChange={(event) => changeStatus(drawing.id, event.target.value)} aria-label={`Update ${drawing.number} status`}>
//                           {statusOptions.map((status) => <option key={status}>{status}</option>)}
//                         </select>
//                       </td>
//                     </tr>
//                   ))}
//                   {drawings.length === 0 && <tr><td colSpan="5" className="dbom-empty">No drawings to review.</td></tr>}
//                 </tbody>
//               </table>
//             </div>
//             <p className="dbom-demo-note">Important: approval permissions are not enforced yet. Connect authenticated backend roles before production use.</p>
//           </section>
//         )}

//         {activeTab === "summary" && (
//           <section className="dbom-panel">
//             <div className="dbom-panel-heading">
//               <div>
//                 <h2>Material Summary</h2>
//                 <p>Overview of material quantities and estimated weight.</p>
//               </div>
//             </div>
//             <div className="dbom-summary-grid">
//               <article><span>Total BOM Lines</span><strong>{materials.length}</strong></article>
//               <article><span>Total Item Quantity</span><strong>{materials.reduce((sum, item) => sum + Number(item.quantity || 0), 0)}</strong></article>
//               <article><span>Estimated Total Weight</span><strong>{totalWeight.toLocaleString("en-IN", { maximumFractionDigits: 2 })} kg</strong></article>
//             </div>
//             <div className="dbom-table-wrap">
//               <table className="dbom-table">
//                 <thead><tr><th>Material</th><th>Grade</th><th>Size</th><th>Total Quantity</th><th>Unit</th><th>Estimated Weight</th></tr></thead>
//                 <tbody>
//                   {materials.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.name}</td><td>{item.grade || "—"}</td><td>{item.size || "—"}</td><td>{item.quantity}</td><td>{item.unit}</td><td>{(Number(item.weight || 0) * Number(item.quantity || 0)).toFixed(2)} kg</td>
//                     </tr>
//                   ))}
//                   {materials.length === 0 && <tr><td colSpan="6" className="dbom-empty">No material data to summarise.</td></tr>}
//                 </tbody>
//               </table>
//             </div>
//             <p className="dbom-demo-note">Inventory and Purchase integration will be added after their workflows are confirmed.</p>
//           </section>
//         )}

//         {activeTab === "activity" && (
//           <section className="dbom-panel">
//             <div className="dbom-panel-heading">
//               <div>
//                 <h2>Activity History</h2>
//                 <p>Recent actions in this browser session.</p>
//               </div>
//             </div>
//             <div className="dbom-activity-list">
//               <div><span className="dbom-activity-dot" /><section><strong>Demo workspace opened</strong><p>Sample drawing and BOM data loaded.</p><small>Not a permanent audit log</small></section></div>
//               {drawings.map((drawing) => (
//                 <div key={drawing.id}><span className="dbom-activity-dot" /><section><strong>{drawing.number}: {drawing.name}</strong><p>Current status: {drawing.status}; revision: {drawing.revision}.</p><small>Activity tracking will be connected to the backend.</small></section></div>
//               ))}
//             </div>
//             <p className="dbom-demo-note">Production audit history must be stored server-side with user identity and timestamp.</p>
//           </section>
//         )}
//       </section>

//       {showDrawingForm && (
//         <div className="dbom-modal-backdrop" onClick={() => setShowDrawingForm(false)}>
//           <section className="dbom-modal" onClick={(event) => event.stopPropagation()}>
//             <div className="dbom-modal-heading"><div><h2>Upload Design Drawing</h2><p>Add a drawing record to the demo workspace.</p></div><button onClick={() => setShowDrawingForm(false)} aria-label="Close">×</button></div>
//             <form onSubmit={saveDrawing}>
//               <div className="dbom-form-grid">
//                 <label>Drawing Number *<input name="number" value={drawingForm.number} onChange={updateDrawingForm} required placeholder="e.g. DWG-002" /></label>
//                 <label>Drawing Name *<input name="name" value={drawingForm.name} onChange={updateDrawingForm} required placeholder="Assembly drawing" /></label>
//                 <label>Project ID *<input name="project" value={drawingForm.project} onChange={updateDrawingForm} required placeholder="e.g. PRJ-002" /></label>
//                 <label>Design Engineer<input name="engineer" value={drawingForm.engineer} onChange={updateDrawingForm} placeholder="Engineer name" /></label>
//                 <label>Upload Date<input type="date" name="date" value={drawingForm.date} onChange={updateDrawingForm} /></label>
//                 <label>Drawing File (PDF, JPG, PNG, CAD)<input name="file" type="file" accept=".pdf,.jpg,.jpeg,.png,.dwg,.dxf" onChange={updateDrawingForm} /></label>
//                 <label className="dbom-full-field">Remarks<textarea name="remarks" value={drawingForm.remarks} onChange={updateDrawingForm} rows="3" placeholder="Drawing notes or change description" /></label>
//               </div>
//               <div className="dbom-modal-actions"><button type="button" className="dbom-btn dbom-btn-light" onClick={() => setShowDrawingForm(false)}>Cancel</button><button type="submit" className="dbom-btn dbom-btn-primary">Save Drawing</button></div>
//             </form>
//           </section>
//         </div>
//       )}

//       {showBomForm && (
//         <div className="dbom-modal-backdrop" onClick={() => setShowBomForm(false)}>
//           <section className="dbom-modal" onClick={(event) => event.stopPropagation()}>
//             <div className="dbom-modal-heading"><div><h2>Create BOM Item</h2><p>Add material details for a project.</p></div><button onClick={() => setShowBomForm(false)} aria-label="Close">×</button></div>
//             <form onSubmit={saveBom}>
//               <div className="dbom-form-grid">
//                 <label>Project ID *<input name="project" value={bomForm.project} onChange={updateBomForm} required placeholder="e.g. PRJ-001" /></label>
//                 <label>Material Name *<input name="name" value={bomForm.name} onChange={updateBomForm} required placeholder="MS Plate" /></label>
//                 <label>Material Grade<input name="grade" value={bomForm.grade} onChange={updateBomForm} placeholder="IS 2062 E250" /></label>
//                 <label>Size / Thickness<input name="size" value={bomForm.size} onChange={updateBomForm} placeholder="10 mm" /></label>
//                 <label>Length<input type="number" min="0" step="any" name="length" value={bomForm.length} onChange={updateBomForm} /></label>
//                 <label>Width<input type="number" min="0" step="any" name="width" value={bomForm.width} onChange={updateBomForm} /></label>
//                 <label>Required Quantity<input type="number" min="0.01" step="any" name="quantity" value={bomForm.quantity} onChange={updateBomForm} required /></label>
//                 <label>Unit<select name="unit" value={bomForm.unit} onChange={updateBomForm}><option>Piece</option><option>kg</option><option>Meter</option><option>Sheet</option></select></label>
//                 <label>Weight per Unit (kg)<input type="number" min="0" step="any" name="weight" value={bomForm.weight} onChange={updateBomForm} placeholder="Optional" /></label>
//                 <label className="dbom-full-field">Remarks<textarea name="remarks" value={bomForm.remarks} onChange={updateBomForm} rows="3" /></label>
//               </div>
//               <div className="dbom-modal-actions"><button type="button" className="dbom-btn dbom-btn-light" onClick={() => setShowBomForm(false)}>Cancel</button><button type="submit" className="dbom-btn dbom-btn-primary">Save BOM Item</button></div>
//             </form>
//           </section>
//         </div>
//       )}

//       {selectedDrawing && (
//         <div className="dbom-modal-backdrop" onClick={() => setSelectedDrawing(null)}>
//           <section className="dbom-modal" onClick={(event) => event.stopPropagation()}>
//             <div className="dbom-modal-heading"><div><h2>Drawing Details</h2><p>{selectedDrawing.number}</p></div><button onClick={() => setSelectedDrawing(null)} aria-label="Close">×</button></div>
//             <dl className="dbom-details">

//               <dt>Drawing Name</dt><dd>{selectedDrawing.name}</dd>
//               <dt>Project ID</dt><dd>{selectedDrawing.project}</dd>
//               <dt>Engineer</dt><dd>{selectedDrawing.engineer || "—"}</dd>
//               <dt>Revision</dt><dd>{selectedDrawing.revision}</dd>
//               <dt>Status</dt><dd>{selectedDrawing.status}</dd>
//               <dt>File Name</dt><dd>{selectedDrawing.fileName || "No file selected"}</dd>
//               <dt>Remarks</dt><dd>{selectedDrawing.remarks || "—"}</dd>
//             </dl>
//             <div className="dbom-modal-actions"><button className="dbom-btn dbom-btn-primary" onClick={() => setSelectedDrawing(null)}>Close</button></div>
//           </section>
//         </div>
//       )}





       
// {previewFile && (
//   <div
//     className="dbom-modal-backdrop dbom-preview-backdrop"
//     onClick={() => setPreviewFile(null)}
//   >
//     <section
//       className="dbom-preview-modal"
//       onClick={(event) => event.stopPropagation()}
//     >
//       <div className="dbom-modal-heading">
//         <div>
//           <h2>{previewFile.fileName}</h2>
//           <p>Drawing Preview</p>
//         </div>

//         <div className="dbom-preview-actions">
//           <a
//             href={previewFile.fileUrl}
//             download={previewFile.fileName}
//             className="dbom-btn dbom-btn-primary"
//           >
//             Download
//           </a>

//           <button
//             type="button"
//             onClick={() => setPreviewFile(null)}
//             aria-label="Close preview"
//           >
//               ×
//           </button>
//         </div>
//       </div>

//       <div className="dbom-preview-content">
//         {previewFile.fileName?.toLowerCase().endsWith(".pdf") ? (
//           <iframe
//             src={previewFile.fileUrl}
//             title={previewFile.fileName}
//             className="dbom-pdf-frame"
//           />
//         ) : /\.(jpg|jpeg|png|webp)$/i.test(previewFile.fileName || "") ? (
//           <img
//             src={previewFile.fileUrl}
//             alt={previewFile.fileName}
//             className="dbom-image-preview"
//           />
//         ) : (
//           <p>
//             Is file type ka preview abhi available nahi hai.
//             PDF, JPG aur PNG file upload karke dekho.
//           </p>
//         )}
//       </div>
//     </section>
//   </div>
// )}

//     </main>
//   );
// }

// export default DesignBOM;







// Correct version 1 code hai brother smjh gye na bhai mai kya khe rha hu tumko brother 


// import { useCallback, useEffect, useMemo, useState } from "react";
// import "./DesignBOM.css";

// const API_BASE = "http://localhost:5000/api/design-bom";

// const initialMaterials = [
//   {
//     id: 1,
//     project: "PRJ-001",
//     name: "MS Plate",
//     grade: "IS 2062 E250",
//     size: "10 mm",
//     length: "2400",
//     width: "1200",
//     quantity: 8,
//     unit: "Sheet",
//     weight: 180.96,
//     remarks: "Sample material",
//   },
// ];

// const statusOptions = [
//   "Draft",
//   "Under Review",
//   "Changes Required",
//   "Approved",
//   "Rejected",
// ];

// function DesignBOM() {
//   const [activeTab, setActiveTab] = useState("documents");
//   const [drawings, setDrawings] = useState([]);
//   const [materials, setMaterials] = useState(initialMaterials);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [showDrawingForm, setShowDrawingForm] = useState(false);
//   const [showBomForm, setShowBomForm] = useState(false);
//   const [selectedDrawing, setSelectedDrawing] = useState(null);
//   const [previewFile, setPreviewFile] = useState(null);
//   const [notice, setNotice] = useState("");
//   const [loadingDrawings, setLoadingDrawings] = useState(true);
//   const [savingDrawing, setSavingDrawing] = useState(false);

//   const [drawingForm, setDrawingForm] = useState({
//     number: "",
//     name: "",
//     project: "",
//     engineer: "",
//     date: new Date().toISOString().slice(0, 10),
//     remarks: "",
//     file: null,
//   });

//   const [bomForm, setBomForm] = useState({
//     project: "",
//     name: "",
//     grade: "",
//     size: "",
//     length: "",
//     width: "",
//     quantity: "1",
//     unit: "Piece",
//     weight: "",
//     remarks: "",
//   });

//   const notify = useCallback((message) => {
//     setNotice(message);
//     window.setTimeout(() => setNotice(""), 3500);
//   }, []);

//   // Server se saved drawings load karo.
//   const loadDrawings = useCallback(async () => {
//     setLoadingDrawings(true);

//     try {
//       const response = await fetch(API_BASE);

//       if (!response.ok) {
//         throw new Error("Drawings load nahi hui.");
//       }

//       const data = await response.json();

//       const formattedDrawings = data.map((item) => ({
//         id: item.id,
//         number: item.drawing_number,
//         name: item.drawing_name,
//         project: item.project_code,
//         engineer: item.engineer || "",
//         revision: item.revision || "Rev 00",
//         date: item.drawing_date
//           ? String(item.drawing_date).slice(0, 10)
//           : "",
//         status: item.status || "Draft",
//         remarks: item.remarks || "",
//         fileName: item.original_file_name || "",
//         fileUrl: `${API_BASE}/${item.id}/file`,
//       }));

//       setDrawings(formattedDrawings);
//     } catch (error) {
//       console.error("Load drawings error:", error);
//       notify("Drawings load nahi hui. Backend aur database check karo.");
//     } finally {
//       setLoadingDrawings(false);
//     }
//   }, [notify]);

//   // Page khulte hi database se drawings lao.
//   useEffect(() => {
//     loadDrawings();
//   }, [loadDrawings]);

//   const updateDrawingForm = (event) => {
//     const { name, value, files } = event.target;

//     setDrawingForm((previous) => ({
//       ...previous,
//       [name]: name === "file" ? files?.[0] || null : value,
//     }));
//   };

//   const updateBomForm = (event) => {
//     const { name, value } = event.target;
//     setBomForm((previous) => ({ ...previous, [name]: value }));
//   };

//   const filteredDrawings = useMemo(() => {
//     return drawings.filter((drawing) => {
//       const text = [
//         drawing.number,
//         drawing.name,
//         drawing.project,
//         drawing.engineer,
//       ]
//         .join(" ")
//         .toLowerCase();

//       return (
//         text.includes(search.toLowerCase()) &&
//         (statusFilter === "All" || drawing.status === statusFilter)
//       );
//     });
//   }, [drawings, search, statusFilter]);

//   const totalWeight = materials.reduce(
//     (sum, item) =>
//       sum + Number(item.weight || 0) * Number(item.quantity || 0),
//     0
//   );

//   const approvedCount = drawings.filter(
//     (item) => item.status === "Approved"
//   ).length;

//   const pendingCount = drawings.filter((item) =>
//     ["Draft", "Under Review", "Changes Required"].includes(item.status)
//   ).length;

//   // Drawing file aur details backend par save karo.
//   const saveDrawing = async (event) => {
//     event.preventDefault();

//     if (
//       !drawingForm.number.trim() ||
//       !drawingForm.name.trim() ||
//       !drawingForm.project.trim()
//     ) {
//       notify("Drawing Number, Drawing Name aur Project ID required hain.");
//       return;
//     }

//     if (!drawingForm.file) {
//       notify("Pehle PDF, JPG ya PNG drawing file select karo.");
//       return;
//     }

//     setSavingDrawing(true);

//     try {
//       const formData = new FormData();

//       formData.append("file", drawingForm.file);
//       formData.append("drawingNumber", drawingForm.number.trim());
//       formData.append("drawingName", drawingForm.name.trim());
//       formData.append("projectCode", drawingForm.project.trim());
//       formData.append("engineer", drawingForm.engineer || "");
//       formData.append("drawingDate", drawingForm.date || "");
//       formData.append("remarks", drawingForm.remarks || "");

//       const response = await fetch(`${API_BASE}/upload`, {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Drawing save nahi hui.");
//       }

//       await loadDrawings();

//       setShowDrawingForm(false);
//       setDrawingForm({
//         number: "",
//         name: "",
//         project: "",
//         engineer: "",
//         date: new Date().toISOString().slice(0, 10),
//         remarks: "",
//         file: null,
//       });

//       notify("Drawing server aur database mein save ho gayi.");
//     } catch (error) {
//       console.error("Save drawing error:", error);
//       notify(error.message || "Drawing save karte waqt error aaya.");
//     } finally {
//       setSavingDrawing(false);
//     }
//   };

//   // BOM abhi browser ki state mein hai; backend se connect nahi hai.
//   const saveBom = (event) => {
//     event.preventDefault();

//     if (!bomForm.project.trim() || !bomForm.name.trim()) {
//       notify("Project ID aur Material Name required hain.");
//       return;
//     }

//     const newMaterial = {
//       ...bomForm,
//       id: Date.now(),
//       quantity: Number(bomForm.quantity) || 0,
//       weight: Number(bomForm.weight) || 0,
//     };

//     setMaterials((previous) => [newMaterial, ...previous]);
//     setShowBomForm(false);
//     setBomForm({
//       project: "",
//       name: "",
//       grade: "",
//       size: "",
//       length: "",
//       width: "",
//       quantity: "1",
//       unit: "Piece",
//       weight: "",
//       remarks: "",
//     });

//     notify("Material add ho gaya. BOM ki permanent saving abhi connected nahi hai.");
//   };

//   const changeStatus = (id, status) => {
//     setDrawings((previous) =>
//       previous.map((drawing) =>
//         drawing.id === id ? { ...drawing, status } : drawing
//       )
//     );

//     notify("Status browser mein update hua; database mein save nahi hua.");
//   };

//   const addRevision = (drawing) => {
//     const revisionNumber =
//       Number.parseInt(drawing.revision.replace(/\D/g, ""), 10) || 0;

//     const nextRevision = `Rev ${String(revisionNumber + 1).padStart(2, "0")}`;

//     setDrawings((previous) =>
//       previous.map((item) =>
//         item.id === drawing.id
//           ? {
//               ...item,
//               revision: nextRevision,
//               status: "Under Review",
//               remarks: `${item.remarks || ""} | New revision created`,
//             }
//           : item
//       )
//     );

//     notify(
//       `${nextRevision} browser mein ban gaya. Permanent revision history abhi connected nahi hai.`
//     );
//   };

//   const tabs = [
//     { id: "documents", label: "Design Documents" },
//     { id: "revisions", label: "Drawing Revisions" },
//     { id: "bom", label: "Bill of Materials" },
//     { id: "approval", label: "Design Approval" },
//     { id: "summary", label: "Material Summary" },
//     { id: "activity", label: "Activity History" },
//   ];

//   return (
//     <main className="dbom-page">
//       <header className="dbom-page-header">
//         <div>
//           <div className="dbom-eyebrow">ENGINEERING WORKSPACE</div>
//           <h1>Design &amp; BOM</h1>
//           <p>
//             Manage engineering drawings, revisions and project material
//             requirements.
//           </p>
//         </div>

//         <div className="dbom-header-actions">
//           <button
//             className="dbom-btn dbom-btn-light"
//             onClick={() => setShowBomForm(true)}
//           >
//             + Create BOM
//           </button>

//           <button
//             className="dbom-btn dbom-btn-primary"
//             onClick={() => setShowDrawingForm(true)}
//           >
//             + Upload Drawing
//           </button>
//         </div>
//       </header>

//       {notice && (
//         <div className="dbom-notice" role="status">
//           {notice}
//         </div>
//       )}

//       <section className="dbom-metrics">
//         <article className="dbom-metric-card">
//           <div className="dbom-metric-icon blue">▤</div>
//           <span>Total Drawings</span>
//           <strong>{drawings.length}</strong>
//           <small>Saved drawing records</small>
//         </article>

//         <article className="dbom-metric-card">
//           <div className="dbom-metric-icon amber">◷</div>
//           <span>Pending Review</span>
//           <strong>{pendingCount}</strong>
//           <small>Drafts and review items</small>
//         </article>

//         <article className="dbom-metric-card">
//           <div className="dbom-metric-icon purple">▦</div>
//           <span>BOM Items</span>
//           <strong>{materials.length}</strong>
//           <small>Material line items in this session</small>
//         </article>

//         <article className="dbom-metric-card">
//           <div className="dbom-metric-icon green">✓</div>
//           <span>Approved Designs</span>
//           <strong>{approvedCount}</strong>
//           <small>Currently marked approved</small>
//         </article>
//       </section>

//       <section className="dbom-workspace">
//         <nav className="dbom-tabs" aria-label="Design and BOM sections">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               className={`dbom-tab ${activeTab === tab.id ? "active" : ""}`}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </nav>

//         {activeTab === "documents" && (
//           <section className="dbom-panel">
//             <div className="dbom-panel-heading">
//               <div>
//                 <h2>Design Documents</h2>
//                 <p>Engineering drawing register for fabrication projects.</p>
//               </div>

//               <button
//                 className="dbom-btn dbom-btn-primary"
//                 onClick={() => setShowDrawingForm(true)}
//               >
//                 + Add Drawing
//               </button>
//             </div>

//             <div className="dbom-filters">
//               <input
//                 value={search}
//                 onChange={(event) => setSearch(event.target.value)}
//                 placeholder="Search drawing, project or engineer..."
//                 aria-label="Search drawings"
//               />

//               <select
//                 value={statusFilter}
//                 onChange={(event) => setStatusFilter(event.target.value)}
//                 aria-label="Filter by status"
//               >
//                 <option value="All">All statuses</option>
//                 {statusOptions.map((status) => (
//                   <option key={status}>{status}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="dbom-table-wrap">
//               <table className="dbom-table">
//                 <thead>
//                   <tr>
//                     <th>Drawing</th>
//                     <th>Project ID</th>
//                     <th>Engineer</th>
//                     <th>Revision</th>
//                     <th>Upload Date</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {loadingDrawings && (
//                     <tr>
//                       <td colSpan="7" className="dbom-empty">
//                         Loading drawings from server...
//                       </td>
//                     </tr>
//                   )}

//                   {!loadingDrawings &&
//                     filteredDrawings.map((drawing) => (
//                       <tr key={drawing.id}>
//                         <td>
//                           <strong>{drawing.number}</strong>
//                           <small>{drawing.name}</small>
//                           {drawing.fileName && (
//                             <small>File: {drawing.fileName}</small>
//                           )}
//                         </td>

//                         <td>{drawing.project}</td>
//                         <td>{drawing.engineer || "—"}</td>
//                         <td>{drawing.revision}</td>
//                         <td>{drawing.date}</td>

//                         <td>
//                           <span
//                             className={`dbom-status ${drawing.status
//                               .toLowerCase()
//                               .replaceAll(" ", "-")}`}
//                           >
//                             {drawing.status}
//                           </span>
//                         </td>

//                         <td>
//                           <div className="dbom-row-actions">
//                             {drawing.fileUrl && (
//                               <button
//                                 type="button"
//                                 onClick={() => setPreviewFile(drawing)}
//                               >
//                                 View
//                               </button>
//                             )}

//                             <button
//                               type="button"
//                               onClick={() => setSelectedDrawing(drawing)}
//                             >
//                               Details
//                             </button>

//                             <button
//                               type="button"
//                               onClick={() => addRevision(drawing)}
//                             >
//                               New revision
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}

//                   {!loadingDrawings && filteredDrawings.length === 0 && (
//                     <tr>
//                       <td colSpan="7" className="dbom-empty">
//                         No drawings match your search.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <p className="dbom-demo-note">
//               Drawing files and records load from the server. Status changes
//               and revision history are not yet saved permanently.
//             </p>
//           </section>
//         )}

//         {activeTab === "revisions" && (
//           <section className="dbom-panel">
//             <div className="dbom-panel-heading">
//               <div>
//                 <h2>Drawing Revisions</h2>
//                 <p>Track current revision and revision updates.</p>
//               </div>
//             </div>

//             <div className="dbom-table-wrap">
//               <table className="dbom-table">
//                 <thead>
//                   <tr>
//                     <th>Drawing Number</th>
//                     <th>Drawing Name</th>
//                     <th>Current Revision</th>
//                     <th>Revision Date</th>
//                     <th>Change Description</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {drawings.map((drawing) => (
//                     <tr key={drawing.id}>
//                       <td>{drawing.number}</td>
//                       <td>{drawing.name}</td>
//                       <td>{drawing.revision}</td>
//                       <td>{drawing.date}</td>
//                       <td>{drawing.remarks || "—"}</td>
//                       <td>
//                         <button
//                           className="dbom-text-btn"
//                           onClick={() => addRevision(drawing)}
//                         >
//                           Create revision
//                         </button>
//                       </td>
//                     </tr>
//                   ))}

//                   {drawings.length === 0 && (
//                     <tr>
//                       <td colSpan="6" className="dbom-empty">
//                         No revision records yet.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <p className="dbom-demo-note">
//               Full historical snapshots of revisions are not yet stored.
//             </p>
//           </section>
//         )}

//         {activeTab === "bom" && (
//           <section className="dbom-panel">
//             <div className="dbom-panel-heading">
//               <div>
//                 <h2>Bill of Materials</h2>
//                 <p>Material requirements linked to a project.</p>
//               </div>

//               <button
//                 className="dbom-btn dbom-btn-primary"
//                 onClick={() => setShowBomForm(true)}
//               >
//                 + Add Material
//               </button>
//             </div>

//             <div className="dbom-table-wrap">
//               <table className="dbom-table">
//                 <thead>
//                   <tr>
//                     <th>Project</th>
//                     <th>Material / Grade</th>
//                     <th>Size</th>
//                     <th>Length × Width</th>
//                     <th>Quantity</th>
//                     <th>Unit</th>
//                     <th>Weight / Unit (kg)</th>
//                     <th>Remarks</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {materials.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.project}</td>
//                       <td>
//                         <strong>{item.name}</strong>
//                         <small>{item.grade || "Grade not specified"}</small>
//                       </td>
//                       <td>{item.size || "—"}</td>
//                       <td>
//                         {item.length || "—"} × {item.width || "—"}
//                       </td>
//                       <td>{item.quantity}</td>
//                       <td>{item.unit}</td>
//                       <td>{Number(item.weight || 0).toFixed(2)}</td>
//                       <td>{item.remarks || "—"}</td>
//                     </tr>
//                   ))}

//                   {materials.length === 0 && (
//                     <tr>
//                       <td colSpan="8" className="dbom-empty">
//                         No BOM items yet. Add your first material.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <p className="dbom-demo-note">
//               Enter weight per unit; total material weight is quantity ×
//               weight per unit. BOM persistence is not connected yet.
//             </p>
//           </section>
//         )}

//         {activeTab === "approval" && (
//           <section className="dbom-panel">
//             <div className="dbom-panel-heading">
//               <div>
//                 <h2>Design Approval</h2>
//                 <p>Track the review status of each drawing.</p>
//               </div>
//             </div>

//             <div className="dbom-table-wrap">
//               <table className="dbom-table">
//                 <thead>
//                   <tr>
//                     <th>Drawing</th>
//                     <th>Project</th>
//                     <th>Engineer</th>
//                     <th>Current Status</th>
//                     <th>Update Status</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {drawings.map((drawing) => (
//                     <tr key={drawing.id}>
//                       <td>
//                         <strong>{drawing.number}</strong>
//                         <small>{drawing.name}</small>
//                       </td>
//                       <td>{drawing.project}</td>
//                       <td>{drawing.engineer || "—"}</td>
//                       <td>
//                         <span
//                           className={`dbom-status ${drawing.status
//                             .toLowerCase()
//                             .replaceAll(" ", "-")}`}
//                         >
//                           {drawing.status}
//                         </span>
//                       </td>
//                       <td>
//                         <select
//                           value={drawing.status}
//                           onChange={(event) =>
//                             changeStatus(drawing.id, event.target.value)
//                           }
//                           aria-label={`Update ${drawing.number} status`}
//                         >
//                           {statusOptions.map((status) => (
//                             <option key={status}>{status}</option>
//                           ))}
//                         </select>
//                       </td>
//                     </tr>
//                   ))}

//                   {drawings.length === 0 && (
//                     <tr>
//                       <td colSpan="5" className="dbom-empty">
//                         No drawings to review.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <p className="dbom-demo-note">
//               Status changes currently remain in browser state. Permanent
//               approval workflow is not connected yet.
//             </p>
//           </section>
//         )}

//         {activeTab === "summary" && (
//           <section className="dbom-panel">
//             <div className="dbom-panel-heading">
//               <div>
//                 <h2>Material Summary</h2>
//                 <p>Overview of material quantities and estimated weight.</p>
//               </div>
//             </div>

//             <div className="dbom-summary-grid">
//               <article>
//                 <span>Total BOM Lines</span>
//                 <strong>{materials.length}</strong>
//               </article>

//               <article>
//                 <span>Total Item Quantity</span>
//                 <strong>
//                   {materials.reduce(
//                     (sum, item) => sum + Number(item.quantity || 0),
//                     0
//                   )}
//                 </strong>
//               </article>

//               <article>
//                 <span>Estimated Total Weight</span>
//                 <strong>
//                   {totalWeight.toLocaleString("en-IN", {
//                     maximumFractionDigits: 2,
//                   })}{" "}
//                   kg
//                 </strong>
//               </article>
//             </div>

//             <div className="dbom-table-wrap">
//               <table className="dbom-table">
//                 <thead>
//                   <tr>
//                     <th>Material</th>
//                     <th>Grade</th>
//                     <th>Size</th>
//                     <th>Total Quantity</th>
//                     <th>Unit</th>
//                     <th>Estimated Weight</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {materials.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.name}</td>
//                       <td>{item.grade || "—"}</td>
//                       <td>{item.size || "—"}</td>
//                       <td>{item.quantity}</td>
//                       <td>{item.unit}</td>
//                       <td>
//                         {(
//                           Number(item.weight || 0) *
//                           Number(item.quantity || 0)
//                         ).toFixed(2)}{" "}
//                         kg
//                       </td>
//                     </tr>
//                   ))}

//                   {materials.length === 0 && (
//                     <tr>
//                       <td colSpan="6" className="dbom-empty">
//                         No material data to summarise.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <p className="dbom-demo-note">
//               Inventory and Purchase integration will be added after their
//               workflows are confirmed.
//             </p>
//           </section>
//         )}

//         {activeTab === "activity" && (
//           <section className="dbom-panel">
//             <div className="dbom-panel-heading">
//               <div>
//                 <h2>Activity History</h2>
//                 <p>Recent drawing records loaded from the server.</p>
//               </div>
//             </div>

//             <div className="dbom-activity-list">
//               <div>
//                 <span className="dbom-activity-dot" />
//                 <section>
//                   <strong>Design workspace opened</strong>
//                   <p>Drawing records were requested from the backend.</p>
//                   <small>This is not a permanent audit log.</small>
//                 </section>
//               </div>

//               {drawings.map((drawing) => (
//                 <div key={drawing.id}>
//                   <span className="dbom-activity-dot" />
//                   <section>
//                     <strong>
//                       {drawing.number}: {drawing.name}
//                     </strong>
//                     <p>
//                       Current status: {drawing.status}; revision:{" "}
//                       {drawing.revision}.
//                     </p>
//                     <small>Permanent activity tracking is not connected.</small>
//                   </section>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}
//       </section>

//       {/* Upload Drawing Modal */}
//       {showDrawingForm && (
//         <div
//           className="dbom-modal-backdrop"
//           onClick={() => setShowDrawingForm(false)}
//         >
//           <section
//             className="dbom-modal"
//             onClick={(event) => event.stopPropagation()}
//           >
//             <div className="dbom-modal-heading">
//               <div>
//                 <h2>Upload Design Drawing</h2>
//                 <p>Save the drawing file and its details.</p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowDrawingForm(false)}
//                 aria-label="Close"
//               >
//                 ×
//               </button>
//             </div>

//             <form onSubmit={saveDrawing}>
//               <div className="dbom-form-grid">
//                 <label>
//                   Drawing Number *
//                   <input
//                     name="number"
//                     value={drawingForm.number}
//                     onChange={updateDrawingForm}
//                     required
//                     placeholder="e.g. DWG-002"
//                   />
//                 </label>

//                 <label>
//                   Drawing Name *
//                   <input
//                     name="name"
//                     value={drawingForm.name}
//                     onChange={updateDrawingForm}
//                     required
//                     placeholder="Assembly drawing"
//                   />
//                 </label>

//                 <label>
//                   Project ID *
//                   <input
//                     name="project"
//                     value={drawingForm.project}
//                     onChange={updateDrawingForm}
//                     required
//                     placeholder="e.g. PRJ-002"
//                   />
//                 </label>

//                 <label>
//                   Design Engineer
//                   <input
//                     name="engineer"
//                     value={drawingForm.engineer}
//                     onChange={updateDrawingForm}
//                     placeholder="Engineer name"
//                   />
//                 </label>

//                 <label>
//                   Upload Date
//                   <input
//                     type="date"
//                     name="date"
//                     value={drawingForm.date}
//                     onChange={updateDrawingForm}
//                   />
//                 </label>

//                 <label>
//                   Drawing File (PDF, JPG, PNG) *
//                   <input
//                     name="file"
//                     type="file"
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     onChange={updateDrawingForm}
//                     required
//                   />
//                 </label>

//                 <label className="dbom-full-field">
//                   Remarks
//                   <textarea
//                     name="remarks"
//                     value={drawingForm.remarks}
//                     onChange={updateDrawingForm}
//                     rows="3"
//                     placeholder="Drawing notes or change description"
//                   />
//                 </label>
//               </div>

//               <div className="dbom-modal-actions">
//                 <button
//                   type="button"
//                   className="dbom-btn dbom-btn-light"
//                   onClick={() => setShowDrawingForm(false)}
//                   disabled={savingDrawing}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="dbom-btn dbom-btn-primary"
//                   disabled={savingDrawing}
//                 >
//                   {savingDrawing ? "Saving..." : "Save Drawing"}
//                 </button>
//               </div>
//             </form>
//           </section>
//         </div>
//       )}

//       {/* Create BOM Modal */}
//       {showBomForm && (
//         <div
//           className="dbom-modal-backdrop"
//           onClick={() => setShowBomForm(false)}
//         >
//           <section
//             className="dbom-modal"
//             onClick={(event) => event.stopPropagation()}
//           >
//             <div className="dbom-modal-heading">
//               <div>
//                 <h2>Create BOM Item</h2>
//                 <p>Add material details for a project.</p>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setShowBomForm(false)}
//                 aria-label="Close"
//               >
//                 ×
//               </button>
//             </div>

//             <form onSubmit={saveBom}>
//               <div className="dbom-form-grid">
//                 <label>
//                   Project ID *
//                   <input
//                     name="project"
//                     value={bomForm.project}
//                     onChange={updateBomForm}
//                     required
//                     placeholder="e.g. PRJ-001"
//                   />
//                 </label>

//                 <label>
//                   Material Name *
//                   <input
//                     name="name"
//                     value={bomForm.name}
//                     onChange={updateBomForm}
//                     required
//                     placeholder="MS Plate"
//                   />
//                 </label>

//                 <label>
//                   Material Grade
//                   <input
//                     name="grade"
//                     value={bomForm.grade}
//                     onChange={updateBomForm}
//                     placeholder="IS 2062 E250"
//                   />
//                 </label>

//                 <label>
//                   Size / Thickness
//                   <input
//                     name="size"
//                     value={bomForm.size}
//                     onChange={updateBomForm}
//                     placeholder="10 mm"
//                   />
//                 </label>

//                 <label>
//                   Length
//                   <input
//                     type="number"
//                     min="0"
//                     step="any"
//                     name="length"
//                     value={bomForm.length}
//                     onChange={updateBomForm}
//                   />
//                 </label>

//                 <label>
//                   Width
//                   <input
//                     type="number"
//                     min="0"
//                     step="any"
//                     name="width"
//                     value={bomForm.width}
//                     onChange={updateBomForm}
//                   />
//                 </label>

//                 <label>
//                   Required Quantity
//                   <input
//                     type="number"
//                     min="0.01"
//                     step="any"
//                     name="quantity"
//                     value={bomForm.quantity}
//                     onChange={updateBomForm}
//                     required
//                   />
//                 </label>

//                 <label>
//                   Unit
//                   <select
//                     name="unit"
//                     value={bomForm.unit}
//                     onChange={updateBomForm}
//                   >
//                     <option>Piece</option>
//                     <option>kg</option>
//                     <option>Meter</option>
//                     <option>Sheet</option>
//                   </select>
//                 </label>

//                 <label>
//                   Weight per Unit (kg)
//                   <input
//                     type="number"
//                     min="0"
//                     step="any"
//                     name="weight"
//                     value={bomForm.weight}
//                     onChange={updateBomForm}
//                     placeholder="Optional"
//                   />
//                 </label>

//                 <label className="dbom-full-field">
//                   Remarks
//                   <textarea
//                     name="remarks"
//                     value={bomForm.remarks}
//                     onChange={updateBomForm}
//                     rows="3"
//                   />
//                 </label>
//               </div>

//               <div className="dbom-modal-actions">
//                 <button
//                   type="button"
//                   className="dbom-btn dbom-btn-light"
//                   onClick={() => setShowBomForm(false)}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="dbom-btn dbom-btn-primary"
//                 >
//                   Save BOM Item
//                 </button>
//               </div>
//             </form>
//           </section>
//         </div>
//       )}

//       {/* Drawing Details Modal */}
//       {selectedDrawing && (
//         <div
//           className="dbom-modal-backdrop"
//           onClick={() => setSelectedDrawing(null)}
//         >
//           <section
//             className="dbom-modal"
//             onClick={(event) => event.stopPropagation()}
//           >
//             <div className="dbom-modal-heading">
//               <div>
//                 <h2>Drawing Details</h2>
//                 <p>{selectedDrawing.number}</p>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setSelectedDrawing(null)}
//                 aria-label="Close"
//               >
//                 ×
//               </button>
//             </div>

//             <dl className="dbom-details">
//               <dt>Drawing Name</dt>
//               <dd>{selectedDrawing.name}</dd>

//               <dt>Project ID</dt>
//               <dd>{selectedDrawing.project}</dd>

//               <dt>Engineer</dt>
//               <dd>{selectedDrawing.engineer || "—"}</dd>

//               <dt>Revision</dt>
//               <dd>{selectedDrawing.revision}</dd>

//               <dt>Status</dt>
//               <dd>{selectedDrawing.status}</dd>

//               <dt>File Name</dt>
//               <dd>{selectedDrawing.fileName || "No file selected"}</dd>

//               <dt>Remarks</dt>
//               <dd>{selectedDrawing.remarks || "—"}</dd>
//             </dl>

//             <div className="dbom-modal-actions">
//               <button
//                 className="dbom-btn dbom-btn-primary"
//                 onClick={() => setSelectedDrawing(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </section>
//         </div>
//       )}

//       {/* Drawing File Preview Modal */}
//       {previewFile && (
//         <div
//           className="dbom-modal-backdrop dbom-preview-backdrop"
//           onClick={() => setPreviewFile(null)}
//         >
//           <section
//             className="dbom-preview-modal"
//             onClick={(event) => event.stopPropagation()}
//           >
//             <div className="dbom-modal-heading">
//               <div>
//                 <h2>{previewFile.fileName}</h2>
//                 <p>Drawing Preview</p>
//               </div>

//               <div className="dbom-preview-actions">
//                 <a
//                   href={previewFile.fileUrl}
//                   download={previewFile.fileName}
//                   className="dbom-btn dbom-btn-primary"
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   Download
//                 </a>

//                 <button
//                   type="button"
//                   onClick={() => setPreviewFile(null)}
//                   aria-label="Close preview"
//                 >
//                   ×
//                 </button>
//               </div>
//             </div>

//             <div className="dbom-preview-content">
//               {previewFile.fileName?.toLowerCase().endsWith(".pdf") ? (
//                 <iframe
//                   src={previewFile.fileUrl}
//                   title={previewFile.fileName}
//                   className="dbom-pdf-frame"
//                 />
//               ) : /\.(jpg|jpeg|png)$/i.test(previewFile.fileName || "") ? (
//                 <img
//                   src={previewFile.fileUrl}
//                   alt={previewFile.fileName}
//                   className="dbom-image-preview"
//                 />
//               ) : (
//                 <p>
//                   Is file type ka preview available nahi hai. PDF, JPG ya PNG
//                   file upload karke dekho.
//                 </p>
//               )}
//             </div>
//           </section>
//         </div>
        
//       )}

//     </main>
//   );
// }

// export default DesignBOM;










import { useCallback, useEffect, useMemo, useState } from "react";
import "./DesignBOM.css";

const API_BASE = "http://localhost:5000/api/design-bom";
const PROJECTS_API = "http://localhost:5000/api/projects";

const emptyDrawingForm = {
  drawingNumber: "",
  drawingName: "",
  projectCode: "",
  engineer: "",
  drawingDate: "",
  remarks: "",
  file: null,
};

const emptyBomForm = {
  projectCode: "",
  materialName: "",
  materialGrade: "",
  materialSize: "",
  length: "",
  width: "",
  quantity: "1",
  unit: "Piece",
  weight: "0",
  remarks: "",
};

const emptyRevisionForm = {
  revisionNumber: "",
  remarks: "",
  file: null,
};

function getErrorMessage(error, fallback) {
  return error instanceof Error ? error.message : fallback;
}

async function requestJson(url, options = {}) {
  let response;

  try {
    response = await fetch(url, options);
  } catch {
    throw new Error(
      "Server se connection nahi ho raha. Check karo ki Express server localhost:5000 par running hai."
    );
  }

  const contentType = response.headers.get("content-type") || "";
  const result = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(
      result?.message || `Request failed (${response.status}).`
    );
  }

  return result;
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatNumber(value, maximumFractionDigits = 2) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number.toLocaleString("en-IN", {
        maximumFractionDigits,
      })
    : "0";
}

function getProjectCode(project) {
  return project.projectCode ?? project.project_code ?? "";
}

function getProjectName(project) {
  return project.projectName ?? project.project_name ?? "";
}

function getDrawingId(drawing) {
  return drawing.id ?? drawing.drawing_id;
}

function getFileUrl(drawingId, revisionId) {
  return revisionId
    ? `${API_BASE}/${drawingId}/revisions/${revisionId}/file`
    : `${API_BASE}/${drawingId}/file`;
}

function normalizeDrawing(item) {
  const id = item.id ?? item.drawing_id;

  return {
    ...item,
    id,
    drawingNumber: item.drawingNumber ?? item.drawing_number ?? "",
    drawingName: item.drawingName ?? item.drawing_name ?? "",
    projectCode: item.projectCode ?? item.project_code ?? "",
    engineer: item.engineer ?? "",
    revision: item.revision ?? "Rev 00",
    drawingDate: item.drawingDate ?? item.drawing_date ?? "",
    status: item.status ?? "Draft",
    remarks: item.remarks ?? "",
    originalFileName:
      item.originalFileName ?? item.original_file_name ?? "",
    mimeType: item.mimeType ?? item.mime_type ?? "",
    createdAt: item.createdAt ?? item.created_at ?? "",
    fileUrl: id ? getFileUrl(id) : "",
  };
}

function normalizeBomItem(item) {
  return {
    ...item,
    id: item.id,
    projectId: item.projectId ?? item.project_id,
    projectCode: item.projectCode ?? item.project_code ?? "",
    materialName: item.materialName ?? item.material_name ?? "",
    materialGrade: item.materialGrade ?? item.material_grade ?? "",
    materialSize: item.materialSize ?? item.material_size ?? "",
    length: item.length ?? item.length_mm ?? "",
    width: item.width ?? item.width_mm ?? "",
    quantity: item.quantity ?? 0,
    unit: item.unit ?? "Piece",
    weight:
      item.weight ?? item.weight_per_unit ?? item.weightPerUnit ?? 0,
    remarks: item.remarks ?? "",
    createdAt: item.createdAt ?? item.created_at ?? "",
  };
}

function normalizeRevision(item, drawingId) {
  const id = item.id ?? item.revision_id;

  return {
    ...item,
    id,
    drawingId: item.drawingId ?? item.drawing_id ?? drawingId,
    revisionNumber:
      item.revisionNumber ??
      item.revision_number ??
      item.revision ??
      "",
    fileName: item.fileName ?? item.file_name ?? "",
    remarks: item.remarks ?? "",
    createdAt: item.createdAt ?? item.created_at ?? "",
    fileUrl: id ? getFileUrl(drawingId, id) : "",
  };
}

export default function DesignBOM() {
  const [activeTab, setActiveTab] = useState("documents");

  const [drawings, setDrawings] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [projects, setProjects] = useState([]);
  const [revisions, setRevisions] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showDrawingForm, setShowDrawingForm] = useState(false);
  const [showBomForm, setShowBomForm] = useState(false);
  const [showRevisionForm, setShowRevisionForm] = useState(false);

  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const [drawingForm, setDrawingForm] = useState(emptyDrawingForm);
  const [bomForm, setBomForm] = useState(emptyBomForm);
  const [revisionForm, setRevisionForm] = useState(emptyRevisionForm);

  const [loadingDrawings, setLoadingDrawings] = useState(true);
  const [loadingMaterials, setLoadingMaterials] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingRevisions, setLoadingRevisions] = useState(false);

  const [savingDrawing, setSavingDrawing] = useState(false);
  const [savingBom, setSavingBom] = useState(false);
  const [savingRevision, setSavingRevision] = useState(false);

  const [notice, setNotice] = useState({
    type: "",
    message: "",
  });

  const showNotice = useCallback((type, message) => {
    setNotice({ type, message });
  }, []);

  const loadDrawings = useCallback(async () => {
    setLoadingDrawings(true);

    try {
      const result = await requestJson(API_BASE);
      const list = Array.isArray(result) ? result : result?.data;

      if (!Array.isArray(list)) {
        throw new Error("Drawings API se valid list nahi mili.");
      }

      setDrawings(list.map(normalizeDrawing));
    } catch (error) {
      showNotice(
        "error",
        getErrorMessage(error, "Drawings load nahi ho sake.")
      );
    } finally {
      setLoadingDrawings(false);
    }
  }, [showNotice]);

  const loadMaterials = useCallback(async () => {
    setLoadingMaterials(true);

    try {
      const result = await requestJson(`${API_BASE}/bom`);
      const list = Array.isArray(result) ? result : result?.data;

      if (!Array.isArray(list)) {
        throw new Error("BOM API se valid list nahi mili.");
      }

      setMaterials(list.map(normalizeBomItem));
    } catch (error) {
      showNotice(
        "error",
        getErrorMessage(error, "BOM items load nahi ho sake.")
      );
    } finally {
      setLoadingMaterials(false);
    }
  }, [showNotice]);

  const loadProjects = useCallback(async () => {
    setLoadingProjects(true);

    try {
      const result = await requestJson(PROJECTS_API);
      const list = Array.isArray(result) ? result : result?.data;

      if (!Array.isArray(list)) {
        throw new Error("Projects API se valid list nahi mili.");
      }

      setProjects(
        list.filter((project) => getProjectCode(project))
      );
    } catch (error) {
      setProjects([]);
      showNotice(
        "error",
        getErrorMessage(error, "Projects load nahi ho sake.")
      );
    } finally {
      setLoadingProjects(false);
    }
  }, [showNotice]);

  const loadRevisions = useCallback(async () => {
    if (drawings.length === 0) {
      setRevisions([]);
      return;
    }

    setLoadingRevisions(true);

    try {
      const revisionLists = await Promise.all(
        drawings.map(async (drawing) => {
          const drawingId = getDrawingId(drawing);

          if (!drawingId) return [];

          const result = await requestJson(
            `${API_BASE}/${drawingId}/revisions`
          );

          const list = Array.isArray(result) ? result : result?.data;

          if (!Array.isArray(list)) return [];

          return list.map((item) =>
            normalizeRevision(item, drawingId)
          );
        })
      );

      setRevisions(revisionLists.flat());
    } catch (error) {
      showNotice(
        "error",
        getErrorMessage(error, "Revision history load nahi hui.")
      );
    } finally {
      setLoadingRevisions(false);
    }
  }, [drawings, showNotice]);

  useEffect(() => {
    loadDrawings();
    loadMaterials();
    loadProjects();
  }, [loadDrawings, loadMaterials, loadProjects]);

  useEffect(() => {
    if (activeTab === "revisions") {
      loadRevisions();
    }
  }, [activeTab, loadRevisions]);

  const projectOptions = useMemo(
    () =>
      projects.map((project) => ({
        code: getProjectCode(project),
        name: getProjectName(project),
      })),
    [projects]
  );

  const projectNameFor = useCallback(
    (projectCode) => {
      const project = projectOptions.find(
        (item) => item.code === projectCode
      );

      return project?.name || projectCode || "—";
    },
    [projectOptions]
  );

  const filteredDrawings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return drawings.filter((drawing) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          drawing.drawingNumber,
          drawing.drawingName,
          drawing.projectCode,
          drawing.engineer,
          drawing.originalFileName,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" || drawing.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [drawings, search, statusFilter]);

  const metrics = useMemo(() => {
    const totalWeight = materials.reduce(
      (sum, item) =>
        sum + Number(item.quantity || 0) * Number(item.weight || 0),
      0
    );

    return {
      drawings: drawings.length,
      materials: materials.length,
      revisions: revisions.length,
      totalWeight,
    };
  }, [drawings, materials, revisions]);

  function updateDrawingForm(event) {
    const { name, value, files } = event.target;

    setDrawingForm((previous) => ({
      ...previous,
      [name]: name === "file" ? files?.[0] || null : value,
    }));
  }

  function updateBomForm(event) {
    const { name, value } = event.target;

    setBomForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function updateRevisionForm(event) {
    const { name, value, files } = event.target;

    setRevisionForm((previous) => ({
      ...previous,
      [name]: name === "file" ? files?.[0] || null : value,
    }));
  }

  async function saveDrawing(event) {
    event.preventDefault();

    if (!drawingForm.file) {
      showNotice("error", "Bhai, pehle drawing file select karo.");
      return;
    }

    if (
      !drawingForm.drawingNumber.trim() ||
      !drawingForm.drawingName.trim() ||
      !drawingForm.projectCode
    ) {
      showNotice(
        "error",
        "Drawing number, drawing name aur project select karna zaroori hai."
      );
      return;
    }

    setSavingDrawing(true);

    try {
      const formData = new FormData();

      formData.append("drawingNumber", drawingForm.drawingNumber.trim());
      formData.append("drawingName", drawingForm.drawingName.trim());
      formData.append("projectCode", drawingForm.projectCode);
      formData.append("engineer", drawingForm.engineer.trim());
      formData.append("drawingDate", drawingForm.drawingDate);
      formData.append("remarks", drawingForm.remarks.trim());
      formData.append("file", drawingForm.file);

      await requestJson(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });

      setDrawingForm(emptyDrawingForm);
      setShowDrawingForm(false);
      showNotice("success", "Drawing database mein save ho gayi.");

      await loadDrawings();
    } catch (error) {
      showNotice(
        "error",
        getErrorMessage(error, "Drawing upload nahi ho saki.")
      );
    } finally {
      setSavingDrawing(false);
    }
  }

  async function saveBom(event) {
    event.preventDefault();

    if (
      !bomForm.projectCode ||
      !bomForm.materialName.trim()
    ) {
      showNotice(
        "error",
        "Project aur material name select/fill karna zaroori hai."
      );
      return;
    }

    const quantity = Number(bomForm.quantity);
    const weight = Number(bomForm.weight);

    if (
      !Number.isFinite(quantity) ||
      quantity <= 0 ||
      !Number.isFinite(weight) ||
      weight < 0
    ) {
      showNotice(
        "error",
        "Quantity positive honi chahiye aur weight negative nahi ho sakta."
      );
      return;
    }

    setSavingBom(true);

    try {
      await requestJson(`${API_BASE}/bom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectCode: bomForm.projectCode,
          materialName: bomForm.materialName.trim(),
          materialGrade: bomForm.materialGrade.trim(),
          materialSize: bomForm.materialSize.trim(),
          length: bomForm.length === "" ? null : Number(bomForm.length),
          width: bomForm.width === "" ? null : Number(bomForm.width),
          quantity,
          unit: bomForm.unit,
          weight,
          remarks: bomForm.remarks.trim(),
        }),
      });

      setBomForm(emptyBomForm);
      setShowBomForm(false);
      showNotice("success", "BOM item database mein save ho gaya.");

      await loadMaterials();
    } catch (error) {
      showNotice(
        "error",
        getErrorMessage(error, "BOM item save nahi ho saka.")
      );
    } finally {
      setSavingBom(false);
    }
  }

  function openRevisionForm(drawing) {
    setSelectedDrawing(drawing);
    setRevisionForm(emptyRevisionForm);
    setShowRevisionForm(true);
  }

  async function saveRevision(event) {
    event.preventDefault();

    if (!selectedDrawing) {
      showNotice("error", "Revision ke liye drawing select karo.");
      return;
    }

    if (!revisionForm.file) {
      showNotice("error", "Nayi revision file select karo.");
      return;
    }

    if (!revisionForm.revisionNumber.trim()) {
      showNotice("error", "Revision number enter karo, jaise Rev 01.");
      return;
    }

    setSavingRevision(true);

    try {
      const formData = new FormData();

      formData.append("revisionNumber", revisionForm.revisionNumber.trim());
      formData.append("remarks", revisionForm.remarks.trim());
      formData.append("file", revisionForm.file);

      await requestJson(
        `${API_BASE}/${getDrawingId(selectedDrawing)}/revisions`,
        {
          method: "POST",
          body: formData,
        }
      );

      setShowRevisionForm(false);
      setRevisionForm(emptyRevisionForm);
      showNotice("success", "Drawing revision database mein save ho gayi.");

      await loadDrawings();
      await loadRevisions();
    } catch (error) {
      showNotice(
        "error",
        getErrorMessage(error, "Revision upload nahi ho saki.")
      );
    } finally {
      setSavingRevision(false);
    }
  }

  function openPreview(file) {
    if (!file?.fileUrl) {
      showNotice("error", "Is record ki file URL available nahi hai.");
      return;
    }

    setPreviewFile(file);
  }

  function isPdf(file) {
    return (
      file?.mimeType === "application/pdf" ||
      file?.fileName?.toLowerCase().endsWith(".pdf") ||
      file?.originalFileName?.toLowerCase().endsWith(".pdf")
    );
  }

  function isImage(file) {
    const mime = file?.mimeType || "";
    const name = (
      file?.fileName ||
      file?.originalFileName ||
      ""
    ).toLowerCase();

    return (
      mime.startsWith("image/") ||
      /\.(jpg|jpeg|png)$/.test(name)
    );
  }

  return (
    <div className="design-bom-page">
      <div className="design-bom-header">
        <div>
          <div className="design-bom-eyebrow">ENGINEERING OPERATIONS</div>
          <h1>Design &amp; BOM</h1>
          <p>
            Manage engineering drawings, revision records and bill of materials.
          </p>
        </div>

        <div className="design-bom-header-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={() => setShowDrawingForm(true)}
            disabled={loadingProjects || projects.length === 0}
          >
            + Upload Drawing
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => setShowBomForm(true)}
            disabled={loadingProjects || projects.length === 0}
          >
            + Add BOM Item
          </button>
        </div>
      </div>

      {notice.message && (
        <div
          className={`design-bom-notice ${notice.type}`}
          role="status"
        >
          <span>{notice.message}</span>
          <button
            type="button"
            onClick={() => setNotice({ type: "", message: "" })}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      <div className="design-bom-metrics">
        <div className="metric-card">
          <span className="metric-label">TOTAL DRAWINGS</span>
          <strong>{loadingDrawings ? "…" : metrics.drawings}</strong>
          <span className="metric-caption">Saved engineering files</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">BOM ITEMS</span>
          <strong>{loadingMaterials ? "…" : metrics.materials}</strong>
          <span className="metric-caption">Saved material records</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">REVISION RECORDS</span>
          <strong>
            {loadingRevisions && activeTab === "revisions"
              ? "…"
              : metrics.revisions}
          </strong>
          <span className="metric-caption">Stored drawing revisions</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">TOTAL BOM WEIGHT</span>
          <strong>
            {loadingMaterials
              ? "…"
              : `${formatNumber(metrics.totalWeight)} kg`}
          </strong>
          <span className="metric-caption">
            Quantity × weight per unit
          </span>
        </div>
      </div>

      <div className="design-bom-tabs" role="tablist">
        <button
          type="button"
          className={activeTab === "documents" ? "active" : ""}
          onClick={() => setActiveTab("documents")}
        >
          Drawings
        </button>

        <button
          type="button"
          className={activeTab === "revisions" ? "active" : ""}
          onClick={() => setActiveTab("revisions")}
        >
          Revision History
        </button>

        <button
          type="button"
          className={activeTab === "bom" ? "active" : ""}
          onClick={() => setActiveTab("bom")}
        >
          Bill of Materials
        </button>

        <button
          type="button"
          className={activeTab === "approval" ? "active" : ""}
          onClick={() => setActiveTab("approval")}
        >
          Approval Workflow
        </button>

        <button
          type="button"
          className={activeTab === "summary" ? "active" : ""}
          onClick={() => setActiveTab("summary")}
        >
          Summary
        </button>

        <button
          type="button"
          className={activeTab === "activity" ? "active" : ""}
          onClick={() => setActiveTab("activity")}
        >
          Data Status
        </button>
      </div>

      {activeTab === "documents" && (
        <section className="design-bom-panel">
          <div className="panel-heading">
            <div>
              <h2>Engineering Drawings</h2>
              <p>Files stored against actual projects.</p>
            </div>

            <button
              type="button"
              className="btn-secondary"
              onClick={loadDrawings}
              disabled={loadingDrawings}
            >
              {loadingDrawings ? "Refreshing…" : "Refresh"}
            </button>
          </div>

          <div className="table-toolbar">
            <input
              type="search"
              placeholder="Search drawing, project or engineer..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter drawings by status"
            >
              <option value="All">All statuses</option>
              <option value="Draft">Draft</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="table-responsive">
            <table className="design-bom-table">
              <thead>
                <tr>
                  <th>Drawing</th>
                  <th>Project</th>
                  <th>Engineer</th>
                  <th>Revision</th>
                  <th>Status</th>
                  <th>File</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loadingDrawings ? (
                  <tr>
                    <td colSpan="7" className="empty-state">
                      Loading drawings from database…
                    </td>
                  </tr>
                ) : filteredDrawings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-state">
                      {drawings.length === 0
                        ? "No drawings saved in the database yet."
                        : "No drawings match your search."}
                    </td>
                  </tr>
                ) : (
                  filteredDrawings.map((drawing) => (
                    <tr key={drawing.id}>
                      <td>
                        <strong>{drawing.drawingName || "Untitled drawing"}</strong>
                        <small>{drawing.drawingNumber || "—"}</small>
                      </td>

                      <td>
                        <strong>{projectNameFor(drawing.projectCode)}</strong>
                        <small>{drawing.projectCode}</small>
                      </td>

                      <td>{drawing.engineer || "—"}</td>
                      <td>{drawing.revision || "—"}</td>

                      <td>
                        <span
                          className={`status-badge ${String(
                            drawing.status
                          )
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {drawing.status}
                        </span>
                      </td>

                      <td>{drawing.originalFileName || "—"}</td>

                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            onClick={() => openPreview(drawing)}
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() => openRevisionForm(drawing)}
                          >
                            New Revision
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedDrawing(drawing)}
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === "revisions" && (
        <section className="design-bom-panel">
          <div className="panel-heading">
            <div>
              <h2>Revision History</h2>
              <p>Revision records retrieved from the backend.</p>
            </div>

            <button
              type="button"
              className="btn-secondary"
              onClick={loadRevisions}
              disabled={loadingRevisions}
            >
              {loadingRevisions ? "Loading…" : "Refresh"}
            </button>
          </div>

          <div className="table-responsive">
            <table className="design-bom-table">
              <thead>
                <tr>
                  <th>Drawing</th>
                  <th>Revision</th>
                  <th>File</th>
                  <th>Remarks</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loadingRevisions ? (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      Loading revision history…
                    </td>
                  </tr>
                ) : revisions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      No revision records found in the database.
                    </td>
                  </tr>
                ) : (
                  revisions.map((revision) => {
                    const drawing = drawings.find(
                      (item) => getDrawingId(item) === revision.drawingId
                    );

                    return (
                      <tr key={`${revision.drawingId}-${revision.id}`}>
                        <td>
                          <strong>
                            {drawing?.drawingName || "Drawing"}
                          </strong>
                          <small>
                            {drawing?.drawingNumber || `ID ${revision.drawingId}`}
                          </small>
                        </td>

                        <td>{revision.revisionNumber || "—"}</td>
                        <td>{revision.fileName || "—"}</td>
                        <td>{revision.remarks || "—"}</td>
                        <td>{formatDate(revision.createdAt)}</td>

                        <td>
                          <button
                            type="button"
                            onClick={() => {
                              const file = {
                                fileUrl: revision.fileUrl,
                                fileName: revision.fileName,
                                originalFileName: revision.fileName,
                                mimeType: revision.mimeType ?? revision.mime_type,
                              };

                              openPreview(file);
                            }}
                          >
                            View File
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === "bom" && (
        <section className="design-bom-panel">
          <div className="panel-heading">
            <div>
              <h2>Bill of Materials</h2>
              <p>Material records saved in MySQL.</p>
            </div>

            <div className="panel-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={loadMaterials}
                disabled={loadingMaterials}
              >
                {loadingMaterials ? "Refreshing…" : "Refresh"}
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={() => setShowBomForm(true)}
                disabled={loadingProjects || projects.length === 0}
              >
                + Add BOM Item
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="design-bom-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Material</th>
                  <th>Grade</th>
                  <th>Size</th>
                  <th>Length (mm)</th>
                  <th>Width (mm)</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Weight / Unit (kg)</th>
                  <th>Total Weight (kg)</th>
                </tr>
              </thead>

              <tbody>
                {loadingMaterials ? (
                  <tr>
                    <td colSpan="10" className="empty-state">
                      Loading BOM items from database…
                    </td>
                  </tr>
                ) : materials.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="empty-state">
                      No BOM items saved in the database yet.
                    </td>
                  </tr>
                ) : (
                  materials.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>{projectNameFor(item.projectCode)}</strong>
                        <small>{item.projectCode}</small>
                      </td>

                      <td>{item.materialName}</td>
                      <td>{item.materialGrade || "—"}</td>
                      <td>{item.materialSize || "—"}</td>
                      <td>{item.length === "" ? "—" : formatNumber(item.length)}</td>
                      <td>{item.width === "" ? "—" : formatNumber(item.width)}</td>
                      <td>{formatNumber(item.quantity, 3)}</td>
                      <td>{item.unit}</td>
                      <td>{formatNumber(item.weight, 3)}</td>
                      <td>
                        <strong>
                          {formatNumber(
                            Number(item.quantity) * Number(item.weight),
                            3
                          )}
                        </strong>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === "approval" && (
        <section className="design-bom-panel">
          <div className="panel-heading">
            <div>
              <h2>Approval Workflow</h2>
              <p>Real approvals are not enabled yet.</p>
            </div>
          </div>

          <div className="empty-state approval-not-configured">
            <h3>Approval workflow not configured</h3>
            <p>
              No approval decision is being recorded or displayed as approved.
              A persistent approval workflow must be implemented on the server
              with authorized users, approval history, timestamps and remarks.
            </p>
          </div>
        </section>
      )}

      {activeTab === "summary" && (
        <section className="design-bom-panel">
          <div className="panel-heading">
            <div>
              <h2>Engineering Summary</h2>
              <p>Counts calculated from records retrieved from the database.</p>
            </div>
          </div>

          <div className="design-bom-summary-grid">
            <div className="summary-item">
              <span>Projects available</span>
              <strong>
                {loadingProjects ? "…" : projects.length}
              </strong>
            </div>

            <div className="summary-item">
              <span>Stored drawings</span>
              <strong>
                {loadingDrawings ? "…" : drawings.length}
              </strong>
            </div>

            <div className="summary-item">
              <span>Stored BOM items</span>
              <strong>
                {loadingMaterials ? "…" : materials.length}
              </strong>
            </div>

            <div className="summary-item">
              <span>Recorded revisions</span>
              <strong>
                {loadingRevisions ? "…" : revisions.length}
              </strong>
            </div>
          </div>
        </section>
      )}

      {activeTab === "activity" && (
        <section className="design-bom-panel">
          <div className="panel-heading">
            <div>
              <h2>Data Status</h2>
              <p>Current backend data loading status.</p>
            </div>
          </div>

          <div className="design-bom-summary-grid">
            <div className="summary-item">
              <span>Projects API</span>
              <strong>{loadingProjects ? "Loading" : `${projects.length} records`}</strong>
            </div>

            <div className="summary-item">
              <span>Drawings API</span>
              <strong>{loadingDrawings ? "Loading" : `${drawings.length} records`}</strong>
            </div>

            <div className="summary-item">
              <span>BOM API</span>
              <strong>{loadingMaterials ? "Loading" : `${materials.length} records`}</strong>
            </div>

            <div className="summary-item">
              <span>Revision API</span>
              <strong>
                {loadingRevisions ? "Loading" : `${revisions.length} records`}
              </strong>
            </div>
          </div>

          <p className="section-note">
            This section does not generate fake activity entries. A true
            audit log requires a separate persistent audit table and backend
            events.
          </p>
        </section>
      )}

      {showDrawingForm && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !savingDrawing) {
              setShowDrawingForm(false);
            }
          }}
        >
          <div className="design-bom-modal">
            <div className="modal-header">
              <div>
                <h2>Upload Drawing</h2>
                <p>Save the drawing file against a real project.</p>
              </div>

              <button
                type="button"
                onClick={() => setShowDrawingForm(false)}
                disabled={savingDrawing}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {projects.length === 0 && !loadingProjects ? (
              <p className="section-note">
                No projects are available. Create a project first, then upload
                its drawing.
              </p>
            ) : (
              <form onSubmit={saveDrawing}>
                <div className="form-grid">
                  <label>
                    Drawing Number *
                    <input
                      name="drawingNumber"
                      value={drawingForm.drawingNumber}
                      onChange={updateDrawingForm}
                      required
                      maxLength={100}
                    />
                  </label>

                  <label>
                    Drawing Name *
                    <input
                      name="drawingName"
                      value={drawingForm.drawingName}
                      onChange={updateDrawingForm}
                      required
                      maxLength={200}
                    />
                  </label>

                  <label>
                    Project *
                    <select
                      name="projectCode"
                      value={drawingForm.projectCode}
                      onChange={updateDrawingForm}
                      required
                    >
                      <option value="">Select a project</option>
                      {projectOptions.map((project) => (
                        <option key={project.code} value={project.code}>
                          {project.code} — {project.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Engineer
                    <input
                      name="engineer"
                      value={drawingForm.engineer}
                      onChange={updateDrawingForm}
                      maxLength={150}
                    />
                  </label>

                  <label>
                    Drawing Date
                    <input
                      type="date"
                      name="drawingDate"
                      value={drawingForm.drawingDate}
                      onChange={updateDrawingForm}
                    />
                  </label>

                  <label>
                    Drawing File * (PDF, JPG, PNG; max 15 MB)
                    <input
                      type="file"
                      name="file"
                      accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                      onChange={updateDrawingForm}
                      required
                    />
                  </label>

                  <label className="form-full-width">
                    Remarks
                    <textarea
                      name="remarks"
                      value={drawingForm.remarks}
                      onChange={updateDrawingForm}
                      rows="3"
                    />
                  </label>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowDrawingForm(false)}
                    disabled={savingDrawing}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={savingDrawing}
                  >
                    {savingDrawing ? "Uploading…" : "Save Drawing"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {showBomForm && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !savingBom) {
              setShowBomForm(false);
            }
          }}
        >
          <div className="design-bom-modal">
            <div className="modal-header">
              <div>
                <h2>Add BOM Item</h2>
                <p>Material details will be stored in MySQL.</p>
              </div>

              <button
                type="button"
                onClick={() => setShowBomForm(false)}
                disabled={savingBom}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {projects.length === 0 && !loadingProjects ? (
              <p className="section-note">
                No projects are available. Create a project first.
              </p>
            ) : (
              <form onSubmit={saveBom}>
                <div className="form-grid">
                  <label>
                    Project *
                    <select
                      name="projectCode"
                      value={bomForm.projectCode}
                      onChange={updateBomForm}
                      required
                    >
                      <option value="">Select a project</option>
                      {projectOptions.map((project) => (
                        <option key={project.code} value={project.code}>
                          {project.code} — {project.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Material Name *
                    <input
                      name="materialName"
                      value={bomForm.materialName}
                      onChange={updateBomForm}
                      required
                      maxLength={200}
                      placeholder="e.g. MS Plate"
                    />
                  </label>

                  <label>
                    Material Grade
                    <input
                      name="materialGrade"
                      value={bomForm.materialGrade}
                      onChange={updateBomForm}
                      maxLength={100}
                      placeholder="e.g. IS 2062 E250"
                    />
                  </label>

                  <label>
                    Material Size
                    <input
                      name="materialSize"
                      value={bomForm.materialSize}
                      onChange={updateBomForm}
                      maxLength={100}
                      placeholder="e.g. 10 mm"
                    />
                  </label>

                  <label>
                    Length (mm)
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="length"
                      value={bomForm.length}
                      onChange={updateBomForm}
                    />
                  </label>

                  <label>
                    Width (mm)
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="width"
                      value={bomForm.width}
                      onChange={updateBomForm}
                    />
                  </label>

                  <label>
                    Quantity *
                    <input
                      type="number"
                      min="0.001"
                      step="0.001"
                      name="quantity"
                      value={bomForm.quantity}
                      onChange={updateBomForm}
                      required
                    />
                  </label>

                  <label>
                    Unit *
                    <select
                      name="unit"
                      value={bomForm.unit}
                      onChange={updateBomForm}
                      required
                    >
                      <option value="Piece">Piece</option>
                      <option value="Sheet">Sheet</option>
                      <option value="Kg">Kg</option>
                      <option value="Meter">Meter</option>
                      <option value="Set">Set</option>
                      <option value="Nos">Nos</option>
                    </select>
                  </label>

                  <label>
                    Weight per Unit (kg) *
                    <input
                      type="number"
                      min="0"
                      step="0.001"
                      name="weight"
                      value={bomForm.weight}
                      onChange={updateBomForm}
                      required
                    />
                  </label>

                  <label className="form-full-width">
                    Remarks
                    <textarea
                      name="remarks"
                      value={bomForm.remarks}
                      onChange={updateBomForm}
                      rows="3"
                    />
                  </label>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowBomForm(false)}
                    disabled={savingBom}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={savingBom}
                  >
                    {savingBom ? "Saving…" : "Save BOM Item"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {showRevisionForm && selectedDrawing && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !savingRevision) {
              setShowRevisionForm(false);
            }
          }}
        >
          <div className="design-bom-modal">
            <div className="modal-header">
              <div>
                <h2>Upload New Revision</h2>
                <p>
                  {selectedDrawing.drawingNumber} —{" "}
                  {selectedDrawing.drawingName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowRevisionForm(false)}
                disabled={savingRevision}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={saveRevision}>
              <div className="form-grid">
                <label>
                  Revision Number *
                  <input
                    name="revisionNumber"
                    value={revisionForm.revisionNumber}
                    onChange={updateRevisionForm}
                    required
                    maxLength={50}
                    placeholder="e.g. Rev 01"
                  />
                </label>

                <label>
                  Revision File *
                  <input
                    type="file"
                    name="file"
                    accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                    onChange={updateRevisionForm}
                    required
                  />
                </label>

                <label className="form-full-width">
                  Revision Remarks
                  <textarea
                    name="remarks"
                    value={revisionForm.remarks}
                    onChange={updateRevisionForm}
                    rows="3"
                  />
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowRevisionForm(false)}
                  disabled={savingRevision}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={savingRevision}
                >
                  {savingRevision ? "Uploading…" : "Save Revision"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedDrawing && !showRevisionForm && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedDrawing(null);
            }
          }}
        >
          <div className="design-bom-modal">
            <div className="modal-header">
              <div>
                <h2>Drawing Details</h2>
                <p>Saved drawing record</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDrawing(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="design-bom-summary-grid">
              <div className="summary-item">
                <span>Drawing Number</span>
                <strong>{selectedDrawing.drawingNumber || "—"}</strong>
              </div>

              <div className="summary-item">
                <span>Drawing Name</span>
                <strong>{selectedDrawing.drawingName || "—"}</strong>
              </div>

              <div className="summary-item">
                <span>Project</span>
                <strong>{projectNameFor(selectedDrawing.projectCode)}</strong>
              </div>

              <div className="summary-item">
                <span>Project Code</span>
                <strong>{selectedDrawing.projectCode || "—"}</strong>
              </div>

              <div className="summary-item">
                <span>Engineer</span>
                <strong>{selectedDrawing.engineer || "—"}</strong>
              </div>

              <div className="summary-item">
                <span>Drawing Date</span>
                <strong>{formatDate(selectedDrawing.drawingDate)}</strong>
              </div>

              <div className="summary-item">
                <span>Revision</span>
                <strong>{selectedDrawing.revision || "—"}</strong>
              </div>

              <div className="summary-item">
                <span>Current Status</span>
                <strong>{selectedDrawing.status || "—"}</strong>
              </div>
            </div>

            <div className="section-note">
              <strong>Remarks:</strong> {selectedDrawing.remarks || "No remarks saved."}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  openRevisionForm(selectedDrawing);
                }}
              >
                Upload Revision
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={() => openPreview(selectedDrawing)}
              >
                View File
              </button>
            </div>
          </div>
        </div>
      )}

      {previewFile && (
        <div
          className="modal-overlay preview-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPreviewFile(null);
            }
          }}
        >
          <div className="design-bom-modal preview-modal">
            <div className="modal-header">
              <div>
                <h2>{previewFile.originalFileName || previewFile.fileName || "Drawing Preview"}</h2>
                <p>File served by the backend.</p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewFile(null)}
                aria-label="Close preview"
              >
                ×
              </button>
            </div>

            {isPdf(previewFile) ? (
              <iframe
                title="Drawing PDF preview"
                src={previewFile.fileUrl}
                className="drawing-preview-frame"
              />
            ) : isImage(previewFile) ? (
              <div className="drawing-image-preview">
                <img
                  src={previewFile.fileUrl}
                  alt={previewFile.originalFileName || previewFile.fileName || "Drawing"}
                />
              </div>
            ) : (
              <div className="empty-state">
                Browser preview is not available for this file type.
              </div>
            )}

            <div className="modal-actions">
              <a
                href={previewFile.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Open in New Tab
              </a>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => setPreviewFile(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
