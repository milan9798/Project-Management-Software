


import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";


import ProjectManagement from "../ProjectManagement/ProjectManagement";

import "./Dashboard.css";

import { useState, useEffect } from "react";


import { useLocation, useNavigate } from "react-router-dom";

import {
  FolderKanban,
  Activity,
  ClipboardList,
  PackageCheck,
  TrendingUp,
  CalendarDays,
  RefreshCw,
  FileText,
  Building2,
  AlertTriangle,
  ArrowUpRight,
  ArrowRight,
  Wallet,
  Clock3,
  Truck,
  Factory,
  Boxes,
  Wrench,
  CheckCircle2,
  CircleDollarSign,
  Plus,
  Layers,
  ShieldCheck,
  Gauge,
} from "lucide-react";


const modules = {
  projects: {
    title: "Project Management",
    description: "Manage fabrication projects, customer orders, deadlines and project progress.",
    icon: FolderKanban,
  },
  "design-bom": {
    title: "Design & BOM",
    description: "Manage engineering drawings, revisions and bill of materials.",
    icon: ClipboardList,
  },
  dispatch: {
    title: "Dispatch Management",
    description: "Manage finished steel structures, dispatch schedules and delivery records.",
    icon: PackageCheck,
  },
  "settings-users": {
    title: "Settings & Users",
    description: "Manage company settings, user accounts and access permissions.",
    icon: Activity,
  },
};

const summaryCards = [
  {
    title: "ACTIVE PROJECTS",
    value: "—",
    note: "Projects currently in progress",
    icon: FolderKanban,
    tone: "blue",
  },
  {
    title: "ORDERS VALUE",
    value: "—",
    note: "Value of recorded orders",
    icon: ClipboardList,
    tone: "purple",
  },
  {
    title: "REVENUE THIS MONTH",
    value: "—",
    note: "Based on recorded revenue",
    icon: TrendingUp,
    tone: "green",
  },
  {
    title: "TOTAL EXPENSES",
    value: "—",
    note: "Based on recorded expenses",
    icon: Wallet,
    tone: "orange",
  },
  {
    title: "CUSTOMER OUTSTANDING",
    value: "—",
    note: "Payments to be collected",
    icon: CircleDollarSign,
    tone: "rose",
  },
  {
    title: "DISPATCH PENDING",
    value: "—",
    note: "Orders awaiting dispatch",
    icon: Truck,
    tone: "cyan",
  },
];

const productionStages = [
  {
    title: "Design & BOM",
    description: "Drawings and material planning",
    icon: ClipboardList,
  },
  {
    title: "Fabrication",
    description: "Cutting, drilling, welding and assembly",
    icon: Wrench,
  },
  {
    title: "Quality Inspection",
    description: "Inspection and quality clearance",
    icon: ShieldCheck,
  },
  {
    title: "Ready for Dispatch",
    description: "Finished material awaiting delivery",
    icon: PackageCheck,
  },
];

function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="topland-empty-state">
      <div className="topland-empty-icon">
        <Icon size={21} strokeWidth={1.7} />
      </div>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}

export default function Dashboard({ user, onLogout }) {

const [projects, setProjects] = useState([]);
const [projectsLoading, setProjectsLoading] = useState(true);
const [projectsError, setProjectsError] = useState("");



const [financeData, setFinanceData] = useState(null);
  const [financeError, setFinanceError] = useState("");



useEffect(() => {
  const loadDashboardProjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/projects"
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Projects load nahi ho sake.");
      }

      setProjects(result.data || []);
      setProjectsError("");
    } catch (error) {
      setProjectsError(error.message);
    } finally {
      setProjectsLoading(false);
    }
  };

  loadDashboardProjects();
}, []);




useEffect(() => {
  const loadFinanceSummary = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/finance/summary"
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Finance data load nahi ho saka.");
      }

      setFinanceData(result.data);
      setFinanceError("");
    } catch (error) {
      setFinanceError(error.message);
    }
  };

  loadFinanceSummary();
}, []);


const getProjectStatus = (project) =>
  String(project.status || "")
    .trim()
    .toUpperCase()
    .replace(/[_-]/g, " ");

const activeProjects = projects.filter(
  (project) => getProjectStatus(project) === "IN PROGRESS"
).length;

