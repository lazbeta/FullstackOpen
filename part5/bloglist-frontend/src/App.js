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
import { Container, AppBar, Box, Toolbar, IconButton, Typography, Menu, Avatar, Button, Tooltip, MenuItem, Grid } from '@mui/material'
import { Menu as MenuIcon } from '@material-ui/icons'


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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
        <Grid item xs={3} >
          <LoginForm
            username={username}
            password={password}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handleSubmit={handleLogin}
          />
        </Grid>
      </Grid>

    )
  }

  const blogForm = () => (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
        <Grid item xs={3} >
          <Togglable ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </Grid>
      </Grid>
    </Container>
  )

  const logout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const blogFormRef = useRef()

  const style = {
    padding: 10
  }

  return (

    <Container maxWidth="xl">
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            <Router>
              <AppBar position="static">
                <Toolbar disableGutters>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                  >
                    BLOGLISTAPP
                  </Typography>
                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: 'block', md: 'none' },
                      }}
                    >

                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link to="/">home</Link>
                        </Typography>
                      </MenuItem>

                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link to="/blogs">blogs</Link>
                        </Typography>
                      </MenuItem>

                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link to="/users">users</Link>
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1 , display: { xs: 'flex', md: 'none' } }}
                  >
                    BLOGLISTAPP
                  </Typography>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      <Link to="/">home</Link>
                    </Button>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      <Link to="/blogs">blogs</Link>
                    </Button>

                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      <Link to="/users">users</Link>
                    </Button>
                  </Box>


                  <Box m={1} sx={{ flexGrow: 0 }}>
                    <Button color="inherit" variant="outlined" onClick={logout} type="submit">
                       logout
                    </Button>
                  </Box>

                </Toolbar>
              </AppBar>

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
    </Container>
  )
}

export default App

/*
                  <Button color="inherit">
                    <Link to="/blogs">blogs</Link>
                  </Button>
                  <Button color="inherit">
                    <Link to="/users">users</Link>
                  </Button>
                  <Button color="inherit" onClick={logout} type="submit">
                  logout
                  </Button>
                  <MenuItem  color="inherit">
                    {user.name} is logged-in
                  </MenuItem>*/
