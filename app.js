const readline = require("readline");
const { printHelp, handleCommand } = require("./commands/commandHandler.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

console.log("=== AutoComplete Trie Console ===");
printHelp();

rl.prompt();

rl.on("line", (line) => {
  const input = line.trim();
  if (input === "exit") {
    rl.close();
    return;
  }

  try {
    handleCommand(input.split(" "));
  } catch (err) {
    console.error("✗ Error:", err.message);
  }
  rl.prompt();
});

rl.on("close", () => {
  console.log("Goodbye!");
  process.exit(0);
});
