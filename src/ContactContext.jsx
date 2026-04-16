import { createContext, useContext, useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

const ContactContext = createContext();

export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContacts() {
      try {
        const stored = await get('granny-contacts');
        if (stored) {
          setContacts(stored);
        }
      } catch (err) {
        console.error('Failed to load contacts', err);
      } finally {
        setLoading(false);
      }
    }
    loadContacts();
  }, []);

  const saveContacts = async (newContacts) => {
    setContacts(newContacts);
    try {
      await set('granny-contacts', newContacts);
    } catch (err) {
      console.error('Failed to save to IDB', err);
    }
  };

  const addContact = (contact) => {
    const fresh = [...contacts, { id: Date.now().toString(), ...contact }];
    saveContacts(fresh);
  };

  const updateContact = (id, updated) => {
    const fresh = contacts.map(c => c.id === id ? { ...c, ...updated } : c);
    saveContacts(fresh);
  };

  const deleteContact = (id) => {
    const fresh = contacts.filter(c => c.id !== id);
    saveContacts(fresh);
  };

  const addMultipleContacts = (newContactsArray) => {
    const fresh = [...contacts, ...newContactsArray.map(c => ({ id: Math.random().toString(), ...c }))];
    saveContacts(fresh);
  };

  return (
    <ContactContext.Provider value={{
      contacts, loading, addContact, updateContact, deleteContact, addMultipleContacts
    }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  return useContext(ContactContext);
}
