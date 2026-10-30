  

  
import { useCallback, useEffect, useState } from "react";

import {
  Plus,
  Search,
  Truck,
  Package,
  CalendarDays,
  RefreshCw,
  X,
  Eye,
  CircleAlert,
  Trash2,
} from "lucide-react";

import "./DispatchManagement.css";

const API_URL = "http://localhost:5000/api/dispatches";
const PROJECTS_URL = "http://localhost:5000/api/projects";

const initialForm = {
  dispatchNumber: "",
  projectId: "",
  customerName: "",
  dispatchDate: new Date().toISOString().slice(0, 10),
  destination: "",
  materialDescription: "",
  quantity: "1",
  unit: "Piece",
  vehicleNumber: "",
  transporterName: "",
  driverName: "",
  driverPhone: "",
  status: "PLANNED",
  deliveryDate: "",
  remarks: "",
};

const statusLabels = {
  PLANNED: "Planned",
  READY: "Ready",
  DISPATCHED: "Dispatched",
  DELIVERED: "Delivered",
  ON_HOLD: "On Hold",
  DELIVERY_ISSUE: "Delivery Issue",
};



function DispatchManagement() {
  const [dispatches, setDispatches] = useState([]);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDispatch, setSelectedDispatch] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const fetchDispatches = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (search.trim()) params.set("search", search.trim());
      if (statusFilter) params.set("status", statusFilter);

      const response = await fetch(`${API_URL}?${params.toString()}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Dispatch records load nahi hue."
        );
      }

      setDispatches(data.dispatches || []);
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  const fetchProjects = useCallback(async () => {
    setProjectsLoading(true);

    try {
      const response = await fetch(PROJECTS_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Projects cannot load.");
      }

      const list = Array.isArray(data)
        ? data
        : data.projects || data.data || [];

      setProjects(list);
    } catch (err) {
      console.error("Projects load error:", err);
      setProjects([]);
    } finally {
      setProjectsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDispatches();
  }, [fetchDispatches]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openCreateForm = () => {
    setForm({
      ...initialForm,
      dispatchDate: new Date().toISOString().slice(0, 10),
    });
    setSelectedDispatch(null);
    setError("");
    setNotice("");
    setModalOpen(true);
  };

  const handleProjectChange = (projectId) => {
    const project = projects.find(
      (item) => String(item.id) === String(projectId)
    );

    setForm((current) => ({
      ...current,
      projectId,
      customerName: project?.customerName || current.customerName,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const payload = {
        ...form,
        projectId: Number(form.projectId),
        quantity: Number(form.quantity),
        deliveryDate: form.deliveryDate || null,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Dispatch was not created.");
      }

      setModalOpen(false);
      setForm(initialForm);
      setNotice("Dispatch created successfully.");
      await fetchDispatches();
    } catch (err) {
      setError(err.message || "An error occurred while saving the dispatch.");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (dispatch, status) => {
    if (dispatch.status === status) return;

    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `${API_URL}/${dispatch.id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Status cannot updated ");
      }

      setNotice(
        `Dispatch ${dispatch.dispatchNumber}  status updated  successfully.`
      );



      await fetchDispatches();
    } catch (err) {
      setError(err.message || "An error occurred while updating the status.");
    }

  };

  // Delete a dispatch record after user confirmation.

  const handleDelete = async (dispatch) => {
    if (deletingId !== null) return;

    const confirmed = window.confirm(
      // `Kya aap dispatch "${dispatch.dispatchNumber}" ko permanently delete karna chahte hain?\n\nYeh action undo nahi kiya ja sakta.`

       `Are you sure you want to permanently delete dispatch "${dispatch.dispatchNumber}"?\n\nThis action cannot be undone.`

    );

    if (!confirmed) return;

    setDeletingId(dispatch.id);
    setError("");
    setNotice("");

    try {
      const response = await fetch(`${API_URL}/${dispatch.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Dispatch records cannot delete."
        );
      }

      if (selectedDispatch?.id === dispatch.id) {
        setSelectedDispatch(null);
      }

      setNotice(
        `Dispatch ${dispatch.dispatchNumber} successfully delete .`
      );

      await fetchDispatches();
    } catch (err) {
      setError(
        err.message || "An error occurred while deleting the dispatch."
      );

    } finally {
      setDeletingId(null);
    }

  };

  const totalQuantity = dispatches.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const dispatchedCount = dispatches.filter(
    (item) => item.status === "DISPATCHED"
  ).length;

  const deliveredCount = dispatches.filter(
    (item) => item.status === "DELIVERED"
  ).length;

  return (
    <main className="dispatch-page">
      <section className="dispatch-heading">
        <div>
          <div className="dispatch-eyebrow">
            LOGISTICS &amp; DELIVERY
          </div>
          <h1>Dispatch Management</h1>
          <p>
            Plan shipments, manage vehicle details and track material
            deliveries.
          </p>
        </div>

        <button
          type="button"
          className="dispatch-primary-btn"
          onClick={openCreateForm}
        >
          <Plus size={18} />
          Create Dispatch
        </button>
      </section>

      {notice && (
        <div className="dispatch-alert dispatch-alert-success">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && (
        <div className="dispatch-alert dispatch-alert-error">
          <CircleAlert size={18} />
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <section className="dispatch-stats">
        <article className="dispatch-stat-card">
          <div className="dispatch-stat-icon navy">
            <Package size={21} />
          </div>
          <div>
            <span>Total Dispatches</span>
            <strong>{dispatches.length}</strong>
            <small>Matching records</small>
          </div>
        </article>

        <article className="dispatch-stat-card">
          <div className="dispatch-stat-icon blue">
            <Truck size={21} />
          </div>
          <div>
            <span>In Transit</span>
            <strong>{dispatchedCount}</strong>
            <small>Dispatched shipments</small>
          </div>
        </article>

        <article className="dispatch-stat-card">
          <div className="dispatch-stat-icon green">
            <CalendarDays size={21} />
          </div>
          <div>
            <span>Delivered</span>
            <strong>{deliveredCount}</strong>
            <small>Completed deliveries</small>
          </div>
        </article>

        <article className="dispatch-stat-card">
          <div className="dispatch-stat-icon orange">
            <Package size={21} />
          </div>
          <div>
            <span>Total Quantity</span>
            <strong>{totalQuantity.toLocaleString("en-IN")}</strong>
            <small>Across matching records</small>
          </div>
        </article>
      </section>

      <section className="dispatch-content-card">
        <div className="dispatch-content-heading">
          <div>
            <h2>Dispatch Register</h2>
            <p>View and manage all recorded shipments.</p>
          </div>

          <button
            type="button"
            className="dispatch-refresh-btn"
            onClick={fetchDispatches}
            disabled={loading}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        <div className="dispatch-toolbar">
          <div className="dispatch-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search dispatch, project, customer..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            className="dispatch-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by dispatch status"
          >
            <option value="">All statuses</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="dispatch-table-wrap">
          <table className="dispatch-table">
            <thead>
              <tr>
                <th>Dispatch Details</th>
                <th>Project / Customer</th>
                <th>Dispatch Date</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Update Status</th>
                <th>Details</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="dispatch-table-message">
                    Loading dispatch records...
                  </td>
                </tr>
              ) : dispatches.length === 0 ? (
                <tr>
                  <td colSpan="8" className="dispatch-table-message">
                    <div className="dispatch-empty">
                      <div className="dispatch-empty-icon">
                        <Truck size={28} />
                      </div>
                      <strong>No dispatch records found</strong>
                      <span>
                        Create your first dispatch to start tracking
                        deliveries.
                      </span>
                      <button
                        type="button"
                        className="dispatch-primary-btn"
                        onClick={openCreateForm}
                      >
                        <Plus size={17} />
                        Create First Dispatch
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                dispatches.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong className="dispatch-number">
                        {item.dispatchNumber}
                      </strong>
                      <span className="dispatch-subtext">
                        {item.materialDescription ||
                          "Material not specified"}
                      </span>
                    </td>

                    <td>
                      <strong>
                        {item.projectCode || `Project #${item.projectId}`}
                      </strong>
                      <span className="dispatch-subtext">
                        {item.projectName || item.customerName}
                      </span>
                    </td>

                    <td>
                      {item.dispatchDate
                        ? String(item.dispatchDate).slice(0, 10)
                        : "—"}
                    </td>

                    <td>
                      <strong>
                        {Number(item.quantity || 0).toLocaleString("en-IN")}
                      </strong>{" "}
                      {item.unit}
                    </td>

                    <td>
                      <span
                        className={`dispatch-status status-${item.status?.toLowerCase()}`}
                      >
                        {statusLabels[item.status] || item.status}
                      </span>
                    </td>

                    <td>

                      <select
                        className="dispatch-row-status"
                        value={item.status}
                        disabled={deletingId === item.id}
                        onChange={(event) =>
                          handleStatusChange(item, event.target.value)
                        }
                        aria-label={`Update status for ${item.dispatchNumber}`}
                      >
                        {Object.entries(statusLabels).map(
                          ([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="dispatch-view-btn"
                        onClick={() => setSelectedDispatch(item)}
                        aria-label={`View ${item.dispatchNumber}`}
                        title="View details"
                      >
                        <Eye size={17} />
                      </button>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="dispatch-view-btn dispatch-delete-btn"
                        onClick={() => handleDelete(item)}
                        disabled={deletingId !== null}
                        aria-label={`Delete ${item.dispatchNumber}`}
                        title="Delete dispatch record"
                      >
                        {deletingId === item.id ? (
                          <RefreshCw size={17} />
                        ) : (
                          <Trash2 size={17} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="dispatch-table-footer">
          Showing {dispatches.length} dispatch record(s)
        </div>
      </section>

      {modalOpen && (
        <div
          className="dispatch-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) {
              setModalOpen(false);
            }
          }}
        >
          <section
            className="dispatch-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dispatch-form-title"
          >
            <div className="dispatch-modal-heading">
              <div>
                <span className="dispatch-eyebrow">SHIPMENT ENTRY</span>
                <h2 id="dispatch-form-title">Create New Dispatch</h2>
                <p>
                  Enter the shipment and delivery information below.
                </p>
              </div>
              <button
                type="button"
                className="dispatch-close-btn"
                onClick={() => setModalOpen(false)}
                aria-label="Close form"
                disabled={saving}
              >
                <X size={20} />
              </button>
            </div>

            <form className="dispatch-form" onSubmit={handleSubmit}>
              <div className="dispatch-form-section-title">
                Dispatch Information
              </div>

              <div className="dispatch-form-grid">
                <label>
                  Dispatch Number *
                  <input
                    required
                    maxLength="50"
                    placeholder="e.g. DSP-2026-001"
                    value={form.dispatchNumber}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        dispatchNumber: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Project *
                  <select
                    required
                    value={form.projectId}
                    onChange={(event) =>
                      handleProjectChange(event.target.value)
                    }
                    disabled={projectsLoading}
                  >
                    <option value="">
                      {projectsLoading
                        ? "Loading projects..."
                        : "Select project"}
                    </option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.projectCode} — {project.projectName}
                      </option>
                    ))}
                  </select>
                  {!projectsLoading && projects.length === 0 && (
                    <small className="dispatch-field-hint">
                      No projects found. Create a project first.
                    </small>
                  )}
                </label>

                <label>
                  Customer Name *
                  <input
                    required
                    maxLength="200"
                    placeholder="Customer name"
                    value={form.customerName}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        customerName: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Dispatch Date *
                  <input
                    type="date"
                    required
                    value={form.dispatchDate}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        dispatchDate: event.target.value,
                      })
                    }
                  />
                </label>

                <label className="dispatch-field-full">
                  Destination / Delivery Address
                  <input
                    maxLength="500"
                    placeholder="Enter delivery address"
                    value={form.destination}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        destination: event.target.value,
                      })
                    }
                  />
                </label>

                <label className="dispatch-field-full">
                  Material Description
                  <textarea
                    rows="2"
                    placeholder="Describe the material being dispatched"
                    value={form.materialDescription}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        materialDescription: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Quantity *
                  <input
                    type="number"
                    min="0.001"
                    step="0.001"
                    required
                    value={form.quantity}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        quantity: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Unit *
                  <select
                    required
                    value={form.unit}
                    onChange={(event) =>
                      setForm({ ...form, unit: event.target.value })
                    }
                  >
                    <option>Piece</option>
                    <option>Kg</option>
                    <option>Ton</option>
                    <option>Meter</option>
                    <option>Set</option>
                    <option>Bundle</option>
                    <option>Box</option>
                  </select>
                </label>

                <label>
                  Initial Status
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm({ ...form, status: event.target.value })
                    }
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="dispatch-form-section-title">
                Transport Details
              </div>

              <div className="dispatch-form-grid">
                <label>
                  Vehicle Number
                  <input
                    maxLength="50"
                    placeholder="e.g. GJ03AB1234"
                    value={form.vehicleNumber}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        vehicleNumber: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Transporter Name
                  <input
                    maxLength="200"
                    placeholder="Transport company"
                    value={form.transporterName}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        transporterName: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Driver Name
                  <input
                    maxLength="150"
                    placeholder="Driver name"
                    value={form.driverName}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        driverName: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Driver Phone
                  <input
                    type="tel"
                    maxLength="20"
                    placeholder="Driver contact number"
                    value={form.driverPhone}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        driverPhone: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Expected Delivery Date
                  <input
                    type="date"
                    value={form.deliveryDate}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        deliveryDate: event.target.value,
                      })
                    }
                  />
                </label>

                <label className="dispatch-field-full">
                  Remarks
                  <textarea
                    rows="2"
                    placeholder="Additional delivery instructions"
                    value={form.remarks}
                    onChange={(event) =>
                      setForm({ ...form, remarks: event.target.value })
                    }
                  />
                </label>
              </div>

              {error && (
                <div className="dispatch-alert dispatch-alert-error">
                  <CircleAlert size={17} />
                  <span>{error}</span>
                </div>
              )}

              <div className="dispatch-form-actions">
                <button
                  type="button"
                  className="dispatch-secondary-btn"
                  onClick={() => setModalOpen(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="dispatch-primary-btn"
                  disabled={
                    saving || projectsLoading || projects.length === 0
                  }
                >
                  {saving ? "Saving..." : "Save Dispatch"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {selectedDispatch && (
        <div
          className="dispatch-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedDispatch(null);
            }
          }}
        >
          <section
            className="dispatch-modal dispatch-details-modal"
            role="dialog"
            aria-modal="true"
          >
            <div className="dispatch-modal-heading">
              <div>
                <span className="dispatch-eyebrow">DISPATCH RECORD</span>
                <h2>{selectedDispatch.dispatchNumber}</h2>
                <p>
                  {selectedDispatch.projectName ||
                    selectedDispatch.customerName}
                </p>
              </div>
              <button
                type="button"
                className="dispatch-close-btn"
                onClick={() => setSelectedDispatch(null)}
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="dispatch-details-grid">
              {[
                ["Customer", selectedDispatch.customerName],
                ["Project Code", selectedDispatch.projectCode],
                ["Dispatch Date", selectedDispatch.dispatchDate],
                ["Material", selectedDispatch.materialDescription],
                [
                  "Quantity",
                  `${selectedDispatch.quantity} ${selectedDispatch.unit}`,
                ],
                ["Destination", selectedDispatch.destination],
                ["Vehicle Number", selectedDispatch.vehicleNumber],
                ["Transporter", selectedDispatch.transporterName],
                ["Driver", selectedDispatch.driverName],
                ["Driver Phone", selectedDispatch.driverPhone],
                ["Expected Delivery", selectedDispatch.deliveryDate],
                ["Remarks", selectedDispatch.remarks],
              ].map(([label, value]) => (
                <div className="dispatch-detail-item" key={label}>
                  <span>{label}</span>
                  <strong>{value || "—"}</strong>
                </div>
              ))}
            </div>

            <div className="dispatch-form-actions">
              <button
                type="button"
                className="dispatch-secondary-btn"
                onClick={() => setSelectedDispatch(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="dispatch-delete-action"
                disabled={deletingId !== null}
                onClick={() => handleDelete(selectedDispatch)}
              >
                <Trash2 size={16} />
                Delete Record
              </button>
            </div>
          </section>
        </div>
      )}

    </main>
  );
}


export default DispatchManagement;
