const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comments')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({})
  .populate('user', { name: 1, username: 1 })
  .populate('comment', { path:'comment', text: 1 })

  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  
  const user = request.user
  const blog = new Blog ({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


blogsRouter.post('/:id/comments', async (request, response) => {
  const {text} = request.body
  const blog = await Blog.findById(request.params.id)

  const comment = new Comment ({
    text,
    blog: blog._id
  })

  const savedComment = await comment.save()
  blog.comment = blog.comment.concat(savedComment._id)
  await blog.save()
  response.status(201).json(savedComment)

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

const user = request.user
const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === user.id.toString()) {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    likes: request.body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updatedBlog)
})

module.exports = blogsRouter