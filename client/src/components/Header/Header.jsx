
// import { Bell, ChevronDown, Search } from "lucide-react";
// import "./Header.css";

// const pageTitles = {
//   dashboard: "Dashboard",
//   projects: "Project Management",
//   "design-bom": "Design & BOM",
//   dispatch: "Dispatch Management",
//   "settings-users": "Settings & Users",
// };

// export default function Header({ activePage, user, onLogout }) {
//   const displayName =
//     user?.name ||
//     user?.fullName ||
//     user?.username ||
//     "Administrator";

//   const initials = displayName
//     .split(" ")
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((part) => part[0])
//     .join("")
//     .toUpperCase();

//   return (
//     <header className="app-header">
//       <div className="header-heading">
//         <span className="header-eyebrow">TOPLAND ENGINE / WORKSPACE</span>
//         <h1>{pageTitles[activePage] || "Dashboard"}</h1>
//       </div>

//       <div className="header-actions">
//         <label className="header-search">
//           <Search size={17} />
//           <input
//             type="search"
//             placeholder="Search projects..."
//             aria-label="Search projects"
//           />
//           <kbd>⌘ K</kbd>
//         </label>

//         <button
//           type="button"
//           className="header-icon-button"
//           title="Notifications"
//           aria-label="Notifications"
//         >
//           <Bell size={19} />
//           <span className="notification-dot" />
//         </button>

//         <div className="header-user">
//           <div className="header-avatar">{initials || "A"}</div>
//           <div className="header-user-info">
//             <strong>{displayName}</strong>
//             <span>{user?.role || "Administrator"}</span>
//           </div>
//           <ChevronDown size={16} className="header-chevron" />

//           <button
//             type="button"
//             className="header-logout"
//             onClick={onLogout}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }





import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Search,
  UserRound,
  Settings,
  LogOut,
  CheckCheck,
  Command,
  FolderKanban,
  X,
} from "lucide-react";
import "./Header.css";

const pageDetails = {
  dashboard: {
    title: "Dashboard",
    description: "Your project overview",
  },
  projects: {
    title: "Project Management",
    description: "Projects and execution",
  },
  "design-bom": {
    title: "Design & BOM",
    description: "Engineering and materials",
  },
  dispatch: {
    title: "Dispatch Management",
    description: "Deliveries and shipments",
  },
  "settings-users": {
    title: "Settings & Users",
    description: "Workspace configuration",
  },
};

export default function Header({ activePage, user, onLogout }) {
  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);

  const searchRef = useRef(null);
  const headerRef = useRef(null);

  const currentPage =
    pageDetails[activePage] || pageDetails.dashboard;

  const displayName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    "Administrator";

  const role = user?.role || "Administrator";

  const initials = displayName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key === "Escape") {
        setNotificationsOpen(false);
        setProfileOpen(false);
        searchRef.current?.blur();
      }
    };

    const handleOutsideClick = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const clearSearch = () => {
    setSearch("");
    searchRef.current?.focus();
  };

  const toggleNotifications = () => {
    setNotificationsOpen((open) => !open);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen((open) => !open);
    setNotificationsOpen(false);
  };

  return (
    <header className="app-header" ref={headerRef}>
      <div className="header-heading">
        <div className="header-breadcrumb">
          <span className="breadcrumb-home">TOPLAND ENGINE</span>
          <ChevronRight size={13} />
          <span className="breadcrumb-current">
            {currentPage.title}
          </span>
        </div>

        <h1>{currentPage.title}</h1>
        <p className="header-page-description">
          {currentPage.description}
        </p>
      </div>

      <div className="header-actions">
        <label className="header-search">
          <Search size={17} className="header-search-icon" />

          <input
            ref={searchRef}
            type="search"
            placeholder="Search projects..."
            aria-label="Search projects"
            value={search}
            onChange={handleSearchChange}
          />

          {search ? (
            <button
              type="button"
              className="header-search-clear"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          ) : (
            <span className="header-shortcut">
              <Command size={11} />
              <span>K</span>
            </span>
          )}
        </label>

        <div className="header-dropdown-anchor">
          <button
            type="button"
            className={`header-icon-button ${
              notificationsOpen ? "is-active" : ""
            }`}
            onClick={toggleNotifications}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            aria-haspopup="dialog"
            title="Notifications"
          >
            <Bell size={19} />
          </button>

          {notificationsOpen && (
            <section
              className="header-dropdown notification-dropdown"
              role="dialog"
              aria-label="Notifications"
            >
              <div className="dropdown-heading">
                <div>
                  <h3>Notifications</h3>
                  <p>Updates from your workspace</p>
                </div>

                <button
                  type="button"
                  className="dropdown-quiet-button"
                  onClick={() => setNotificationsRead(true)}
                  title="Mark all as read"
                  aria-label="Mark all notifications as read"
                >
                  <CheckCheck size={17} />
                </button>
              </div>

              <div className="notification-empty">
                <span className="notification-empty-icon">
                  <Bell size={22} />
                </span>
                <strong>
                  {notificationsRead
                    ? "All caught up"
                    : "No notifications yet"}
                </strong>
                <p>
                  Project updates and pending approvals will
                  appear here when notifications are connected.
                </p>
              </div>

              <div className="dropdown-footer">
                <span>TOPLAND ENGINE ERP</span>
                <span>Workspace updates</span>
              </div>
            </section>
          )}
        </div>

        <div className="header-profile-anchor">
          <button
            type="button"
            className={`header-profile-button ${
              profileOpen ? "is-active" : ""
            }`}
            onClick={toggleProfile}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            aria-label="Open user profile menu"
          >
            <span className="header-avatar">
              {initials || "A"}
            </span>

            <span className="header-user-info">
              <strong>{displayName}</strong>
              <span>{role}</span>
            </span>

            <ChevronDown
              size={16}
              className={`header-chevron ${
                profileOpen ? "is-rotated" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div
              className="header-dropdown profile-dropdown"
              role="menu"
              aria-label="User profile"
            >
              <div className="profile-dropdown-heading">
                <span className="header-avatar profile-large-avatar">
                  {initials || "A"}
                </span>
                <div>
                  <strong>{displayName}</strong>
                  <span>{role}</span>
                </div>
              </div>

              <div className="profile-menu-divider" />

              <div className="profile-account-label">
                ACCOUNT
              </div>

              <div className="profile-menu-item profile-menu-static">
                <UserRound size={16} />
                <span>Signed in as {role}</span>
              </div>

              <div className="profile-menu-item profile-menu-static">
                <Settings size={16} />
                <span>Topland Engine workspace</span>
              </div>

              <div className="profile-menu-divider" />

              <button
                type="button"
                className="profile-menu-item profile-logout"
                role="menuitem"
                onClick={() => {
                  setProfileOpen(false);
                  onLogout?.();
                }}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
