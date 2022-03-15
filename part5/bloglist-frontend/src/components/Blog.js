import { useState } from 'react'
import blogService from '../../src/services/blogs'
 
const Blog = ({blog}) => {

const [visibleBlogDetails, setVisibleBlogDetails] = useState(false)
const [likes, setLikes] = useState(blog.likes)

const updateLikesFunction = () => {
  let getBlog = {...blog}
  let updateBlog = {...getBlog, likes: likes}
  
  blogService
    .updateLikes(getBlog.id, updateBlog)
    .then(updateBlog => 
      setLikes(likes + 1)
    )
}
  const hideWhenVisible = { display: visibleBlogDetails ? 'none' : '' }
  const showWhenVisible = { display: visibleBlogDetails ? '' : 'none' }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = () => {
    window.confirm(`Do you want to delete ${blog.author}`)
    &&
    blogService
    .deleteBlog(blog.id)
  }
  return (
    <div style={blogStyle}>
    <div>
    {blog.title} {blog.author}

        <div style={hideWhenVisible}>
        <button onClick={() => setVisibleBlogDetails(true)}>show details</button>
        </div>
   </div> 
   <div style={showWhenVisible}>
   blog url: {blog.url}
    <br/>
    likes:{likes}
    <button onClick={updateLikesFunction}>like</button>
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