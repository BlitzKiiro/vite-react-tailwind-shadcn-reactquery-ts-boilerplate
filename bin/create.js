#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

// Get directory information
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to update the name field in package.json
const updatePackageName = (folderPath, newName) => {
  const packageJsonPath = path.join(folderPath, "package.json");

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    packageJson.name = newName; // Update the name field

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      "utf8"
    );
    console.log(`📦 Updated "name" in package.json to "${newName}"`);
  } else {
    console.error("❌ package.json not found. Skipping name update.");
  }
};

// Cool ASCII art for the welcome message
const welcomeMessage = `
┌──────────────────────────────────────────────┐
│                                              │
    ⚛️ Welcome to the Vite React TSX Starter! 
│                                              │
└──────────────────────────────────────────────┘
`;

console.log(welcomeMessage);

// Add CLI separator for a clean look
const separator = () =>
  console.log("\n──────────────────────────────────────────────\n");

const newLine = () => console.log("\n");

// Function to simulate progress
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to get the folder name
const getFolderName = () => {
  return new Promise((resolve) => {
    if (process.argv[2]) {
      resolve(process.argv[2]);
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question(
        "📂 Please enter your project folder name: ",
        (folderName) => {
          rl.close();
          resolve(folderName);
        }
      );
    }
  });
};

// Main script logic
getFolderName().then(async (folderName) => {
  separator();

  console.log(`✨ Creating project directory: ${folderName}`);

  try {
    // Simulate a loading effect for cloning the repo
    process.stdout.write("⏳ Cloning repository");
    for (let i = 0; i < 3; i++) {
      process.stdout.write(".");
      await sleep(100);
    }
    execSync(
      `git clone https://github.com/BlitzKiiro/vite-react-tailwind-shadcn-reactquery-ts-boilerplate.git ${folderName}`
    );
    console.log("\n✔️ Repository cloned successfully!");

    const projectPath = path.join(process.cwd(), folderName);
    const binPath = path.join(process.cwd(), folderName, "bin");
    if (fs.existsSync(binPath)) {
      console.log("🧹 Cleaning up unnecessary files...");
      fs.rmSync(binPath, { recursive: true, force: true });
      console.log("✔️ Bin folder removed");
    }

    // Update package.json "name" field
    updatePackageName(projectPath, folderName);

    separator();

    console.log("🎉 Installation complete!");
    console.log(
      "\n🚀 Ready to launch your new project! Here are the next steps:"
    );
    console.log(`ℹ️ cd ${folderName}`);
    console.log("ℹ️ npm install");
    console.log("ℹ️ npm run dev");

    newLine();
    console.log("🔗 Happy coding! 🌟");
    newLine();
  } catch (error) {
    console.error(`\n❌ An error occurred: ${error.message}`);
  }
});
