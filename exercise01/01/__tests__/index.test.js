const { execFile } = require("child_process");
const path = require("path");

test('index.js should output "hello world"', (done) => {
  // Execute index.js using execFile
  execFile(
    "node",
    [path.join(__dirname, "../index.js")],
    (error, stdout, stderr) => {
      if (error) {
        done(error);
        return;
      }

      // Trim the stdout to avoid issues with extra spaces or newlines
      const actualOutput = stdout.trim();

      // Check if the output matches "hello world"
      expect(actualOutput).toBe("hello world");
      done();
    },
  );
});
