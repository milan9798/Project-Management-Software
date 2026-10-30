
const readline = require("node:readline");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

const email = "topland.engine9798@gmail.com";

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function askHidden(question) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY) {
      reject(new Error("Please run this script in the VS Code terminal."));
      return;
    }

    process.stdout.write(question);
    process.stdin.setRawMode(true);
    process.stdin.resume();

    let password = "";

    function cleanup() {
      process.stdin.removeListener("data", onData);
      process.stdin.setRawMode(false);
      process.stdout.write("\n");
    }

    function onData(key) {
      const value = key.toString();

      if (value === "\u0003") {
        cleanup();
        reject(new Error("Password entry cancelled."));
        return;
      }

      if (value === "\r" || value === "\n") {
        cleanup();
        resolve(password);
        return;
      }

      if (value === "\u007f" || value === "\b") {
        password = password.slice(0, -1);
        return;
      }

      if (!/[\u0000-\u001f\u007f]/.test(value)) {
        password += value;
      }
    }

    process.stdin.on("data", onData);
  });
}

async function createMasterAdmin() {
  try {
    const [existingUsers] = await db.execute(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existingUsers.length > 0) {
      console.log("This email already exists. No changes made.");
      return;
    }

    const name =
      (await ask("Enter Master Admin name: ")) ||
      "Topland Master Admin";

    const password = await askHidden(
      "Create Master Admin password (input hidden): "
    );

    if (password.length < 12) {
      console.log("Password must be at least 12 characters.");
      return;
    }

    const confirmPassword = await askHidden(
      "Enter password again to confirm: "
    );

    if (password !== confirmPassword) {
      console.log("Passwords do not match. Please try again.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.execute(
      `INSERT INTO users (name, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, "master_admin"]
    );

    console.log("\nMaster Admin account created successfully!");
    console.log("Email:", email);
    console.log("Role: master_admin");
    console.log("Password saved as a secure hash.");
  } catch (error) {
    console.error("Account creation failed:", error.message);
  } finally {
    await db.end();
  }
}

createMasterAdmin();
