
const addContact = require("../services/contactService.js");
const listContacts = require("../services/contactService.js");
const searchContacts = require("../services/contactService.js");
const deleteContact = require("../services/contactService.js");

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

function handleCommand(command, args) {
  switch (command[0]) {
    case "add":
      if (command.length < 3) {
        console.log(
          "✗ Error: Missing arguments for add command\nUsage: node contacts.js add <name> <email> <phone>"
        );
        break;
      }
      const [op, name, email, phone] = command;
      addContact(name, email, phone);
      break;

    case "list":
      listContacts();
      break;

    case "search":
      if (command.length < 1) {
        console.log("Usage: search <query>");
        break;
      }
      searchContacts(command.slice(1).join(" "));
      break;

    case "delete":
      if (command.length < 1) {
        console.log("Usage: delete <name>");
        break;
      }
      deleteContact(command.slice(1).join(" "));
      break;

    case "help":
      printHelp();
      break;

    default:
      console.log(`Unknown command: "${command}"`);
      printHelp();
      break;
  }
}


module.exports = {printHelp,handleCommand}