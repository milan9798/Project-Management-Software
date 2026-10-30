
// import { useState } from "react";
// import "./ForgotPassword.css";

// function ForgotPassword({ onBackToLogin }) {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     if (!email.trim()) {
//       setError("Please enter your email address.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/auth/forgot-password",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: email.trim(),
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Unable to process your request."
//         );
//       }

//       setMessage(
//         data.message ||
//           "If your email is registered, password reset instructions will be sent."
//       );
//     } catch (err) {
//       setError(
//         err.message ||
//           "Unable to connect to the server. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="forgot-page">
//       <section className="forgot-card">
//         <div className="forgot-logo">T</div>

//         <p className="forgot-company">
//           TOPLAND ENGINE PVT. LTD.
//         </p>

//         <h1>Forgot Password?</h1>

//         <p className="forgot-description">
//           Enter your registered email address and we will
//           help you reset your password.
//         </p>

//         <form onSubmit={handleSubmit}>
//           <label htmlFor="forgot-email">
//             Email Address
//           </label>

//           <input
//             id="forgot-email"
//             type="email"
//             placeholder="Enter your registered email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             autoComplete="email"
//             required
//           />

//           {message && (
//             <p className="forgot-success" role="status">
//               {message}
//             </p>
//           )}

//           {error && (
//             <p className="forgot-error" role="alert">
//               {error}
//             </p>
//           )}

//           <button type="submit" disabled={loading}>
//             {loading ? "Sending..." : "Send Reset Link"}
//           </button>
//         </form>

//         <button
//           type="button"
//           className="forgot-back"
//           onClick={onBackToLogin}
//         >
//           ← Back to Login
//         </button>
//       </section>
//     </main>
//   );
// }

// export default ForgotPassword;








import { useState } from "react";
import "./ForgotPassword.css";

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
        "http://localhost:5000/api/auth/forgot-password",
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
