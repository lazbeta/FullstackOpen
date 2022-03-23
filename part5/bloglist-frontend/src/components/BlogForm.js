import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')

  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <form onSubmit={addBlog}>
      <input
        id='title'
        placeholder='title'
        value={title}
        onChange={handleTitle}
      />
      <br/>
      <input
        id='author'
        placeholder='author'
        value={author}
        onChange={handleAuthor}
      />
      <br/>
      <input
        id='url'
        placeholder='url'
        value={url}
        onChange={handleUrl}
      />
      <br/>
      <button id="save-button" type="submit">save</button>
    </form>
  )
}

export default BlogForm