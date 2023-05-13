import React from 'react';
import { Form, Label, Input, Button } from './PhoneBook.styled';
import { useState } from 'react';
import shortid from 'shortid';

export default function ContactForm({ contacts, addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onSubmit = event => {
    event.preventDefault();

    const filteredName = contacts.filter(contact =>
      contact.name.includes(name)
    );
    if (filteredName.length > 0) {
      alert(`${filteredName[0].name} is already in contacts.`);
      reset();
      return;
    } else {
      const contact = {
        id: shortid.generate(),
        name: name,
        number: number,
      };
      addContact(contact);
      reset();
    }
  };
  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <Form onSubmit={onSubmit}>
      <Label>
        Name{' '}
        <Input
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        Number
        <Input
          value={number}
          onChange={handleChange}
          name="number"
          type="tel"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
}
