const { execFile } = require("child_process");
const fs = require("fs");
const path = require("path");

test('asciiart.js should output correct ASCII art for "Hello World!!"', (done) => {
  // Read the expected output from asciiartoutput.txt
  const expectedOutput = fs
    .readFileSync(path.join(__dirname, "asciiartoutput.txt"), "utf8")
    .trim();

  // Execute asciiart.js using execFile
  execFile(
    "node",
    [path.join(__dirname, "../asciiart.js")],
    (error, stdout, stderr) => {
      if (error) {
        done(error);
        return;
      }

      // Trim the stdout to avoid issues with extra spaces or newlines
      const actualOutput = stdout.trim();

      // Check if the output matches the expected output
      expect(actualOutput).toBe(expectedOutput);
      done();
    },
  );
});
