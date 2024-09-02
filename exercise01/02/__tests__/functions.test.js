const { spawnSync } = require("child_process");
const path = require("path");

function runFunctionScript(args) {
  const scriptPath = path.join(__dirname, "../functions.js");
  const result = spawnSync("node", [scriptPath, ...args], { encoding: "utf8" });

  const output = result.stdout.trim();
  const errorOutput = result.stderr.trim();

  return { output, errorOutput };
}

describe("functions.js CLI", () => {
  test("should return the sum of two numbers", () => {
    const { output } = runFunctionScript(["sum", "3", "4"]);
    expect(output).toBe("7");
  });

  test("should return an error when sum receives non-numeric inputs", () => {
    const { output } = runFunctionScript(["sum", "a", "4"]);
    expect(output).toBe("Error: Both arguments for sum must be numbers.");
  });

  test("should return a personalized greeting", () => {
    const { output } = runFunctionScript(["greet", "Alice"]);
    expect(output).toBe("hello Alice!");
  });

  test("should return the difference of two numbers", () => {
    const { output } = runFunctionScript(["extract", "10", "4"]);
    expect(output).toBe("6");
  });

  test("should return an error when extract receives non-numeric inputs", () => {
    const { output } = runFunctionScript(["extract", "10", "b"]);
    expect(output).toBe("Error: Both arguments for extract must be numbers.");
  });

  test("should return an error when no function name is provided", () => {
    const { output } = runFunctionScript([]);
    expect(output).toBe(
      "Error: Please provide a function name and the required arguments.\nUsage: node functions.js <function> <arg1> <arg2>",
    );
  });

  test("should return an error for an unknown function", () => {
    const { output } = runFunctionScript(["unknownFunction", "1", "2"]);
    expect(output).toBe(
      'Error: Unknown function. Please use "sum", "greet", or "extract".',
    );
  });
});
