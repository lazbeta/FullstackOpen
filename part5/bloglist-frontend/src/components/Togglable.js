import React from 'react'
import { useState, forwardRef, useImperativeHandle } from 'react'
//css mui
import { Button } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>

        <Button type="submit"
          size="large"
          onClick={toggleVisibility}
          sx={{
            padding: 2,
            background: '#0BB596',
            boxShadow: 2,
            borderRadius: 3,
            color: 'white',
            letterSpacing: '0.05em',
            '&:hover': {
              backgroundColor: '#A9A9A9',
              color: 'white',
            }
          }}>
          <b>Add New Blog</b>
        </Button>

      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div className="addNew-button-div">
          <Button id="cancel-button" type="submit"
            size="large"
            onClick={toggleVisibility}
            sx={{
              width: 100,
              background: '#0BB596',
              boxShadow: 2,
              borderRadius: 3,
              color: 'white',
              fontSize: 15,
              letterSpacing: '0.05em',
              marginTop: '15px',
              '&:hover': {
                backgroundColor: '#A9A9A9',
                color: 'white',
              }
            }}>
            cancel
          </Button>
        </div>
      </div>
    </div>

  )
})

Togglable.displayName = 'Togglable'

export default Togglable