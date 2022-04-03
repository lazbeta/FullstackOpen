 //import { useDispatch } from 'react-redux'
 import { connect } from 'react-redux'
 import { createNewAnecdote } from '../reducers/anecdoteReducer'
 import { setTheNotifications } from '../reducers/notificationReducer'

 const NewAnecdote = (props) => {
   // const dispatch = useDispatch()
    const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createNewAnecdote(content)
    props.setTheNotifications({message: `you created a new anecodte! ${content}.`},2)
  }
    
    return (
        <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input
         placeholder="add new anecdote"
         name="anecdote"
          /></div>
        <button type="submit">create</button>
      </form>
      </div>
    )
 }

const mapDispatchToProps = dispatch => {
  return {
    createNewAnecdote: value => {
      dispatch(createNewAnecdote(value))
    },
     setTheNotifications: message => {
      dispatch(setTheNotifications(message))
    },
  }
}


export default connect(
  null,
  mapDispatchToProps
)(NewAnecdote)
