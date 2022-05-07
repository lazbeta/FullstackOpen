import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteThisBlog, initializeBlogs, likedBlog, commentedBlog } from '../reducers/blogsReducer'
import { setTheNotifications } from '../reducers/notificationReducer'
import { useParams, useNavigate } from 'react-router-dom'
//css mui
import { Card, CardContent, Typography, Button, CardActions, Grid, Box, Container, TextField } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const Blog = () => {

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const { id } = useParams()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => id === b.id)

  const addLikes = () => {
    dispatch(likedBlog(blog.id, { ...blog, likes: blog.likes + 1 }))
  }

  const handleDelete = async () => {
    if (window.confirm(`Do you want to delete ${blog.title} by ${blog.author}`)){

      await dispatch(deleteThisBlog(blog.id))
      await navigate('/blogs')
      await dispatch(initializeBlogs())
      const message = 'a blog has been deleted'
      await dispatch(setTheNotifications(message, 5))
    }
  }

  const addComments = async (event) => {
    event.preventDefault()
    const text = event.target.text.value
    event.target.text.value = ''

    await dispatch(commentedBlog(blog.id, text))
    await dispatch(initializeBlogs())
  }

  const comments1 =  Object.fromEntries(Object
    .entries(blog.comment)
    .map(([key, { text }]) => [key, text])
  )

  const comments = Object.values(comments1).map((item, index) => {
    return <Card sx={{ margin: 2, padding: 1, borderRadius: 3, zIndex: 1, width: 'auto'  }} key={index}>
      <Typography variant="body1">{item}</Typography></Card>
  })

  if(!blog) {
    return null
  }

  return (
    <div>
      <Container>
        <Box sx={{ marginTop: '60px' }}>
          <Card sx={{ maxWidth: 545, margin: 'auto', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="div">
                <h3>{blog.title}<br/>{blog.author}</h3>
              </Typography>
              <Typography variant="h5" component="p">
                <i>Blog Url: {blog.url}</i>
                <br/>
                <i>Likes: {blog.likes}</i>
                <Button
                  size="small"
                  startIcon={ <ThumbUpIcon/> }
                  sx={{
                    padding: 0.7,
                    background: '#0BB596',
                    marginLeft: 3,
                    boxShadow: 3,
                    borderRadius: 3,
                    color: 'white',
                    fontSize: 12,
                    letterSpacing: '0.05em',
                    '&:hover': {
                      backgroundColor: '#A9A9A9',
                      color: 'black',
                    }
                  }}
                  className="like"
                  onClick={() => addLikes()}>
              Like
                </Button>
                <br/>
                <i>User: {blog.user.name}</i>
                <br/>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="medium"
                onClick={handleDelete}
                sx={{
                  padding: 1,
                  background: '#FF002E',
                  opacity: '49%',
                  boxShadow: 3,
                  borderRadius: 3,
                  color: 'white',
                  fontSize: 12,
                  letterSpacing: '0.05em',
                  '&:hover': {
                    backgroundColor: '#A9A9A9',
                    color: 'black',
                  }
                }}
              >Delete</Button>
            </CardActions>
          </Card>
        </Box>
        <Grid container
          spacing={0}
          direction="column"
          alignItems="center"
          style={{ minHeight: '40vh', marginTop: '30px' }}>
          <h4>Comments</h4>
          <form onSubmit={addComments}>
            <TextField
              name='text'
              placeholder='Comment here'
              sx={{ minWidth: '30vw' }}/>
            <Button
              id="save-button"
              type="submit"
              size="small"
              sx={{
                width: 50,
                padding: 1.5,
                background: '#0BB596',
                boxShadow: 3,
                borderRadius: 3,
                color: 'white',
                fontSize: 14,
                marginLeft: 0.9,
                letterSpacing: '0.05em',
                '&:hover': {
                  backgroundColor: '#A9A9A9',
                  color: 'black',
                }
              }}
            >
           save
            </Button>
          </form>
          {comments}
        </Grid>
      </Container>
    </div>
  )
}

export default Blog
