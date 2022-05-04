import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  return  (
    <Alert severity="success">
      {notification}
    </Alert>
  )
}
export default Notification
