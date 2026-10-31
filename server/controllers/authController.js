
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const db = require("../config/db");

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required.",
//       });
//     }

//     const [users] = await db.execute(
//       `SELECT id, name, email, password, role
//        FROM users
//        WHERE email = ?
//        LIMIT 1`,
//       [email.trim().toLowerCase()]
//     );

//     if (users.length === 0) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password.",
//       });
//     }

//     const user = users[0];

//     const passwordMatches = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!passwordMatches) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password.",
//       });
//     }

//     if (!process.env.JWT_SECRET) {
//       console.error("JWT_SECRET is missing in server .env");

//       return res.status(500).json({
//         success: false,
//         message: "Server authentication is not configured.",
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "8h" }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Login successful.",
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error.message);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong during login.",
//     });
//   }
// };

// module.exports = { login };















// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
// const db = require("../config/db");
// const nodemailer = require("nodemailer");

// // Existing login function
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required.",
//       });
//     }

//     const [users] = await db.execute(
//       `SELECT id, name, email, password, role
//        FROM users
//        WHERE email = ? AND is_active = 1
//        LIMIT 1`,
//       [email.trim().toLowerCase()]
//     );

      
//  console.log("LOGIN EMAIL:", email.trim().toLowerCase());
// console.log("USER FOUND:", users.length > 0);



//     if (users.length === 0) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password.",
//       });
//     }

//     const user = users[0];

//     const passwordMatches = await bcrypt.compare(
//       password,
//       user.password
//     );

//     console.log("PASSWORD MATCH:", passwordMatches);

//     console.log("LOGIN DEBUG: PASSWORD VERIFIED");


//     if (!passwordMatches) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password.",
//       });
//     }

//     if (!process.env.JWT_SECRET) {
//       return res.status(500).json({
//         success: false,
//         message: "Server authentication is not configured.",
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "8h" }
//     );


//     console.log("LOGIN DEBUG: JWT GENERATED");

// console.log("LOGIN DEBUG: SENDING SUCCESS RESPONSE");


//     return res.status(200).json({
//       success: true,
//       message: "Login successful.",
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error.message);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong during login.",
//     });
//   }
// };

// // Email configuration is read from server .env
// const createMailer = () => {
//   if (
//     !process.env.SMTP_HOST ||
//     !process.env.SMTP_PORT ||
//     !process.env.SMTP_USER ||
//     !process.env.SMTP_PASS
//   ) {
//     throw new Error("SMTP email settings are missing.");
//   }

//   return nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: Number(process.env.SMTP_PORT) === 465,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });
// };

// // Request a password-reset link
// const forgotPassword = async (req, res) => {
//   const genericMessage =
//     "If an active account matches that email, a reset link will be sent.";

//   try {
//     const email = String(req.body.email || "")
//       .trim()
//       .toLowerCase();

//     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter a valid email address.",
//       });
//     }

//     const [users] = await db.execute(
//       `SELECT id, email
//        FROM users
//        WHERE email = ? AND is_active = 1
//        LIMIT 1`,
//       [email]
//     );

//     // Do not reveal whether an email has an account.
//     if (users.length === 0) {
//       return res.status(200).json({
//         success: true,
//         message: genericMessage,
//       });
//     }

//     const user = users[0];

//     // Random token is emailed; only its SHA-256 hash is stored.
//     const rawToken = crypto.randomBytes(32).toString("hex");
//     const tokenHash = crypto
//       .createHash("sha256")
//       .update(rawToken)
//       .digest("hex");

//     const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

//     await db.execute(
//       `UPDATE password_reset_tokens
//        SET used_at = NOW()
//        WHERE user_id = ? AND used_at IS NULL`,
//       [user.id]
//     );

//     await db.execute(
//       `INSERT INTO password_reset_tokens
//        (user_id, token_hash, expires_at)
//        VALUES (?, ?, ?)`,
//       [user.id, tokenHash, expiresAt]
//     );

//     const baseUrl = process.env.CLIENT_URL;

//     if (!baseUrl) {
//       throw new Error("CLIENT_URL is missing in server .env");
//     }

//     const resetUrl =
//       `${baseUrl.replace(/\/$/, "")}/reset-password?token=${rawToken}`;

//     const mailer = createMailer();

//     await mailer.sendMail({
//       from: process.env.MAIL_FROM || process.env.SMTP_USER,
//       to: user.email,
//       subject: "Reset your Topland Engine password",
//       text:
//         `We received a password reset request for your account.\n\n` +
//         `Open this link within 15 minutes to choose a new password:\n` +
//         `${resetUrl}\n\n` +
//         `If you did not request this, you can ignore this email.`,
//     });

//     return res.status(200).json({
//       success: true,
//       message: genericMessage,
//     });
//   } catch (error) {
//     console.error("Forgot password error:", error.message);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to send the reset email right now.",
//     });
//   }
// };

// // Set a new password using a valid, unused token

// const resetPassword = async (req, res) => {
//   const connection = await db.getConnection();

//   try {
//     const token = String(req.body.token || "").trim();
//     const newPassword = String(req.body.password || "");

//     if (!/^[a-f0-9]{64}$/i.test(token)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired reset link.",
//       });
//     }

//     if (newPassword.length < 12 || newPassword.length > 72) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be between 12 and 72 characters.",
//       });
//     }

//     const tokenHash = crypto
//       .createHash("sha256")
//       .update(token)
//       .digest("hex");

