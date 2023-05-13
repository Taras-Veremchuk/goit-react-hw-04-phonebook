import React, { useState, useEffect } from 'react';
import { ContactForm, ContactList, Filter } from 'Сomponents/index';
import { PhonTitle, ContTitle, Container } from './Сomponents/PhoneBook.styled';

const LS_KEY = 'phoneBook';
export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(LS_KEY)) ?? []
  );

  const deleteContact = id => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id);
    });
  };
  const addContact = contact => {
    setContacts(prevState => {
      return [...prevState, contact];
    });
  };
  const changeFilter = event => {
    setFilter({ filter: event.target.value });
    this.filterContactList();
  };

  const filterContactList = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <PhonTitle>Phonebook</PhonTitle>
      <ContactForm addContact={addContact} contacts={contacts} />
      {contacts.length > 0 ? (
        <>
          <ContTitle>Contacts</ContTitle>
          <Filter filter={filter} onFilterChange={changeFilter} />
          <ContactList
            visibleContacts={filterContactList()}
            deleteContact={deleteContact}
          />
        </>
      ) : (
        <p message="No feedback given">No contacts added</p>
      )}
    </Container>
  );
}
