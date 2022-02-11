import React from "react"

const Phonebook = ({ title, query, persons, getFilteredPersons, handleDeleteOf}) => {
    const filteredPersons = getFilteredPersons(query, persons)

  //displaying phonebook + filtered persons
    return (
      <div>
        <h2>{title}</h2>
      {filteredPersons.map(person => (
      <div key={person.id}>
        <p>
        {person.name} {person.number} 
        <button onClick={() => handleDeleteOf(person.id)}>delete</button>
        </p>
      </div>
    ))}
    </div>
    )
  }

  export default Phonebook