//     await connection.beginTransaction();

//     const [tokens] = await connection.execute(
//       `SELECT id, user_id
//        FROM password_reset_tokens
//        WHERE token_hash = ?
//          AND used_at IS NULL
//          AND expires_at > NOW()
//        LIMIT 1
//        FOR UPDATE`,
//       [tokenHash]
//     );

//     if (tokens.length === 0) {
//       await connection.rollback();

//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired reset link.",
//       });
//     }

//     const resetRecord = tokens[0];
//     const passwordHash = await bcrypt.hash(newPassword, 12);

//     await connection.execute(
//       `UPDATE users
//        SET password = ?
//        WHERE id = ? AND is_active = 1`,
//       [passwordHash, resetRecord.user_id]
//     );

//     await connection.execute(
//       `UPDATE password_reset_tokens
//        SET used_at = NOW()
//        WHERE user_id = ? AND used_at IS NULL`,
//       [resetRecord.user_id]
//     );

//     await connection.commit();

//     return res.status(200).json({
//       success: true,
//       message: "Password reset successful. You can now log in.",
//     });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Reset password error:", error.message);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to reset password right now.",
//     });
//   } finally {
//     connection.release();
//   }
// };

// module.exports = {
//   login,
//   forgotPassword,
//   resetPassword,
// };










const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../config/db");

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [users] = await db.execute(
      `SELECT id, name, email, password, role
       FROM users
       WHERE email = ? AND is_active = 1
       LIMIT 1`,
      [normalizedEmail]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const user = users[0];

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Server authentication is not configured.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong during login.",
    });
  }
};

// Send email using Brevo HTTPS API
const sendBrevoEmail = async ({
  to,
  subject,
  textContent,
}) => {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.MAIL_FROM;

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is missing.");
  }

  if (!senderEmail) {
    throw new Error("MAIL_FROM is missing.");
  }

  const response = await fetch(
    "https://api.brevo.com/v3/smtp/email",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Topland Engine",
          email: senderEmail,
        },
        to: [{ email: to }],
        subject,
        textContent,
      }),
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      `Brevo API error (${response.status}): ${
        data.message || "Email could not be sent."
      }`
    );
  }

  return data;
};

// Request password-reset link
const forgotPassword = async (req, res) => {
  const genericMessage =
    "If an active account matches that email, a reset link will be sent.";

  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const [users] = await db.execute(
      `SELECT id, email
       FROM users
       WHERE email = ? AND is_active = 1
       LIMIT 1`,
      [email]
    );

    if (users.length === 0) {
      return res.status(200).json({
        success: true,
        message: genericMessage,
      });
    }

    const user = users[0];

    const rawToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await db.execute(
      `UPDATE password_reset_tokens
       SET used_at = NOW()
       WHERE user_id = ? AND used_at IS NULL`,
      [user.id]
    );

    await db.execute(
      `INSERT INTO password_reset_tokens
       (user_id, token_hash, expires_at)
       VALUES (?, ?, ?)`,
      [user.id, tokenHash, expiresAt]
    );

    const baseUrl = process.env.CLIENT_URL;

    if (!baseUrl) {
      throw new Error("CLIENT_URL is missing.");
    }

    const resetUrl =
      `${baseUrl.replace(/\/+$/, "")}/reset-password?token=${rawToken}`;

    const emailText =
      "We received a password reset request for your account.\n\n" +
      "Open this link within 15 minutes to choose a new password:\n" +
      `${resetUrl}\n\n` +
      "If you did not request this, you can ignore this email.";

    await sendBrevoEmail({
      to: user.email,
      subject: "Reset your Topland Engine password",
      textContent: emailText,
    });

    console.log("Password reset email sent successfully.");

    return res.status(200).json({
      success: true,
      message: genericMessage,
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to send the reset email right now.",
    });
  }
};

// Set new password using a valid reset token
const resetPassword = async (req, res) => {
  let connection;

  try {
    const token = String(req.body.token || "").trim();
    const newPassword = String(req.body.password || "");

    if (!/^[a-f0-9]{64}$/i.test(token)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link.",
      });
    }

    if (newPassword.length < 12 || newPassword.length > 72) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 12 and 72 characters.",
      });
    }

    connection = await db.getConnection();

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    await connection.beginTransaction();

    const [tokens] = await connection.execute(
      `SELECT id, user_id
       FROM password_reset_tokens
       WHERE token_hash = ?
         AND used_at IS NULL
         AND expires_at > NOW()
       LIMIT 1
       FOR UPDATE`,
      [tokenHash]
    );

    if (tokens.length === 0) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link.",
      });
    }

    const resetRecord = tokens[0];

    const passwordHash = await bcrypt.hash(newPassword, 12);

    const [updateResult] = await connection.execute(
      `UPDATE users
       SET password = ?
       WHERE id = ? AND is_active = 1`,
      [passwordHash, resetRecord.user_id]
    );

    if (updateResult.affectedRows !== 1) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "Unable to update this account password.",
      });
    }

    await connection.execute(
      `UPDATE password_reset_tokens
       SET used_at = NOW()
       WHERE user_id = ? AND used_at IS NULL`,
      [resetRecord.user_id]
    );

    await connection.commit();

    return res.status(200).json({
      success: true,
      message: "Password reset successful. You can now log in.",
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("Reset password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password right now.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
};
