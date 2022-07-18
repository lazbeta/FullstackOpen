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
import StickyFooter from './components/Footer'
//react router
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
//css
import './index.css'
import { Container, AppBar, Box, Toolbar, IconButton, Typography, Menu, Button, MenuItem, Grid, styled } from '@mui/material'
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
        style={{ minHeight: '40vh' }}>
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

  return (
    <Container maxWidth="xl">
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            <Router>
              <AppBar position="static"
                sx={{ backgroundColor: 'transparent', boxShadow: 0 }}
              >
                <Toolbar disableGutters>
                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', color: 'black' } }}>
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
                      <MenuItem onClick={handleCloseNavMenu} component={Link} to={'/'}>Home</MenuItem>
                      <MenuItem onClick={handleCloseNavMenu} component={Link} to={'/blogs'}>Blogs</MenuItem>
                      <MenuItem onClick={handleCloseNavMenu} component={Link} to={'/users'}>Users</MenuItem>
                      <hr/>
                      <Button type="submit"
                        onClick={logout}
                        sx={{ color: 'white', background: '#A9A9A9', }}
                      >Logout</Button>
                    </Menu>
                  </Box>

                  <Box justifyContent="left" sx={{ paddingLeft: '44px', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'black', display: 'block',   paddingRight: '25px' }}
                      component={Link} to={'/'}
                    >
                      <span className='hovermenu'>Home</span>
                    </Button>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'black', display: 'block',  paddingRight: '25px',  paddingLeft: '25px' }}
                      component={Link} to={'/blogs'}
                    >
                      <span className='hovermenu'>Blogs</span>
                    </Button>

                    <Button
                      className="menuButton"
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'black', display: 'block', paddingLeft: '25px' }}
                      component={Link} to={'/users'}
                    >
                      <span className='hovermenu'>Users</span>
                    </Button>
                  </Box>


                  <Box m={1} sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                    <Typography sx={{ color: 'black', paddingRight: '22px' }}><i>{user.name} </i>is logged-in</Typography>
                    <Button
                      size="medium"
                      sx={{
                        padding: 0.7,
                        background: '#A9A9A9',
                        boxShadow: 0.5,
                        borderRadius: 3,
                        color: 'white',
                        fontSize: 12,
                        letterSpacing: '0.09em',
                        '&:hover': {
                          color: 'black',
                        }
                      }}
                      type="submit"
                      onClick={logout}>
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
      <StickyFooter/>
    </Container>
  )
}

export default App