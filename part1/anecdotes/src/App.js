import React, {useState} from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState (new Array (6).fill(0))

  const random = () => {
    console.log('click')
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const handleVote = () => {
  const copy = [...votes]
  copy[selected] += 1
  setVotes(copy)
  console.log(copy)
  }

  const maxVoteAnecdote = anecdotes[votes.indexOf(Math.max(...votes))]
  const maxVotes = Math.max(...votes)



  return (
    <div>
      <h2>Anecdote of the day</h2>
       <p>{anecdotes[selected]}</p>
      <button onClick={random}>View anecdote</button>
    
      <button onClick={handleVote}>vote</button>
      {votes[selected]}
    <h2>Anecdote with the most votes</h2>
    <p>{maxVoteAnecdote} has <b>{maxVotes} votes.</b></p> 







      </div>
  )
}
export default App
