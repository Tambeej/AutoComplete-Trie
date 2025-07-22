const trie = require("../services/trieService.js");

// Print command help
function printHelp() {
  console.log(`
Commands:
  add <word>      - Add word to dictionary
  find <word>     - Check if word exists
  complete <prefix> - Get completions
  help           - Show this message
  exit           - Quit program
`);
}

function handleCommand(command) {
  const operation = command[0];

  switch (operation) {
    case "add":
      if (command.length < 2) {
        console.log(
          `✗ Error: Missing argument for add command\nUsage: add <word>`
        );
        return `✗ Error: Missing argument for add command\nUsage: add <word>`;
      }
      const wordToAdd = command[1];
      console.log(`✓ Word "${wordToAdd}" added successfully.`);
      return `✓ Word "${wordToAdd}" added successfully.`;
    case "find":
      if (command.length < 2) {
        console.log(
          `✗ Error: Missing argument for find command\nUsage: find <word>`
        );
        return `✗ Error: Missing argument for find command\nUsage: find <word>`;
      }
      const wordToFind = command[1];
      const found = trie.findWord(wordToFind);
      console.log(
        found
          ? `✓ Word "${wordToFind}" found.`
          : `✗ Word "${wordToFind}" not found.`
      );
      return found
        ? `✓ Word "${wordToFind}" found.`
        : `✗ Word "${wordToFind}" not found.`;

    case "complete":
      if (command.length < 2) {
        console.log(
          `✗ Error: Missing argument for complete command\nUsage: complete <prefix>`
        );
        return `✗ Error: Missing argument for complete command\nUsage: complete <prefix>`;
      }
      const prefix = command[1];
      const completions = trie.predictWords(prefix);
      if (completions.length === 0) {
        console.log(`✗ No completions found for prefix "${prefix}".`);
        return `✗ No completions found for prefix "${prefix}".`;
      } else {
        console.log(
          `✓ Completions for "${prefix}":\n${completions.join(", ")}`
        );
        return `✓ Completions for "${prefix}":\n${completions.join(", ")}`;
      }
      break;

    case "help":
      printHelp();
      break;

    case "exit":
      if (command.length > 1) {
        console.log(`✗ Error: Too many argument for exit command\nUsage: exit`);
      }
      break;

    default:
      console.log(`✗ Unknown command: "${operation}"`);
      printHelp();
  }
}

module.exports = {
  handleCommand,
  printHelp,
};
