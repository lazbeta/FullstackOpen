import React from 'react'
import { useSelector } from 'react-redux'
//import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
//component
//import Blog from './Blog'

const Blogs = ({ blogForm }) => {
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 20,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    fontSize: 16
  }

  return (
    <div>
      <h2>Blogs</h2>
      <h4>create new</h4>
      {blogForm()}
      <br/>
      <div>

        {blogs.map((blog) =>
          <div key={blog.id}  style={blogStyle}>
            <p><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></p>

          </div>
        )}

      </div>
    </div>
  )
}

export default Blogs


