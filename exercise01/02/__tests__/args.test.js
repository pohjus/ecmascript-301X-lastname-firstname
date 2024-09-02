const path = require("path");

// Helper function to mock process.argv and require the script
function mockProcessArgvAndRequire(args) {
  // Save the original process.argv
  const originalArgv = process.argv;

  // Mock process.argv with the provided arguments
  process.argv = ["node", "script.js", ...args];

  // Clear the require cache to ensure the script is re-executed each time
  jest.resetModules();

  // Require the module (this will execute the code)
  require(path.join(__dirname, "../args.js"));

  // Restore the original process.argv
  process.argv = originalArgv;
}

test("should print error message when no arguments are provided", () => {
  // Spy on console.log to capture the output
  const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

  // Mock process.argv with no additional arguments
  mockProcessArgvAndRequire([]);

  // Check if the error message was logged
  expect(consoleSpy).toHaveBeenCalledWith(
    "Error: No command-line arguments provided. Please provide at least one argument to proceed.",
  );

  // Restore the original console.log
  consoleSpy.mockRestore();
});

test("should print the first argument when one argument is provided", () => {
  // Spy on console.log to capture the output
  const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

  // Mock process.argv with one argument
  mockProcessArgvAndRequire(["firstArgument"]);

  // Check if the first argument was logged
  expect(consoleSpy).toHaveBeenCalledWith("firstArgument");

  // Restore the original console.log
  consoleSpy.mockRestore();
});

test("should print the first argument and trim it when it has leading and trailing spaces", () => {
  // Spy on console.log to capture the output
  const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

  // Mock process.argv with one argument that has leading and trailing spaces
  mockProcessArgvAndRequire(["  firstArgument  "]);

  // Check if the trimmed first argument was logged
  expect(consoleSpy).toHaveBeenCalledWith("firstArgument");

  // Restore the original console.log
  consoleSpy.mockRestore();
});
