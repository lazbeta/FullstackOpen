/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//services
import blogService from './services/blogs'
import loginService from './services/login'
//reducer
import { initializeBlogs } from './reducers/blogsReducer'
import { setTheNotifications } from './reducers/notificationReducer'
//components
import Blogs from './components/Blogs'
import Users from './components/Users'
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

  return (
    <>

      <Notification />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            <p>{user.name} is logged-in</p>
            <button onClick={logout} type="submit">
            logout
            </button>

            <Router>
              <div>
                <Link to="/blogs">blogs</Link>
                <Link to="/users">users</Link>
              </div>

              <Routes>
                <Route path="/blogs" element={<Blogs blogForm={blogForm}/>} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </Router>
          </div>
          <div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
