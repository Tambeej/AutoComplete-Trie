// V addContact
// V listContacts
// V searchContacts
// V deleteContact

const {
  isValidEmail,
  isValidPhone,
  isEmailInList,
} = require("../utils/validation.js");

const { loadContacts, saveContacts } = require("../utils/fileUtils.js");

const fs = require("fs");
const path = require("node:path");
const { fileURLToPath } = require("node:url");

const CONTACTS_FILE = path.join(__dirname, "..", "contacts.json");
console.log(CONTACTS_FILE);

function readContacts() {
  return JSON.parse(fs.readFileSync(CONTACTS_FILE, "utf8"));
}

const contacts = loadContacts(CONTACTS_FILE);

function addContact(name, email, phone) {
  if (!isValidEmail(email)) {
    console.log("isValidEmail" + email);
    console.log("isValidEmail" + email);
    console.log(`✗ Email must contain @ symbol`);
    return `✗ Email must contain @ symbol`;
  }

  if (isEmailInList(contacts, email)) {
    console.log(`✗ Email must be unique`);
    return `✗ Email must be unique`;
  }

  // Validate phone (only numbers and dashes)
  if (!isValidPhone(phone)) {
    console.log(
      `✗ Invalid phone number: "${phone}". Only digits and "-" allowed.`
    );
    return `✗ Invalid phone number: "${phone}". Only digits and "-" allowed.`;
  }

  contacts.push({ name, email, phone });
  console.log(`✓ Contact added: ${name}`);
  saveContacts(CONTACTS_FILE, contacts);
  // console.log("user added");
  return "user added";
}

// List all contacts
function listContacts() {
  if (contacts.length === 0) {
    console.log("✗ No contacts found.");
    return "✗ No contacts found.";
  }

  console.log("=== All Contacts ===");
  const formatted = contacts.map((contact, index) => {
    const line = `${index + 1}. ${contact.name} - ${contact.email} - ${
      contact.phone
    }`;
    console.log(line);
    return line;
  });
  return formatted;
}

// Search contacts
function searchContacts(query) {
  console.log(query);
  const results = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase()) ||
      contact.email.toLowerCase().includes(query.toLowerCase()) ||
      contact.phone.includes(query)
  );
  console.log(`=== Search Results for "${query}" ===`);

  if (results.length === 0) {
    console.log(`No contacts found matching "${query}".`);
    //     return [];
    //   }

    //   results.forEach((contact) => {
    //     console.log(`${contact.name} - ${contact.email} - ${contact.phone}`);
    //     return `${contact.name} - ${contact.email} - ${contact.phone}`;
    //   });
    // }
  } else {
    results.forEach((contact) => {
      console.log(`${contact.name} - ${contact.email} - ${contact.phone}`);
    });
  }

  return results; // return the results
}

// Delete contact by name
function deleteContact(email) {
  const updated = contacts.filter((contact) => contact.email !== email);

  if (updated.length === contacts.length) {
    console.log(`✗ Error: No contact found with email: ${email}.`);
    return;
  }
  console.log(`Contact "${email}" deleted.`);

  saveContacts(CONTACTS_FILE, updated);
}

module.exports = {
  addContact,
  listContacts,
  searchContacts,
  deleteContact,
  readContacts,
};
