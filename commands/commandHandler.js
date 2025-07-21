const trie = require("../services/autoCompleteTrie.js");

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

// Handle CLI-like command input

function handleCommand(command) {
  console.log(command[0]);
  switch (command[0]) {
    case "add":
      if (command.length < 2) {
        return `✗ Error: Missing arguments for add command\nUsage: node app.js add <word>`;
      }
      let [op, word] = command;
      return trie.addWord(word);

    case "find":
      if (command.length < 2) {
        return `✗ Error: Missing arguments for add command\nUsage: node app.js find <word>`;
      }
      [op, word] = command;
      return trie.findWord(word);
    case "complete":
      if (command.length < 2) {
        return `✗ Error: Missing arguments for add command\nUsage: node app.js complete <prefix>`;
      }
      [op, prefix] = command;
      return trie.predictWords(prefix);
    case "help":
      printHelp();
      break;
    default:
      console.log(`Unknown command: "${command}"`);
      printHelp();
      break;
  }
}

module.exports = {
  handleCommand,
  printHelp,
};
