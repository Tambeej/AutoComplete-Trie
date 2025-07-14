// handleCommand
// printHelp

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
  switch (command) {
    case "add":
      if (args.length < 3) {
        console.log("Usage: add <name> <email> <phone>");
        break;
      }
      const [name, email, phone] = args;
      addContact(name, email, phone);
      break;

    case "list":
      listContacts();
      break;

    case "search":
      if (args.length < 1) {
        console.log("Usage: search <query>");
        break;
      }
      searchContacts(args.join(" "));
      break;

    case "delete":
      if (args.length < 1) {
        console.log("Usage: delete <name>");
        break;
      }
      deleteContact(args.join(" "));
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

module.exports = {
  handleCommand,
  printHelp
};
