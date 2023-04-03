const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8")
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.error(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) =>
      console.log(JSON.parse(data).find((item) => item.id === contactId))
    )
    .catch((err) => console.error(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data).filter((item) => item.id !== contactId);

      fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8")
        .then(() => listContacts())
        .catch((err) => console.error(err.message));
    })
    .catch((err) => console.error(err.message));
}

function addContact(name, email, phone) {
  const newContact = { id: nanoid(), name, email, phone };
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);
      contacts.push(newContact);

      fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8")
        .then(() => listContacts())
        .catch((err) => console.error(err.message));
    })
    .catch((err) => console.error(err.message));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
