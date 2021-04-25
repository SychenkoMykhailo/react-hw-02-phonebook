import React, { Component } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import ContactForm from "./ContactForm";
import FilterContact from "./FilterContact";
import ContactList from "./ContactList";
class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", tel: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", tel: "443-89-12" },
      { id: "id-3", name: "Eden Clements", tel: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", tel: "227-91-26" },
    ],
    filter: "",
  };
  addContact = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      if (
        prevState.contacts.some(
          (contact) => contact.name === e.target.name.value
        )
      ) {
        return alert("This contact name already exists");
      }
      return {
        contacts: [
          ...prevState.contacts,
          { name: e.target.name.value, tel: e.target.tel.value, id: uuidv4() },
        ],
      };
    });
  };
  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => {
          return id !== contactId;
        }),
      };
    });
  };
  filterContacts = (e) => {
    this.setState({ filter: e.target.value });
  };
  render() {
    const { contacts, filter } = this.state;
    return (
      <div className="maincontainer">
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <FilterContact filterContacts={this.filterContacts} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onRemoveContact={this.removeContact}
        />
      </div>
    );
  }
}

export default App;
