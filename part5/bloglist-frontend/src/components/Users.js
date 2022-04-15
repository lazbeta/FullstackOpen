import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { allUsers } from '../reducers/userReducer'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  return (
    <>
      <h2>Users</h2>
      <ul>
        {users.map(user =>
          <li key={user.id}>
            {user.name}
          </li>
        )}
      </ul>
    </>
  )
}

export default Users