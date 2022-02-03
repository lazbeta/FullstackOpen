import React from "react"

const Filter = ({handleQuery, title}) => {
    return (
    <div>
      <h2>{title}</h2>
       <input placeholder="Search" type="text" onChange={handleQuery}/>
    </div>
    )
  }

  export default Filter