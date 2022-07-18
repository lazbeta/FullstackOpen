import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
//css mui
import { Typography, Grid } from '@mui/material'

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
    return <li key={index} >{item}</li>
  })

  if (user.blogs.length === 0){
    return <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '20vh' }}
      >
        <Grid item xs={3}>
          <h2>{user.name}</h2>
          <Typography>no blogs added</Typography>
        </Grid>
      </Grid>
    </div>
  }

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '20vh' }}
      >
        <Grid item xs={3}>
          <h2>{user.name}</h2>
          <Typography variant="h5">Blogs:</Typography>
          <Typography sx={{ paddingTop: '40px' }}>{result2}</Typography>
        </Grid>
      </Grid>
    </div>
  )

}

export default User