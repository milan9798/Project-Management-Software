
import {
  LayoutDashboard,
  FolderKanban,
  Ruler,
  Truck,
  Settings,
  Building2,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import companyLogo from "../../assets/icon.png";

import "./Sidebar.css";

const menuItems = [
  { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
  { label: "Project Management", key: "projects", icon: FolderKanban },
  { label: "Design & BOM", key: "design-bom", icon: Ruler },
  { label: "Dispatch Management", key: "dispatch", icon: Truck },
  { label: "Settings & Users", key: "settings-users", icon: Settings },
];


export default function Sidebar({
  activePage,
  onNavigate,
  collapsed,
  onToggle,
}) {
  return (
    <aside className={`app-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-brand">

        <div className="sidebar-logo">
  <img src={companyLogo} alt="TOPLAND ENGINE Logo" />
</div>

        {!collapsed && (
          <div className="sidebar-brand-text">
            <strong>TOPLAND ENGINE</strong>
            <span>PRIVATE LIMITED</span>
          </div>
        )}
      </div>

      <button
        type="button"
        className="sidebar-toggle"
        onClick={onToggle}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-label="Toggle sidebar"
      >
        {collapsed ? (
          <PanelLeftOpen size={19} />
        ) : (
          <PanelLeftClose size={19} />
        )}
      </button>

      {!collapsed && (
        <div className="sidebar-section">WORKSPACE</div>
      )}

      <nav className="sidebar-nav">
        {menuItems.map(({ label, key, icon: Icon }) => (
          <button
            type="button"
            key={key}
            title={collapsed ? label : undefined}
            onClick={() => onNavigate(key)}
            className={`sidebar-link ${
              activePage === key ? "active" : ""
            }`}
          >
            <Icon size={20} strokeWidth={1.9} />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-status-dot" />
        {!collapsed && (
          <div>
            <strong>Fabrication ERP</strong>
            <span>Project Workspace</span>
          </div>
        )}
      </div>
    </aside>
  );
}





