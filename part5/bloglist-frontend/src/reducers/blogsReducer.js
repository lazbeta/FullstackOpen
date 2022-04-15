import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    likeBlog(state, action){
      const id = action.payload
      const likingBlog= state.find(b => b.id === id)
      const likedBlog = {
        ...likingBlog,
        likes: likingBlog.likes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : likedBlog)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    setDeletedBlogs(state, action) {
      state.filter(item => action.payload !== item)
    }
  },
})

export const { setBlogs, appendBlog, setDeletedBlogs, likeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createNewBlog =  (author, title, url)  => {
  return async dispatch => {
    const newBlog = await blogService.create( author, title, url )
    dispatch(appendBlog(newBlog))
  }
}

export const deleteThisBlog = id => {
  console.log('delete blog is called')
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(setDeletedBlogs())
  }
}

export const likedBlog = (id, blog) => {
  return async dispatch => {
    await blogService.updateLikes(id, blog)
    dispatch(likeBlog(id))
  }
}

export default blogSlice.reducer