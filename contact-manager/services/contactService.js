// V addContact
// V listContacts
// V searchContacts
// V deleteContact
import {
  isValidEmail,
  isValidPhone,
  isEmailInList,
} from "../utils/validation.js";
import { loadContacts, saveContacts } from "../utils/fileUtils.js";

const fs = import("fs");
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
console.log("file name :" + __filename);
const __dirname = path.dirname(__filename);

const CONTACTS_FILE = path.join(__dirname, "..", "contacts.json");
console.log(CONTACTS_FILE);

const contacts = loadContacts(CONTACTS_FILE); //->I think this isnot right
// // Load contacts from file
// function loadContacts() {
//   ensureContactsFile();
//   try {
//     const data = fs.readFileSync(contactsFile, "utf8");
//     return JSON.parse(data);
//   } catch (err) {
//     console.error("Error reading contacts file:", err.message);
//     return [];
//   }
// }

// Save contacts to file
// function saveContacts(contacts) {
//   try {
//     fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
//   } catch (err) {
//     console.error("Error saving contacts:", err.message);
//   }
// }

// Ensure file exists; if not, create it with empty array
// function ensureContactsFile() {
//   if (!fs.existsSync(contactsFile)) {
//     fs.writeFileSync(contactsFile, "[]");
//   }
// }

// Add a new contact

export function addContact(name, email, phone) {
  if (!isValidEmail(email)) {
    console.log(email);
    console.log(`✗ Email must contain @ symbol`);
    return;
  }

  if (isEmailInList(contacts, email)) {
    console.log(`✗ A contact with email "${email}" already exists.`);
    return;
  }

  // Validate phone (only numbers and dashes)
  if (!isValidPhone(phone)) {
    console.log(
      `✗ Invalid phone number: "${phone}". Only digits and "-" allowed.`
    );
    return;
  }

  contacts.push({ name, email, phone });
  console.log(`✓ Contact added: ${name}`);
  saveContacts(CONTACTS_FILE, contacts);
}

//  addContact('john', 'john@mail.com', '3210545545');

// List all contacts
export function listContacts() {
  //const contacts = loadContacts();

  // console.log(`Loading contacts from contacts.json...`)

  if (contacts.length === 0) {
    console.log("✗ No contacts found.");
    return;
  }

  // console.log(`✓ Loaded ${contacts.length} contacts`)

  console.log("=== All Contacts ===");
  contacts.forEach((contact, index) => {
    console.log(
      `${index + 1}. ${contact.name} - ${contact.email} - ${contact.phone}`
    );
  });
}

// listContacts();

// Search contacts
export function searchContacts(query) {
  console.log(query);
  //const contacts = loadContacts();
  const results = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase()) ||
      contact.email.toLowerCase().includes(query.toLowerCase()) ||
      contact.phone.includes(query)
  );
  console.log(`=== Search Results for "${query}" ===`);

  if (results.length === 0) {
    console.log(`No contacts found matching "${query}".`);
    return;
  }

  results.forEach((contact) => {
    console.log(`${contact.name} - ${contact.email} - ${contact.phone}`);
  });
}

// searchContacts('john');

// Delete contact by name
export function deleteContact(email) {
  //const contacts = loadContacts();
  const updated = contacts.filter((contact) => contact.email !== email);

  if (updated.length === contacts.length) {
    console.log(`✗ Error: No contact found with email: ${email}.`);
    return;
  }
  console.log(`Contact "${email}" deleted.`);

  saveContacts(CONTACTS_FILE, updated);
}