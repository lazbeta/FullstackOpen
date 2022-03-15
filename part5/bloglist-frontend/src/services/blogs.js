import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = async (id, newObject) => {
    return await axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config, 'config working?')
  return await axios.delete(`${baseUrl}/${id}`, config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, updateLikes, deleteBlog }