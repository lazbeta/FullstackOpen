import react from "react";

const Person = ({person, handleDelete}) => {
    return (
        <div key={person.name}>
        <p>
        {person.name} {person.number}
        <button onClick={handleDelete}>delete</button>
        </p>
      </div>
    )
}

export default Person;