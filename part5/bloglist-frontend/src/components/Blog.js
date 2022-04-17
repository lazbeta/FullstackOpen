import React from 'react'
//import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteThisBlog, initializeBlogs, likedBlog } from '../reducers/blogsReducer'
import { setTheNotifications } from '../reducers/notificationReducer'
//import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Blog = () => {
  //const [visibleBlogDetails, setVisibleBlogDetails] = useState(false)

  //const hideWhenVisible = { display: visibleBlogDetails ? 'none' : '' }
  //const showWhenVisible = { display: visibleBlogDetails ? '' : 'none' }

  const dispatch = useDispatch()

  const { id } = useParams()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => id === b.id)

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
    </div>
  )
}

export default Blog
