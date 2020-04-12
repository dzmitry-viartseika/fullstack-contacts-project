import * as domains from './domain';

const axios = require('axios');

export default {
  getAllContacts() {
    const instWithCred = axios.create({
      baseURL: domains.CONTACTS,
    });
    return instWithCred.get('contacts');
  },
  addNewContact(form) {
    const instWithCred = axios.create({
      baseURL: domains.CONTACTS,
    });
    return instWithCred.post('newContact', { form });
  },
  deleteContact(id) {
    const instWithCred = axios.create({
      baseURL: domains.CONTACTS,
    });
    return instWithCred.delete(`contacts/${id}`);
  },
  changeMark(id, contact) {
    const instWithCred = axios.create({
      baseURL: domains.CONTACTS,
    });
    return instWithCred.put(`contacts/${id}`, { contact });
  },
};
