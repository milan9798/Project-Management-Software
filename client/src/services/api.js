
// ye  correct hai real hai usko trial ke liye kr rha hu mai abhi smjh gya na bhai 


// const API_BASE_URL = (
//   import.meta.env.VITE_API_URL ||
//   "https://project-management-software-p7lh.onrender.com/api"
// ).replace(/\/+$/, "");

// const api = {
//   async login(email, password) {
//     const response = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: email.trim().toLowerCase(),
//         password,
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Login failed.");
//     }

//     return data;
//   },
// };

// export default api;










// ye bilkul hai code hai smjh gye na brother mai kya khe rha hu tumko bhai smjhao tum mere ko brother smjh gya na bhai mai kya khe rha hu tumko bhai smjhao tum mere ko bhai smjh gya na bhai mai kya khe rha hu tumko bhai btao tum mere ko bhai 

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "https://project-management-software-p7lh.onrender.com/api"
).replace(/\/+$/, "");

const api = {
  async login(email, password) {
    const startTime = performance.now();

    try {
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

      const responseTime = performance.now() - startTime;

      console.log(
        "[LOGIN] Server response:",
        responseTime.toFixed(2),
        "ms"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      return data;
    } catch (error) {
      console.error("[LOGIN] API Error:", error);
      throw error;
    }
  },
};

export default api;
 
