const totalOrderValue = projects.reduce(
  (total, project) => total + Number(project.orderValue || 0),
  0
);

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);






  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const routeToPage = {
    "/dashboard": "dashboard",
    "/projects": "projects",
    "/design-bom": "design-bom",
    "/dispatch": "dispatch",
    "/settings-users": "settings-users",
  };

  const pageToRoute = {
    dashboard: "/dashboard",
    projects: "/projects",
    "design-bom": "/design-bom",
    dispatch: "/dispatch",
    "settings-users": "/settings-users",
  };

  const activePage = routeToPage[location.pathname] || "dashboard";
  const selectedModule = modules[activePage];

  const handleNavigate = (page) => {
    navigate(pageToRoute[page] || "/dashboard");
  };

  const firstName = user?.name?.trim()?.split(/\s+/)[0] || "Team";
  const today = new Date();
  const currentDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const dateRange = `${monthStart.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  })} – ${monthEnd.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;

  const goToProjects = () => handleNavigate("projects");
  const goToDesign = () => handleNavigate("design-bom");
  const goToDispatch = () => handleNavigate("dispatch");

  return (

    <div className="topland-erp-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
      />

      <div className="topland-erp-main">
        <Header
          activePage={activePage}
          user={user}
          onLogout={onLogout}
        />



         <main className="topland-dashboard-content">
  {activePage === "projects" ? (
    <ProjectManagement />
  ) : activePage === "dashboard" ? (
    <div className="topland-dashboard-inner">

              {/* Welcome and quick actions */}
              <section className="topland-welcome-box">
                <div className="topland-welcome-copy">
                  <div className="topland-eyebrow">
                    <span className="topland-live-dot" />
                    COMPANY OVERVIEW
                  </div>

                  <h2>Welcome back, {firstName}.</h2>

                  <p>
                    Here&apos;s your fabrication business overview for {currentDate}.
                  </p>
                </div>

                <div className="topland-header-right">
                  <div className="topland-date-pill">
                    <CalendarDays size={16} />
                    <span>{dateRange}</span>
                  </div>

                  <button
                    type="button"
                    className="topland-primary-action"
                    onClick={goToProjects}
                  >
                    <Plus size={16} />
                    New Project
                  </button>
                </div>
              </section>

              {/* Business summary */}
              <section className="topland-section">
                <div className="topland-section-heading">
                  <div>
                    <h3>Business at a glance</h3>
                    <p>Your key operational and financial indicators</p>
                  </div>
                  <span className="topland-data-status">
                    <Activity size={13} />
                    Awaiting live data
                  </span>
                </div>

                <div className="topland-stats-container">
                  {summaryCards.map((stat) => {
                    const Icon = stat.icon;

                    return (
                      <article
                        key={stat.title}
                        className="topland-stat-card"
                      >
                        <div className="topland-card-top">
                          <div className={`topland-stat-icon tone-${stat.tone}`}>
                            <Icon size={19} strokeWidth={1.9} />
                          </div>
                          <span className="topland-stat-menu">
                            <span className="topland-status-dot" />
                            Overview
                          </span>
                        </div>

                        <div className="topland-card-title">
                          {stat.title}
                        </div>

                        {/* <div className="topland-card-value">
                          {stat.value}
                        </div> */}



                 {/* <div className="topland-card-value">
                    {projectsLoading
                  ? "Loading..."
                    : projectsError
                      ? "—"
                   : stat.title === "ACTIVE PROJECTS"
                      ? activeProjects
                       : stat.title === "ORDERS VALUE"
                        ? formatCurrency(totalOrderValue)
                       : stat.value}
                  </div> */}



                   
            <div className="topland-card-value">
                 {stat.title === "ACTIVE PROJECTS" ? (
               projectsLoading ? "Loading..." :
             projectsError ? "—" : activeProjects
            ) : stat.title === "ORDERS VALUE" ? (
                 projectsLoading ? "Loading..." :
             projectsError ? "—" : formatCurrency(totalOrderValue)
         ) : stat.title === "REVENUE THIS MONTH" ? (
        financeData ? formatCurrency(Number(financeData.revenueThisMonth || 0)) :
         financeError ? "—" : "Loading..."
         ) : stat.title === "TOTAL EXPENSES" ? (
             financeData ? formatCurrency(Number(financeData.totalExpenses || 0)) :
             financeError ? "—" : "Loading..."
            ) : stat.value}
       </div>





                        <div className="topland-card-bottom">
                          {stat.note}
                        </div>

                        
                      </article>
                    );

                  })}
                </div>
                
              </section>

              {/* Finance chart and payment overview */}
              <section className="topland-middle-grid">
                <article className="topland-box-panel topland-finance-panel">
                  <div className="topland-panel-head">
                    <div>
                      <span className="topland-panel-kicker">
                        FINANCIAL PERFORMANCE
                      </span>
                      <h3>Revenue vs Expenses</h3>
                      <p>Monthly financial performance over time</p>
                    </div>

                    <button
                      type="button"
                      className="topland-icon-action"
                      aria-label="Refresh financial overview"
                      title="Financial data is not connected yet"
                    >
                      <RefreshCw size={16} />
                    </button>
                  </div>

                  <div className="topland-chart-legend">
                    <span>
                      <i className="legend-revenue" />
                      Revenue
                    </span>
                    <span>
                      <i className="legend-expense" />
                      Expenses
                    </span>
                  </div>

                  <div className="topland-graph-area">
                    <div className="topland-chart-y-labels">
                      <span>—</span>
                      <span>—</span>
                      <span>—</span>
                      <span>—</span>
                    </div>



                     <div className="topland-chart-canvas">



{/* 
                      // <div className="topland-chart-gridline" />
                      // <div className="topland-chart-gridline" />
                      // <div className="topland-chart-gridline" />
                      // <div className="topland-chart-gridline" />

                      // <div className="topland-chart-empty">
                      //   <div className="topland-chart-empty-icon">
                      //     <TrendingUp size={22} />
                      //   </div>
                      //   <strong>Financial data will appear here</strong>
                      //   <span>
                      //     Connect revenue and expense records to view the monthly
                      //     trend.
                      //   </span>
                      // </div>
 */}







<div className="topland-chart-gridline" />
<div className="topland-chart-gridline" />
<div className="topland-chart-gridline" />
<div className="topland-chart-gridline" />

<div className="topland-chart-empty">
  {financeError ? (
    <>
      <strong>Finance data load nahi hua</strong>
      <span>{financeError}</span>
    </>
  ) : !financeData ? (
    <>
      <strong>Loading financial summary...</strong>
      <span>Please wait while finance data loads.</span>
    </>
  ) : (
    <div style={{ display: "grid", gap: "20px", width: "100%" }}>
      <div>
        <span>Revenue this month</span>
        <h2>
          {formatCurrency(Number(financeData.revenueThisMonth || 0))}
        </h2>
      </div>

      <div>
        <span>Expenses this month</span>
        <h2>
          {formatCurrency(Number(financeData.expensesThisMonth || 0))}
        </h2>
      </div>

      <div>
        <span>Total revenue recorded</span>
        <strong>
          {formatCurrency(Number(financeData.totalRevenue || 0))}
        </strong>
      </div>

      <div>
        <span>Total expenses recorded</span>
        <strong>
          {formatCurrency(Number(financeData.totalExpenses || 0))}
        </strong>
      </div>
    </div>
  )}
</div>

                      </div> 

                    
  
                  
                  </div>

                  <div className="topland-graph-months">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                      (month) => (
                        <span key={month}>{month}</span>
                      )
                    )}
                  </div>
                </article>

                <article className="topland-box-panel topland-payment-panel">
                  <div className="topland-panel-head">
                    <div>
                      <span className="topland-panel-kicker">
                        RECEIVABLES
                      </span>
                      <h3>Customer Outstanding</h3>
                      <p>Payments pending collection</p>
                    </div>
                    <div className="topland-panel-icon">
                      <CircleDollarSign size={20} />
                    </div>
                  </div>

                  <div className="topland-outstanding-total">
                    <span>Total outstanding</span>
                    <strong>—</strong>
                    <small>
                      <Clock3 size={13} />
                      Based on unpaid customer invoices
                    </small>
                  </div>

                  <div className="topland-divider" />

                  <div className="topland-aging-heading">
                    <strong>Payment aging</strong>
                    <span>Invoice due dates</span>
                  </div>

                  <div className="topland-aging-stack">
                    {[
                      { label: "0–30 days", tone: "green" },
                      { label: "31–60 days", tone: "blue" },
                      { label: "61–90 days", tone: "amber" },
                      { label: "90+ days", tone: "rose" },
                    ].map((item) => (
                      <div className="topland-aging-row" key={item.label}>
                        <div className="topland-aging-info">
                          <span>
                            <i className={`aging-dot ${item.tone}`} />
                            {item.label}
                          </span>
                          <strong>—</strong>
                        </div>
                        <div className="topland-progress-bar">
                          <div className="topland-progress-empty" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="topland-panel-footnote">
                    Aging details will be calculated from actual invoice dates.
                  </p>
                </article>
              </section>

              {/* Project pipeline */}
              <section className="topland-box-panel topland-production-panel">
                <div className="topland-panel-head">
                  <div>
                    <span className="topland-panel-kicker">
                      PROJECT DELIVERY
                    </span>
                    <h3>Project & Production Pipeline</h3>
                    <p>Track each job from engineering to dispatch</p>
                  </div>

                  <button
                    type="button"
                    className="topland-text-action"
                    onClick={goToProjects}
                  >
                    View projects <ArrowRight size={15} />
                  </button>
                </div>

                <div className="topland-production-grid">
                  {productionStages.map((stage, index) => {
                    const Icon = stage.icon;

                    return (
                      <button
                        type="button"
                        className="topland-production-stage"
                        key={stage.title}
                        onClick={
                          index === 0
                            ? goToDesign
                            : index === 3
                              ? goToDispatch
                              : goToProjects
                        }
                      >
                        <div className={`topland-stage-icon stage-${index + 1}`}>
                          <Icon size={20} />
                        </div>

                        <div className="topland-stage-copy">
                          <span className="topland-stage-number">
                            STAGE 0{index + 1}
                          </span>
                          <strong>{stage.title}</strong>
                          <span>{stage.description}</span>
                        </div>

                        <div className="topland-stage-footer">
                          <span>Jobs in stage</span>
                          <strong>—</strong>
                        </div>

                        <div className="topland-stage-track">
                          <div />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Steel inventory and dispatch */}
              <section className="topland-operations-grid">
                <article className="topland-box-panel">
                  <div className="topland-panel-head">
                    <div>
                      <span className="topland-panel-kicker">
                        MATERIAL CONTROL
                      </span>
                      <h3>Steel Inventory</h3>
                      <p>Material availability and stock health</p>
                    </div>
                    <div className="topland-panel-icon tone-purple">
                      <Boxes size={20} />
                    </div>
                  </div>

                  <div className="topland-inventory-metrics">
                    <div>
                      <span>Total stock</span>
                      <strong>— <small>kg / MT</small></strong>
                    </div>
                    <div>
                      <span>Reserved for projects</span>
                      <strong>— <small>kg / MT</small></strong>
                    </div>
                    <div>
                      <span>Low-stock items</span>
                      <strong>—</strong>
                    </div>
                  </div>

                  <div className="topland-inline-notice">
                    <AlertTriangle size={16} />
                    <span>
                      Stock levels and alerts require inventory records.
                    </span>
                  </div>
                </article>

                <article className="topland-box-panel">
                  <div className="topland-panel-head">
                    <div>
                      <span className="topland-panel-kicker">
                        LOGISTICS
                      </span>
                      <h3>Dispatch Overview</h3>
                      <p>Finished material and delivery readiness</p>
                    </div>
                    <div className="topland-panel-icon tone-cyan">
                      <Truck size={20} />
                    </div>
                  </div>

                  <div className="topland-dispatch-list">
                    <div className="topland-dispatch-item">
                      <span className="dispatch-icon dispatch-ready">
                        <CheckCircle2 size={17} />
                      </span>
                      <div>
                        <strong>Ready for dispatch</strong>
                        <span>Quality-cleared finished jobs</span>
                      </div>
                      <b>—</b>
                    </div>

                    <div className="topland-dispatch-item">
                      <span className="dispatch-icon dispatch-pending">
                        <Truck size={17} />
                      </span>
                      <div>
                        <strong>Dispatch pending</strong>
                        <span>Jobs awaiting shipment</span>
                      </div>
                      <b>—</b>
                    </div>

                    <div className="topland-dispatch-item">
                      <span className="dispatch-icon dispatch-delay">
                        <Clock3 size={17} />
                      </span>
                      <div>
                        <strong>Delivery delays</strong>
                        <span>Orders past their delivery date</span>
                      </div>
                      <b>—</b>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="topland-text-action topland-dispatch-link"
                    onClick={goToDispatch}
                  >
                    Open dispatch management <ArrowRight size={15} />
                  </button>
                </article>
              </section>

              {/* Customers and recent activity */}
              <section className="topland-bottom-grid">
                <article className="topland-box-panel">
                  <div className="topland-panel-head">
                    <div>
                      <span className="topland-panel-kicker">
                        CUSTOMER PORTFOLIO
                      </span>
                      <h3>Top Customers & Projects</h3>
                      <p>Customer orders and project value</p>
                    </div>
                    <button
                      type="button"
                      className="topland-text-action"
                      onClick={goToProjects}
                    >
                      View all <ArrowRight size={15} />
                    </button>
                  </div>

                  <EmptyState
                    icon={Building2}
                    title="Customer project data not connected"
                    description="Customer names, order values and project rankings will appear here when project records are available."
                  />
                </article>

                <article className="topland-box-panel">
                  <div className="topland-panel-head">
                    <div>
                      <span className="topland-panel-kicker">
                        WORKSPACE UPDATES
                      </span>
                      <h3>Recent Activity</h3>
                      <p>Latest changes across your operations</p>
                    </div>
                    <div className="topland-panel-icon">
                      <RefreshCw size={18} />
                    </div>
                  </div>

                  <div className="topland-activity-list">
                    <div className="topland-activity-item">
                      <div className="activity-icon activity-blue">
                        <FolderKanban size={16} />
                      </div>
                      <div className="topland-activity-copy">
                        <strong>Project updates</strong>
                        <span>Project creation and milestone changes</span>
                      </div>
                      <span className="topland-activity-time">—</span>
                    </div>

                    <div className="topland-activity-item">
                      <div className="activity-icon activity-purple">
                        <FileText size={16} />
                      </div>
                      <div className="topland-activity-copy">
                        <strong>Design & BOM</strong>
                        <span>Drawing revisions and material list updates</span>
                      </div>
                      <span className="topland-activity-time">—</span>
                    </div>

                    <div className="topland-activity-item">
                      <div className="activity-icon activity-green">
                        <Factory size={16} />
                      </div>
                      <div className="topland-activity-copy">
                        <strong>Production progress</strong>
                        <span>Fabrication and inspection status changes</span>
                      </div>
                      <span className="topland-activity-time">—</span>
                    </div>

                    <div className="topland-activity-item">
                      <div className="activity-icon activity-orange">
                        <PackageCheck size={16} />
                      </div>
                      <div className="topland-activity-copy">
                        <strong>Dispatch activity</strong>
                        <span>Shipment and delivery record updates</span>
                      </div>
                      <span className="topland-activity-time">—</span>
                    </div>
                  </div>

                  <div className="topland-activity-note">
                    <Activity size={14} />
                    Live activity will appear after connecting the relevant APIs.
                  </div>
                </article>
              </section>

              {/* Footer */}
              <footer className="topland-dashboard-footer">
                <span>
                  <Building2 size={14} />
                  TOPLAND ENGINE PVT. LTD.
                </span>
                <span>Fabrication & Manufacturing ERP</span>
              </footer>
            </div>
          ) : (
            <section className="topland-module-fallback">
              {selectedModule && (
                <>
                  <div className="topland-fallback-icon">
                    {(() => {
                      const Icon = selectedModule.icon;
                      return <Icon size={30} />;
                    })()}
                  </div>
                  <span className="topland-fallback-tag">
                    TOPLAND ENGINE ERP
                  </span>
                  <h2>{selectedModule.title}</h2>
                  <p>{selectedModule.description}</p>
                  <div className="topland-fallback-box">
                    <strong>Workspace ready for the next step</strong>
                    <span>
                      Is module ka form, database aur API agle step mein
                      implement kar sakte hain.
                    </span>
                  </div>
                  <button
                    type="button"
                    className="topland-primary-action"
                    onClick={() => handleNavigate("dashboard")}
                  >
                    Back to Dashboard
                  </button>
                </>
              )}
            </section>
          )}
        </main>


      </div>


    </div>

  );
}
