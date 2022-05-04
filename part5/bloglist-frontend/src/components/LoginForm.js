import React from 'react'
import propTypes from 'prop-types'
import { Button, TextField } from '@mui/material'

const LoginForm = ({
  handleSubmit,
  username,
  password,
  handlePasswordChange,
  handleUsernameChange,
}) => {

  return (
    <form onSubmit={handleSubmit}>
      <h2><i><u><b>BLOGLISTAPP</b></u></i></h2>
      <div>
        <TextField
          id="username"
          value={username}
          label="Username"
          onChange={handleUsernameChange}
          sx={{
            width: 300,
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
            width: 300,
            padding: 1,
          }}
        />
      </div>

      <div className="login-button-div">
        <Button id="login-button" type="submit"
          sx={{
            width: 300,
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
