/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//services
import blogService from './services/blogs'
import loginService from './services/login'
//reducer
import { initializeBlogs } from './reducers/blogsReducer'
import { setTheNotifications } from './reducers/notificationReducer'
import { allUsers } from './reducers/userReducer'
//components
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import User from './components/User'
import Users from './components/Users'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
//react router
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
//css
import './index.css'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  //useeffect for diplaying all blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //useEffect for loggining in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //useeffect for displaying users
  useEffect(() => {
    dispatch(allUsers())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogeappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setTheNotifications({ message:'wrong credentials' }, 5 ))
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Blogs</h2>
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

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm/>
      </Togglable>
    )
  }

  const logout = () => {
    localStorage.clear()
    window.location.href = '/'
  }


  const blogFormRef = useRef()

  const style = {
    padding: 10,
    backgroundColor: 'green'
  }

  return (
    <>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            <Router>
              <span style={style}>

                <Link style={style} to="/">home</Link>
                <Link style={style} to="/blogs">blogs</Link>
                <Link style={style} to="/users">users</Link>
                {user.name} is logged-in
                <button onClick={logout} type="submit">
                  logout
                </button>
              </span>
              <Notification />
              <Routes>
                <Route path="/blogs/:id" element={<Blog/>} />
                <Route path="/users/:id" element={<User/>} />
                <Route path="/" element={<Home />} />
                <Route path="/blogs" element={<Blogs blogForm={blogForm}/>} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </Router>
          </div>
        </div>
      )}
      <footer>
        <p>bloglist app 2022</p>
      </footer>
    </>
  )
}

export default App
