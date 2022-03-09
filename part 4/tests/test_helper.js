const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },

      {
        title: 'This is the end',
        author: 'Bruno Jano',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 19,
        __v: 0
      },

      {
        title: 'Where is ?',
        author: 'Maria M',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1,
        __v: 0
      },

      {
        title: 'Going through the valley',
        author: 'Emil Lajcak',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 9,
        __v: 0
      },
]

const nonExistingId = async () => {
    const blog = new Blog({title:"the title", url:"www.urllll.com", likes:3, author:"Rob K"})
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}