import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteThisBlog, initializeBlogs, likedBlog } from '../reducers/blogsReducer'
import { setTheNotifications } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const [visibleBlogDetails, setVisibleBlogDetails] = useState(false)

  const hideWhenVisible = { display: visibleBlogDetails ? 'none' : '' }
  const showWhenVisible = { display: visibleBlogDetails ? '' : 'none' }

  const dispatch = useDispatch()

  const addLikes = () => {
    dispatch(likedBlog(blog.id, { ...blog, likes: blog.likes + 1 }))
  }

  const handleDelete = async () => {
    window.confirm(`Do you want to delete ${blog.title} by ${blog.author}`) &&
    await dispatch(deleteThisBlog(blog.id))
    const message = 'a blog has been deleted'
    await dispatch(setTheNotifications(message, 5))
    await dispatch(initializeBlogs())
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blogs" style={blogStyle}>
      <div className="blog">
        {blog.title}, {blog.author}
        <div style={hideWhenVisible}>
          <button
            onClick={() => setVisibleBlogDetails(true)}
            className="showDetails"
          >
            show details
          </button>
        </div>
      </div>

      <div style={showWhenVisible} className="showUrlAndLikes">
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
        <button onClick={() => setVisibleBlogDetails(false)}>
          hide details
        </button>
      </div>
    </div>
  )
}

export default Blog
