const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(({ id }) => id === contactId);
  return contactById;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContacts = { id: uuidv4(), ...body };
  contacts.push(newContacts);

  updateContacts(contacts);
  return newContacts;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndexToRemove = contacts.findIndex(({ id }) => id === contactId);

  if (contactIndexToRemove === -1) {
    throw createError(404, "Not found");
  }

  const deletedContact = contacts.splice(contactIndexToRemove, 1);

  updateContacts(contacts);
  return deletedContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactByIndex = contacts.findIndex(({ id }) => id === contactId);

  if (contactByIndex === -1) {
    throw createError(404, "Not found");
  }
  contacts[contactByIndex] = { id: contactId, ...body };

  updateContacts(contacts);

  return contacts[contactByIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
