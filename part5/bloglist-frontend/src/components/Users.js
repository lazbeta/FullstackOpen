import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Users = () => {

  const users = useSelector(state => state.users)

  return (
    <>
      <div>
        <h2>Users</h2>
      </div>
      <table>

        <thead>
          <tr>
            <th>users</th>
            <th>number of blogs added</th>
          </tr>

        </thead>

        <tbody>
          {users.map((user) =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Users