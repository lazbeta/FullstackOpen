import { useDispatch, useSelector } from "react-redux"
import { votedAnecdote } from "../reducers/anecdoteReducer"
import { setTheNotifications } from "../reducers/notificationReducer"

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const filterAnecdotes = useSelector(state => {
      if (state.filter === '') {
        return anecdotes
      } 
      return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
    })

    const vote = anecdote => {
    dispatch(votedAnecdote(anecdote.id, {...anecdote, votes: anecdote.votes + 1}))
    dispatch(setTheNotifications({message: `you voted! ${anecdote.content}`}, 2))
  }

    const showAnecdotes = filterAnecdotes
    .slice().sort((a,b) => b.votes - a.votes)
    .map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
        )

    return (
        <div>
        {showAnecdotes}
        </div>
    )
}

export default Anecdotes