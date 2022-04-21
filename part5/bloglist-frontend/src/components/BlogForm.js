import { useDispatch } from 'react-redux'
import { createNewBlog, initializeBlogs } from '../reducers/blogsReducer'
import { setTheNotifications } from '../reducers/notificationReducer'
import { allUsers } from '../reducers/userReducer'

const BlogForm = () => {

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    const author = event.target.author.value
    event.target.author.value = ''

    const title = event.target.title.value
    event.target.title.value = ''

    const url = event.target.url.value
    event.target.url.value = ''

    await dispatch(createNewBlog( author, title, url ))
    await dispatch(initializeBlogs())
    await dispatch(allUsers())
    const message = `new blog has been added! ${author}, ${title}`
    await dispatch(setTheNotifications(message, 5))
  }

  return (
    <form onSubmit={addBlog}>
      <input
        name='title'
        id="title"
        placeholder="title"
      />
      <br />
      <input
        name='author'
        id="author"
        placeholder="author"
      />
      <br />
      <input
        name='url'
        id="url"
        placeholder="url"
      />
      <br />
      <button id="save-button" type="submit">
        save
      </button>
    </form>
  )
}

export default BlogForm
