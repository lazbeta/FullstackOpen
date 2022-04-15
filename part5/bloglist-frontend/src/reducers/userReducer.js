import usersService from '../services/users'
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = userSlice.actions

export const allUsers = () => {
  return async dispatch => {
    const users = await usersService.getUsers()
    dispatch(setUsers(users))
  }
}

export default userSlice.reducer
