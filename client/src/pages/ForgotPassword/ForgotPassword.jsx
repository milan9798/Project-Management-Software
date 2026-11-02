


import { useState } from "react";
import "./ForgotPassword.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "https://project-management-software-p7lh.onrender.com/api"
).replace(/\/+$/, "");

function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to process your request."
        );
      }

      setMessage(
        data.message ||
          "If your email is registered, password reset instructions will be sent."
      );
    } catch (err) {
      console.error("Forgot password error:", err);

      setError(
        err.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="forgot-page">
      <section className="forgot-card">
        <div className="forgot-logo">T</div>

        <p className="forgot-company">
          TOPLAND ENGINE PVT. LTD.
        </p>

        <h1>Forgot Password?</h1>

        <p className="forgot-description">
          Enter your registered work email address to receive
          instructions to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="forgot-email">
            Work email
          </label>

          <input
            id="forgot-email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage("");
              setError("");
            }}
            autoComplete="email"
            required
          />

          {message && (
            <p className="forgot-success" role="status">
              {message}
            </p>
          )}

          {error && (
            <p className="forgot-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <button
          type="button"
          className="forgot-back"
          onClick={onBackToLogin}
        >
          ← Back to Login
        </button>
      </section>
    </main>
  );
}

export default ForgotPassword;
