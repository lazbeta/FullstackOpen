import React from "react"

const Phonebook = ({ title, query, persons, getFilteredPersons}) => {
    const filteredPersons = getFilteredPersons(query, persons)
  //displaying phonebook + filtered persons
    return (
      <div>
        <h2>{title}</h2>
      {filteredPersons.map(person => (
      <div key={person.name}>
        <p>{person.name} {person.number}</p>
      </div>
    ))}
    </div>
    )
  }

  export default Phonebook