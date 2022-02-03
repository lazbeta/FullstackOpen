import React from "react"

const Form = ({title, handleNewNumber, handleNewName, newName, newNumber, addName}) => {
    return (
    <form onSubmit={addName}>
      <h2>{title}</h2>
    <div>
      name: <input 
      value={newName}
      onChange={handleNewName}/>
      <br/>
      number:<input
      value={newNumber}
      onChange={handleNewNumber}/>
    </div>
    <div>
      <button type="submit"
      >add</button>
    </div>
  </form>)
  }

  export default Form