const fs = require("fs");
const path = require("path");

test("var-let-const.js should exist and not be empty", () => {
  // Define the path to the file
  const filePath = path.join(__dirname, "../var-let-const.js");

  // Check if the file exists
  const fileExists = fs.existsSync(filePath);
  expect(fileExists).toBe(true);

  // Check if the file is not empty
  if (fileExists) {
    const fileContent = fs.readFileSync(filePath, "utf8").trim();
    expect(fileContent.length).toBeGreaterThan(0);
  }
});
