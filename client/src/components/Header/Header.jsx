
import { useEffect, useRef, useState } from "react";
  
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);


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
            setSearchOpen(false);
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
    setSearchOpen(false);
  }
}; 



    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);



  
  useEffect(() => {
  const controller = new AbortController();

  const loadProjects = async () => {
    try {
      setSearchLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/projects`,
        { signal: controller.signal }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Projects load nahi ho sake.");
      }

      setProjects(Array.isArray(result.data) ? result.data : []);
      setSearchError("");
    } catch (error) {
      if (error.name !== "AbortError") {
        setSearchError(error.message || "Search load nahi ho saki.");
      }
    } finally {
      if (!controller.signal.aborted) {
        setSearchLoading(false);
      }
    }
  };

  loadProjects();

  return () => controller.abort();
}, []);
   


  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };


    const searchResults = projects.filter((project) => {
  const query = search.trim().toLowerCase();

  if (!query) return false;

  const searchableValues = [
    project.projectName,
    project.projectCode,
    project.customerName,
    project.workOrderNumber,
    project.projectType,
    project.status,
    project.id,
  ];

  return searchableValues.some((value) =>
    String(value || "").toLowerCase().includes(query)
  );
}).slice(0, 6);

const openProjectResults = () => {
  setSearchOpen(false);
  setSearch("");
  navigate("/projects");
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


       <div className="header-search-anchor">

        <label className="header-search">
          <Search size={17} className="header-search-icon" />


          <input
            ref={searchRef}
            type="search"
            placeholder="Search projects..."
            aria-label="Search projects"
            value={search}
            onChange={(event) => {
              handleSearchChange(event);
              setSearchOpen(true);
                        }}
               onFocus={() => {
             if (search.trim()) setSearchOpen(true);
              }}
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


        {searchOpen && search.trim() && (
  <div className="header-search-results">

    <div className="header-search-results-heading">
      <span>SEARCH RESULTS</span>
      {searchLoading && <span>Loading...</span>}
    </div>

    {searchError ? (
      <div className="header-search-empty">
        {searchError}
      </div>
    ) : searchResults.length > 0 ? (
      searchResults.map((project) => (
        <button
          type="button"
          className="header-search-result"
          key={project.id || project.projectCode}
          onClick={openProjectResults}
        >
          <span className="header-search-result-icon">
            <FolderKanban size={17} />
          </span>

          <span className="header-search-result-info">
            <strong>
              {project.projectName || project.name || "Untitled Project"}
            </strong>

            <small>
              {project.projectCode || "No project code"}
              {" · "}
              {project.customerName || "No customer"}
            </small>
          </span>

          <ChevronRight size={16} />
        </button>
      ))
    ) : !searchLoading ? (
      <div className="header-search-empty">
        <Search size={19} />
        <strong>No results found</strong>
        <span>Try another project name, code or customer.</span>
      </div>
    ) : null}

    <div className="header-search-footer">
      Search across Topland Engine projects
    </div>

  </div>
)}




       </div>

         
        
        {searchOpen && search.trim() && (
  <div className="header-search-results">
    <div className="header-search-results-heading">
      <span>SEARCH RESULTS</span>
      {searchLoading && <span>Loading...</span>}
    </div>

    {searchError ? (
      <div className="header-search-empty">
        {searchError}
      </div>
    ) : searchResults.length > 0 ? (
      searchResults.map((project) => (
        <button
          type="button"
          className="header-search-result"
          key={project.id || project.projectCode}
          onClick={openProjectResults}
        >
          <span className="header-search-result-icon">
            <FolderKanban size={17} />
          </span>

          <span className="header-search-result-info">
            <strong>
              {project.projectName || project.name || "Untitled Project"}
            </strong>

            <small>
              {project.projectCode || "No project code"}
              {" · "}
              {project.customerName || "No customer"}
            </small>
          </span>

          <ChevronRight size={16} />
        </button>
      ))
    ) : !searchLoading ? (
      <div className="header-search-empty">
        <Search size={19} />
        <strong>No results found</strong>
        <span>Try another project name, code or customer.</span>
      </div>
    ) : null}

    <div className="header-search-footer">
      Search across Topland Engine projects
    </div>
  </div>
        )}




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
