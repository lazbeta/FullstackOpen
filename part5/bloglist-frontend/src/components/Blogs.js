import React from 'react'
import { useSelector } from 'react-redux'
//component
import Blog from './Blog'

const Blogs = ({ blogForm }) => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h2>Blogs</h2>
      <h4>create new</h4>
      {blogForm()}
      {blogs
        .slice().sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
    </div>
  )
}

export default Blogs


