import React from 'react'
import { useState } from 'react'
import blogService from '../../src/services/blogs'

const Blog = ({ update, blog, updateLikes }) => {

  const [visibleBlogDetails, setVisibleBlogDetails] = useState(false)


  const hideWhenVisible = { display: visibleBlogDetails ? 'none' : '' }
  const showWhenVisible = { display: visibleBlogDetails ? '' : 'none' }

  const addLikes = () => {
    updateLikes({
      ...blog,
      likes: blog.likes + 1
    })
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = () => {
    window.confirm(`Do you want to delete ${blog.title} by ${blog.author}`)
    &&
    blogService
      .deleteBlog(blog.id)
      .then( () => {
        update()
      })
  }

  return (

    <div className='blogs' style={blogStyle}>
      <div className='blog'>
        {blog.title}, {blog.author}
        <div style={hideWhenVisible}>
          <button onClick={() => setVisibleBlogDetails(true)} className='showDetails'>show details</button>
        </div>
      </div>

      <div style={showWhenVisible} className="showUrlAndLikes">
          blog url: {blog.url}
        <br/>
          likes: {blog.likes}
        <button className='like' onClick={addLikes}>like</button>
        <br/>
          user: {blog.user.name}
        <br/>
        <button onClick={handleDelete}>delete</button>
        <br/>
        <button onClick={() => setVisibleBlogDetails(false)}>hide details</button>
      </div>
    </div>
  )
}

export default Blog