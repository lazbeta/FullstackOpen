import React from 'react'
import { useState } from 'react'
import blogService from '../../src/services/blogs'

const Blog = ({ update, blog }) => {

  const [visibleBlogDetails, setVisibleBlogDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visibleBlogDetails ? 'none' : '' }
  const showWhenVisible = { display: visibleBlogDetails ? '' : 'none' }


  const updateLikesFunction = () => {
    let getBlog = { ...blog }
    let updateBlog = { ...getBlog, likes: likes }

    blogService
      .updateLikes(getBlog.id, updateBlog)
      .then( () =>
        setLikes(likes + 1)
      )
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

    <div style={blogStyle}>
      <div className='blog'>
        {blog.title}, {blog.author}
        <div style={hideWhenVisible}>
          <button onClick={() => setVisibleBlogDetails(true)} className='showDetails'>show details</button>
        </div>
      </div>

      <div style={showWhenVisible} className="showUrlAndLikes">
          blog url: {blog.url}
        <br/>
          likes: {likes}
        <button className='like' onClick={updateLikesFunction}>like</button>
        <br/>
        <br/>
        <button onClick={handleDelete}>delete</button>
        <br/>
        <button onClick={() => setVisibleBlogDetails(false)}>hide details</button>
      </div>
    </div>
  )
}

export default Blog