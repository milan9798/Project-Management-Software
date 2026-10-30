

import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import DesignBOM from "./pages/DesignBOM/DesignBOM";
import DispatchManagement from "./pages/DispatchManagement/DispatchManagement";


import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";

function getSavedAuth() {
  try {
    const saved =
      localStorage.getItem("topland_auth") ||
      sessionStorage.getItem("topland_auth");

    return saved ? JSON.parse(saved) : null;
  } catch {
    localStorage.removeItem("topland_auth");
    sessionStorage.removeItem("topland_auth");
    return null;
  }
}

/* Common layout for Design & BOM */

function DesignBOMLayout({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    const routes = {
      dashboard: "/dashboard",
      projects: "/projects",
      "design-bom": "/design-bom",
      dispatch: "/dispatch",
      "settings-users": "/settings-users",
    };

    navigate(routes[page] || "/dashboard");
  };


  return (
    <div className="topland-erp-layout">
      <Sidebar
        activePage="design-bom"
        onNavigate={handleNavigate}
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
      />


      <div className="topland-erp-main">
        <Header
          activePage="design-bom"
          user={user}
          onLogout={onLogout}
        />


        <main className="topland-dashboard-content">
          <DesignBOM />
        </main>
      </div>
    </div>
  );
}

function AppContent() {
  const [auth, setAuth] = useState(getSavedAuth);
  const [dispatchCollapsed, setDispatchCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (data, rememberMe) => {
    const authData = {
      token: data.token,
      user: data.user,
    };

    localStorage.removeItem("topland_auth");
    sessionStorage.removeItem("topland_auth");

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("topland_auth", JSON.stringify(authData));

    setAuth(authData);
    navigate("/dashboard", { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("topland_auth");
    sessionStorage.removeItem("topland_auth");

    setAuth(null);
    navigate("/", { replace: true });
  };

  const isAdmin =
    Boolean(auth?.token) &&
    auth?.user?.role === "master_admin";

  const protectedPaths = [
    "/dashboard",
    "/projects",
    "/design-bom",
    "/dispatch",
    "/settings-users",
  ];

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Landing
            onNavigateToLogin={() => navigate("/login")}
          />
        }
      />

      <Route
        path="/login"
        element={
          <Login
            onLogin={handleLogin}
            onForgotPassword={() => navigate("/forgot-password")}
          />
        }
      />

      <Route
        path="/forgot-password"
        element={
          <ForgotPassword
            onBackToLogin={() => navigate("/login")}
          />
        }
      />

      <Route
        path="/reset-password"
        element={
          <ResetPassword
            onBackToLogin={() => navigate("/login")}
          />
        }
      />


{protectedPaths.map((path) => (
  <Route
    key={path}
    path={path}
    element={
      isAdmin ? (
        path === "/design-bom" ? (
          <DesignBOMLayout
            user={auth.user}
            onLogout={handleLogout}
          />

        ) : path === "/dispatch" ? (

          <div className="topland-erp-layout">
            <Sidebar
              activePage="dispatch"
              onNavigate={(page) => {
                const routes = {
                  dashboard: "/dashboard",
                  projects: "/projects",
                  "design-bom": "/design-bom",
                  dispatch: "/dispatch",
                  "settings-users": "/settings-users",
                };

                navigate(routes[page] || "/dashboard");
              }}
              // collapsed={false}
              // onToggle={() => {}}


                collapsed={dispatchCollapsed}
                 onToggle={() =>
           setDispatchCollapsed((value) => !value)
             }

            />

            <div className="topland-erp-main">
              <Header
                activePage="dispatch"
                user={auth.user}
                onLogout={handleLogout}
              />

              <main className="topland-dashboard-content">
                <DispatchManagement />
              </main>
            </div>
          </div>

        ) : (
          
          <Dashboard
            user={auth.user}
            onLogout={handleLogout}
          />
        )
      ) : (
        <Navigate to="/login" replace />
      )
    }
  />
))}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );

  }
