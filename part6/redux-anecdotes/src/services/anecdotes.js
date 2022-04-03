import axios from 'axios'
//import NewAnecdote from '../components/AnecdoteForm'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = {content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateLikes = async (id, anecdote) => {
//  const object = {content, votes: + 1 }
  const request = await axios.put(`${baseUrl}/${id}`, anecdote)
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, updateLikes }