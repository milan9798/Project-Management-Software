
// const API_BASE_URL = "http://localhost:5000/api";

// const api = {
//   async login(email, password) {
//     const response = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Login failed.");
//     }

//     return data;
//   },
// };

// export default api;







// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const api = {
//   async login(email, password) {
//     const response = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Login failed.");
//     }

//     return data;
//   },
// };

// export default api;


















const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "https://project-management-software-p7lh.onrender.com/api"
).replace(/\/+$/, "");

const api = {
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed.");
    }

    return data;
  },
};

export default api;
