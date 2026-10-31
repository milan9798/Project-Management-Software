
// import { useState } from "react";
// import "./ResetPassword.css";

// function ResetPassword({ onBackToLogin }) {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setMessage("");
//     setError("");

//     if (password.length < 12 || password.length > 72) {
//       setError("Password must be between 12 and 72 characters.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     const token = new URLSearchParams(window.location.search).get("token");

//     if (!token) {
//       setError("Reset link is missing. Please request a new link.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(
//         "http://localhost:5000/api/auth/reset-password",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ token, password }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Unable to reset password.");
//       }

//       setMessage(
//         data.message || "Password reset successfully. You can now log in."
//       );
//       setPassword("");
//       setConfirmPassword("");
//     } catch (err) {
//       setError(err.message || "Unable to connect to the server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="reset-page">
//       <section className="reset-card">
//         <div className="reset-logo">T</div>
//         <p className="reset-company">TOPLAND ENGINE PVT. LTD.</p>

//         <h1>Set New Password</h1>
//         <p className="reset-description">
//           Create a new secure password for your company account.
//         </p>

//         <form onSubmit={handleSubmit}>
//           <label htmlFor="new-password">New password</label>
//           <input
//             id="new-password"
//             type="password"
//             autoComplete="new-password"
//             placeholder="At least 12 characters"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//             minLength={12}
//             maxLength={72}
//             required
//           />

//           <label htmlFor="confirm-password">Confirm password</label>
//           <input
//             id="confirm-password"
//             type="password"
//             autoComplete="new-password"
//             placeholder="Enter password again"
//             value={confirmPassword}
//             onChange={(event) => setConfirmPassword(event.target.value)}
//             minLength={12}
//             maxLength={72}
//             required
//           />

//           {message && (
//             <p className="reset-success" role="status">{message}</p>
//           )}

//           {error && (
//             <p className="reset-error" role="alert">{error}</p>
//           )}

//           {message ? (
//             <button type="button" onClick={onBackToLogin}>
//               Back to Login
//             </button>
//           ) : (
//             <button type="submit" disabled={loading}>
//               {loading ? "Updating..." : "Reset Password"}
//             </button>
//           )}
//         </form>

//         {!message && (
//           <button
//             className="reset-back"
//             type="button"
//             onClick={onBackToLogin}
//           >
//             ← Back to Login
//           </button>
//         )}
//       </section>
//     </main>
//   );
// }

// export default ResetPassword;







import { useState } from "react";
import "./ResetPassword.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "https://project-management-software-p7lh.onrender.com/api"
).replace(/\/+$/, "");

function ResetPassword({ onBackToLogin }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (password.length < 12 || password.length > 72) {
      setError("Password must be between 12 and 72 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      setError("Reset link is missing. Please request a new link.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to reset password.");
      }

      setMessage(
        data.message || "Password reset successfully. You can now log in."
      );
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="reset-page">
      <section className="reset-card">
        <div className="reset-logo">T</div>
        <p className="reset-company">TOPLAND ENGINE PVT. LTD.</p>

        <h1>Set New Password</h1>
        <p className="reset-description">
          Create a new secure password for your company account.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="new-password">New password</label>
          <input
            id="new-password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 12 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={12}
            maxLength={72}
            required
          />

          <label htmlFor="confirm-password">Confirm password</label>
          <input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter password again"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            minLength={12}
            maxLength={72}
            required
          />

          {message && (
            <p className="reset-success" role="status">{message}</p>
          )}

          {error && (
            <p className="reset-error" role="alert">{error}</p>
          )}

          {message ? (
            <button type="button" onClick={onBackToLogin}>
              Back to Login
            </button>
          ) : (
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Reset Password"}
            </button>
          )}
        </form>

        {!message && (
          <button
            className="reset-back"
            type="button"
            onClick={onBackToLogin}
          >
            ← Back to Login
          </button>
        )}
      </section>
    </main>
  );
}

export default ResetPassword;
