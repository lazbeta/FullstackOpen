import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState ('')
  const [query, settQuery] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response=> {
      setPersons(response.data)
    })
  })

  const addName = (e) => {
    e.preventDefault()

    //eliminating exisiting person input
    const existingPersons = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    if(existingPersons){
      return alert(`${newName} is already added to the phonebook`)
    }

    //eliminating exisiting number input
    const existingNumbers = persons.find(
      (person) => person.number === newNumber
    )
    if(existingNumbers){
      return alert(`${newNumber} is already added to thes phonebook`)
    }
  
    const nameObj = {
               name: newName,
                number: newNumber,
                id: persons.length+1,  
  }
   
  setPersons(persons.concat(nameObj))
  setNewName('')
  setNewNumber('')
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
      <Filter title="Search" handleQuery={handleQuery}/>
     <Form title="Phonebook" newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} addName={addName}/>
    <Phonebook title="Numbers" persons={persons} query={query} handleQuery={handleQuery} getFilteredPersons={getFilteredPersons}/>

          </div>
  )
}

export default App