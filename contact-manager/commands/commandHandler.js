const {
  addContact,
  listContacts,
  searchContacts,
  deleteContact,
} = require("../services/contactService.js");

// Print command help
function printHelp() {
  console.log(`
Available Commands:
  add <name> <email> <phone>      Add a new contact
  list                            List all contacts
  search <query>                  Search contacts by name, email, or phone
  delete <name>                   Delete contact by name
  help                            Show this help message
`);
}

// Handle CLI-like command input

function handleCommand(command) {
  console.log(command[0]);
  switch (command[0]) {
    case "add":
      if (command.length < 3) {
        console.log(
          "✗ Error: Missing arguments for add command\nUsage: node contacts.js add <name> <email> <phone>"
        );
        return `✗ Error: Missing arguments for add command\nUsage: node contacts.js add <name> <email> <phone>`;
      }
      const [op, name, email, phone] = command;
      return addContact(name, email, phone);
    case "list":
      console.log(listContacts());
      return listContacts();
    case "search":
      if (command.length < 2) {
        console.log("Usage: search <query>");
        return `Usage: search <query>`;
      }
      return searchContacts(command.slice(1).join(" "));
    case "delete":
      if (command.length < 2) {
        console.log("Usage: delete <name>");
        return `Usage: delete <name>`;
      }
      deleteContact(command.slice(1).join(" "));
      return "user deleted";

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
