import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteThisBlog, initializeBlogs, likedBlog, commentedBlog } from '../reducers/blogsReducer'
import { setTheNotifications } from '../reducers/notificationReducer'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = () => {

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const { id } = useParams()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => id === b.id)

  const addLikes = () => {
    dispatch(likedBlog(blog.id, { ...blog, likes: blog.likes + 1 }))
  }

  const handleDelete = async () => {
    window.confirm(`Do you want to delete ${blog.title} by ${blog.author}`)
    &&
    await dispatch(deleteThisBlog(blog.id))
    await navigate('/blogs')
    await dispatch(initializeBlogs())
    const message = 'a blog has been deleted'
    await dispatch(setTheNotifications(message, 5))
  }

  const addComments = async (event) => {
    event.preventDefault()
    const text = event.target.text.value
    event.target.text.value = ''

    await dispatch(commentedBlog(blog.id, text))
    await dispatch(initializeBlogs())
  }

  const comments1 =  Object.fromEntries(Object
    .entries(blog.comment)
    .map(([key, { text }]) => [key, text])
  )

  const comments = Object.values(comments1).map((item, index) => {
    return <li key={index}>{item}</li>
  })

  if(!blog) {
    return null
  }

  return (
    <div className="blogs">
      <div className="blog">
        <h3>{blog.title}, {blog.author}</h3>
      </div>

      <div>
        blog url: {blog.url}
        <br />
        likes: {blog.likes}
        <button className="like" onClick={() => addLikes()}>
          like
        </button>
        <br />
        user: {blog.user.name}
        <br />
        <button onClick={handleDelete}>delete</button>
        <br />
      </div>
      <div>
        <h3>Comments</h3>
        <form onSubmit={addComments}>
          <input
            name='text'
            placeholder='Comment here'/>
          <button id="save-button" type="submit">
           save
          </button>
        </form>
        {comments}
      </div>
    </div>
  )
}

export default Blog
