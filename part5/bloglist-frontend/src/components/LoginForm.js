import React from 'react'
import propTypes from 'prop-types'
import { Button, TextField, Typography } from '@mui/material'

const LoginForm = ({
  handleSubmit,
  username,
  password,
  handlePasswordChange,
  handleUsernameChange,
}) => {

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="div"><h2>BLOGLISTAPP</h2></Typography>
      <div>
        <TextField
          id="username"
          value={username}
          label="Username"
          onChange={handleUsernameChange}
          sx={{
            minWidth: '30vw',
            padding: 1
          }}
        />
      </div>
      <div>
        <TextField
          id="password"
          type="password"
          value={password}
          label="Password"
          onChange={handlePasswordChange}
          sx={{
            minWidth: '30vw',
            padding: 1,
          }}
        />
      </div>

      <div className="login-button-div">
        <Button id="login-button" type="submit"
          sx={{
            width: 280,
            padding: 2,
            background: '#0BB596',
            boxShadow: 2,
            borderRadius: 3,
            color: 'white',
            fontSize: 20,
            letterSpacing: '0.05em',
            '&:hover': {
              backgroundColor: '#A9A9A9',
              color: 'white',
            }
          }}>
          <b>login</b>
        </Button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  handleUsernameChange: propTypes.func.isRequired,
  handlePasswordChange: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
}

export default LoginForm
