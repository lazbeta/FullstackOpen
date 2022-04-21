import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const users = useSelector(state => state.users)
  const user = users.find(u => id === u.id)
  const copyUser = { ...user.blogs  }

  const result = Object.fromEntries(Object
    .entries(copyUser)
    .map(([key, { title }]) => [key, title])
  )

  const result2 = Object.values(result).map((item, index) => {
    return <li key={index}>{item}</li>
  })

  if (user.blogs.length === 0){
    return <div>
      <h2>{user.name}</h2>
      <p>no blogs added</p>
    </div>
  }

  console.log(result2)

  return (
    <div>
      <h2>{user.name}</h2>
      {result2}
    </div>
  )

}

export default User