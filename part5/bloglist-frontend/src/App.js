/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showMessage, setShowMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogeappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      setShowMessage(<div className='error'>
            wrong credentials
      </div>
      )
      setTimeout(() => {
        setShowMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return(
      <div>
        <LoginForm
          username={username}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setShowMessage(
          <div className='notification'>
            {newBlog.title} has been added to the bloglist
          </div>
        )
        setTimeout(() => {
          setShowMessage(null)
        }, 5000)
      })
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
    )
  }

  const updateBlogsAfterDeletion = () => {
    blogService
      .getAll()
      .then(blogs => {
        let newBlogList = [...blogs]
        setBlogs(newBlogList)
        setShowMessage(
          <div className='notification'>
            blog has been deleted
          </div>
        )
        setTimeout(() => {
          setShowMessage(null)
        }, 5000)
      })
  }


  const handleLikes = blog => {
    const updatingLikes = { ...blog, likes: blog.likes }
    blogService.updateLikes(blog.id, updatingLikes)
      .then(() => blogService.getAll()).then(blogs => setBlogs(blogs))
  }

  const logout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  const blogFormRef = useRef()

  return (
    <>
      <h2>blogs</h2>
      <Notification message={showMessage}/>
      {
        user === null ?
          loginForm() :
          <div>
            <p>{user.name} is logged-in</p>
            <button onClick={logout} type="submit">logout</button>

            <h2>create new</h2>
            {blogForm()}
            <br/>
            <h2>blogs</h2>
            <div>
              {
                blogs
                  .sort((a, b) => b.likes - a.likes)
                  .map(blog => <Blog key={blog.id} blog={blog} updateLikes={handleLikes} update={updateBlogsAfterDeletion}/>)
              }
            </div>
          </div>
      }
    </>
  )
}

export default App