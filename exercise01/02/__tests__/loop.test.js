const { spawnSync } = require("child_process");
const path = require("path");

function runLoopWithArgs(args) {
  const scriptPath = path.join(__dirname, "../loop.js");
  const result = spawnSync("node", [scriptPath, ...args], { encoding: "utf8" });

  const output = result.stdout.trim();
  const errorOutput = result.stderr.trim();

  return { output, errorOutput };
}

describe("loop.js CLI", () => {
  test("should print an error when no arguments are provided", () => {
    const { output } = runLoopWithArgs([]);
    expect(output).toBe(
      "Error: Please provide exactly one number as a command-line argument.",
    );
  });

  test("should print an error when more than one argument is provided", () => {
    const { output } = runLoopWithArgs(["1", "2"]);
    expect(output).toBe(
      "Error: Please provide exactly one number as a command-line argument.",
    );
  });

  test("should print an error when the argument is not a valid number", () => {
    const { output } = runLoopWithArgs(["abc"]);
    expect(output).toBe("Error: The provided argument must be a valid number.");
  });

  test("should print the sequence from 0 to the provided positive number", () => {
    const { output } = runLoopWithArgs(["5"]);
    expect(output).toBe("0, 1, 2, 3, 4, 5");
  });

  test("should print the sequence from 0 to the provided negative number", () => {
    const { output } = runLoopWithArgs(["-3"]);
    expect(output).toBe("0, -1, -2, -3");
  });
});
