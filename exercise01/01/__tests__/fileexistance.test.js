const fs = require("fs");
const path = require("path");

test("All specified files should exist and not be empty", () => {
  // Define the paths to the files
  const filesToCheck = [
    path.join(__dirname, "../answer1.txt"),
    path.join(__dirname, "../answer2.txt"),
    path.join(__dirname, "../.prettierrc"),
    path.join(__dirname, "../eslint.config.mjs"),
    path.join(__dirname, "../package-lock.json"),
    path.join(__dirname, "../package.json"),
  ];

  filesToCheck.forEach((filePath) => {
    // Check if the file exists
    expect(fs.existsSync(filePath)).toBe(true);

    // Check if the file is not empty
    const fileContent = fs.readFileSync(filePath, "utf8").trim();
    expect(fileContent.length).toBeGreaterThan(0);
  });
});
