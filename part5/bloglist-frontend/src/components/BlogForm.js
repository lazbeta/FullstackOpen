import { useDispatch } from 'react-redux'
import { createNewBlog, initializeBlogs } from '../reducers/blogsReducer'
import { setTheNotifications } from '../reducers/notificationReducer'
import { allUsers } from '../reducers/userReducer'
//css mui
import { TextField, Button } from '@mui/material'

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
    <form id="blogForm" onSubmit={addBlog}>
      <div>
        <TextField
          name='title'
          id="title"
          placeholder="title"
          sx={{
            padding: 1,
            minWidth: '30vw'
          }}
        />
      </div>
      <div>
        <TextField
          name='author'
          id="author"
          placeholder="author"
          sx={{
            padding: 1,
            minWidth: '30vw'
          }}
        />
      </div>
      <div>
        <TextField
          name='url'
          id="url"
          placeholder="url"
          sx={{
            padding: 1,
            minWidth: '30vw'
          }}
        />
      </div>
      <div className="login-button-div">
        <Button id="save-button" type="submit"
          size="large"
          sx={{
            background: '#0BB596',
            boxShadow: 2,
            borderRadius: 3,
            color: 'white',
            letterSpacing: '0.05em',
            '&:hover': {
              backgroundColor: '#A9A9A9',
              color: 'white',
            }
          }}>
            save
        </Button>
      </div>
    </form>
  )
}

export default BlogForm
