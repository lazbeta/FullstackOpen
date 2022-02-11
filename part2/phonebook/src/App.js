import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState ('')
  const [query, settQuery] = useState('')
  const [showMessage, setShowMessage] = useState(null)


  useEffect(() => {
    personService
    .getAll ()
    .then(initialPersons=> {
      setPersons(initialPersons)
    })
  }, [])

  const addName = (e) => {
    e.preventDefault()
     const nameObject = {
              name: newName,
              number: newNumber,
              date: new Date().toISOString(),
  }


  
  const oldPerson = persons.find(p => p.name === newName)
  const updatePerson = {...oldPerson, number: newNumber }

  if (oldPerson) {
    window.confirm(  
    <div className="notification">
      {newName} is already added to the phonebook, replace the old number with a new one?
    </div>
    )
   &&
     personService
    .update(oldPerson.id, updatePerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== oldPerson.id ? person : updatePerson))
      console.log(returnedPerson)


      setShowMessage(
        <div className="notification" >
          {oldPerson.name} has been updated
          </div>
      )
      setTimeout(() => {
        setShowMessage(null)
      }, 5000)
    })
   } else {
    personService 
    .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))

        setShowMessage(
          <div className="notification">
            {newName} has been added to the phone book.
            </div>
        )
        setTimeout(() => {
          setShowMessage(null)
        }, 5000)
      })
  }
}




  const handleDeleteOf = (id) =>{
    const person = persons.find(p => p.id === id)
    window.confirm(`Delete ${person.name}?`)
    personService
    .deletePerson(id)
      .then(() => {
      setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        setShowMessage(
         <div className='error'>
           {person.name} was already deleted from server
           </div>
        )
        setTimeout(() => {
          setShowMessage(null)
        }, 5000)
      })
  }
  
  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleQuery = (e) => {
    settQuery(e.target.value)
  }
  //searchbar
  const getFilteredPersons = (query , persons) => {
    if (!query) {
      return persons
    }
    return persons.filter(person => person.name.toLowerCase().includes(query))
  }

  return (
    <div>
      <Notification message={showMessage}/>
      
    <Filter title="Search" handleQuery={handleQuery}/>
    <Form title="Phonebook" newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} addName={addName}/>
    <Phonebook 
    title="Numbers"
    persons={persons} 
    query={query} 
    handleQuery={handleQuery} 
    getFilteredPersons={getFilteredPersons}
    handleDeleteOf={handleDeleteOf}/>


    
          </div>
  )
}

export default App;