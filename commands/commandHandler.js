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
  return `
Commands:
  add <word>      - Add word to dictionary
  find <word>     - Check if word exists
  complete <prefix> - Get completions
  help           - Show this message
  exit           - Quit program
`;
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
      const added = trie.addWord(wordToAdd);
      if (added) {
        console.log(`✓ Added '${wordToAdd}' to dictionary`);
        return `✓ Added '${wordToAdd}' to dictionary`;
      }
      console.log(`✗ Word "${wordToAdd}" not added`);
      return `✗ Word "${wordToAdd}" not added`;
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
          ? `✓ '${wordToFind}' exists in dictionary`
          : `✗ '${wordToFind}' not found in dictionary`
      );
      return found
        ? `✓ '${wordToFind}' exists in dictionary`
        : `✗ '${wordToFind}' not found in dictionary`;

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
        console.log(`✗ No completions found for prefix "${prefix}"`);
        return `✗ No completions found for prefix "${prefix}"`;
      } else {
        console.log(`Suggestions for '${prefix}':${completions.join(", ")}`);
        return `Suggestions for '${prefix}':${completions.join(", ")}`;
      }
      break;

    case "help":
      return printHelp();
    case "exit":
      if (command.length > 1) {
        console.log(`✗ Error: Too many argument for exit command\nUsage: exit`);
        return `Too many argument for exit command`;
      }
      break;

    default:
      console.log(`✗ Unknown command: "${operation}"`);
      printHelp();
      return `Unknown command/`;
  }
}

module.exports = {
  handleCommand,
  printHelp,
};
