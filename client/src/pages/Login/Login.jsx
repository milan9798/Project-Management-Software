
import { useState } from "react";
import "./Login.css";
import api from "../../services/api";

import toplandLogo from "../../assets/icon.png";


function BrandLogo() {
  return (
    <div className="brand-icon">
      <img
        src={toplandLogo}
        alt="Topland Engine Private Limited"
        className="login-brand-logo"
      />
    </div>
  );
}


function WorkflowIllustration() {
  return (
    <div className="showcase-visual">
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />

      <div className="visual-center">
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            d="M12 25L20 33L37 15"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="visual-node node-top">
        <span className="node-symbol">01</span>
        <span>
          <strong>Projects</strong>
          <small>Plan &amp; organize</small>
        </span>
      </div>

      <div className="visual-node node-right">
        <span className="node-symbol">02</span>
        <span>
          <strong>Design &amp; BOM</strong>
          <small>Manage materials</small>
        </span>
      </div>

      <div className="visual-node node-bottom">
        <span className="node-symbol">03</span>
        <span>
          <strong>Dispatch</strong>
          <small>Track deliveries</small>
        </span>
      </div>
    </div>
  );
}


function Login({ onLogin, onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [message, setMessage] = useState("");
 const [isLoading, setIsLoading] = useState(false);


const handleSubmit = async (event) => {
  event.preventDefault();
  setMessage("");

  if (!email.trim() || !password) {
    setMessage("Please enter your work email and password.");
    return;
  }

  try {
    setIsLoading(true);

    const data = await api.login(
      email.trim().toLowerCase(),
      password
    );

    if (data.user?.role !== "master_admin") {
      setMessage("This account is not authorized as Master Admin.");
      return;
    }

    onLogin(data, rememberMe);
  } catch (error) {
    setMessage(error.message || "Unable to login. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

const handleForgotPassword = () => {
  if (onForgotPassword) {
    onForgotPassword();
  }
};

  return (
    <main className="login-page">
      <div className="login-shell">
        <section className="login-showcase">
          <div className="showcase-decoration showcase-decoration-one" />
          <div className="showcase-decoration showcase-decoration-two" />

          <a className="brand" href="/" aria-label="Topland Engine home">
            <BrandLogo />

            <span className="brand-copy">
              <strong>TOPLAND ENGINE</strong>
              <small>PRIVATE LIMITED</small>
            </span>
          </a>

          <div className="showcase-content">
            <div className="showcase-tag">
              <span className="status-dot" />
              YOUR WORKSPACE, CONNECTED
            </div>

            <h1>
              Every project.
              <br />
              <span>One clear</span>
              <br />
              direction.
            </h1>

            <p className="showcase-description">
              Bring your projects, engineering designs, materials and
              dispatch operations together in one organized workspace.
            </p>

            <WorkflowIllustration />
          </div>

          <footer className="showcase-footer">
            <span className="footer-shield">✓</span>
            <span>One workspace. Better project visibility.</span>
          </footer>
        </section>



        <section className="login-panel">
          <div className="mobile-brand">
            <BrandLogo />
            <span>TOPLAND ENGINE</span>
          </div>

          <div className="login-form-wrapper">
            <header className="login-heading">
              <span className="welcome-label">WELCOME BACK</span>
              <h2>Sign in to your account</h2>
              <p>
                Enter your company credentials to access your workspace.
              </p>
            </header>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="work-email">Work email</label>

                <div className="input-wrapper">
                  <svg
                    className="input-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M4 7L12 13L20 7"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <input
                    id="work-email"
                    type="email"
                    autoComplete="username"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setMessage("");
                    }}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="work-password">Password</label>

                <div className="input-wrapper">
                  <svg
                    className="input-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="11"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M8 10V7a4 4 0 0 1 8 0v3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 14V17"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>

                  <input
                    id="work-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setMessage("");
                    }}
                    required
                  />

                  <button
                    className="password-toggle"
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M3 3L21 21"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10.6 10.7A2 2 0 0 0 13.3 13.4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9.9 5.2A10.7 10.7 0 0 1 12 5c5.3 0 8.5 5.5 9 7-.3.9-1.2 2.4-2.6 3.7M6.2 6.2C3.8 7.7 2.4 10.4 2 12c.5 1.5 3.7 7 10 7 1.3 0 2.5-.3 3.5-.8"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-option">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  <span className="custom-checkbox" />
                  Remember me
                </label>

                <button
                  className="forgot-password"
                  type="button"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              {message && (
                <div className="login-message" role="status" aria-live="polite">
                  <span className="message-icon">i</span>
                  <span>{message}</span>
                </div>
              )}

                
                         <button
                            className="sign-in-button"
                                 type="submit"
                           disabled={isLoading}
                          >
                  <span>{isLoading ? "Signing in..." : "Sign in to workspace"}</span>


                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12H19M12 5L19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            <div className="login-security">
              <span className="security-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 3L20 6V11C20 16 16.5 19.5 12 21C7.5 19.5 4 16 4 11V6L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span>
                <strong>Secure company access</strong>
                <small>Authorized users only</small>
              </span>
            </div>
          </div>

          <footer className="login-footer">
            <span>© {new Date().getFullYear()} Topland Engine Pvt. Ltd.</span>
            <span className="footer-separator">•</span>
            <span>Project Management System</span>
          </footer>
        </section>




      </div>
    </main>
  );
}


export default Login;
