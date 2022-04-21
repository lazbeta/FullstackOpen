import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (author, title, url)  => {
  const config = {
    headers: { Authorization: token },
  }

  const newObject = { author, title, url, likes: 0 }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const postComments = async (id, text) => {
  const config = {
    headers: { Authorization: token },
  }
  const commentUrl = `${baseUrl}/${id}/comments`
  const newComment = { text }
  const response = await axios.post(commentUrl, newComment, config)
  return response.data
}

export default { getAll, create, setToken, updateLikes, deleteBlog, postComments }
