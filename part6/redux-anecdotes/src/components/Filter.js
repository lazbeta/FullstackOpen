//import { useDispatch } from "react-redux"
import { connect } from "react-redux"
import { filterAnecdotes } from "../reducers/filterReducer"

const Filter = (props) => {
 //const dispatch = useDispatch()

  const handleChange = (event) => {
      event.preventDefault()
      const filter = event.target.value
      props.filterAnecdotes({filter})
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input
      name='filter'
      placeholder="search"
      onChange={handleChange}
     />
    </div>
  )
}

export default connect(
  null,
  { filterAnecdotes }
)(Filter)
