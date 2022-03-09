const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
      },

      {
        title: 'This is the end',
        author: 'Bruno Jano',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 19
      },

      {
        title: 'Where is ?',
        author: 'Maria M',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1
      },

      {
        title: 'Going through the valley',
        author: 'Emil Lajcak',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 9
      },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[3])
    await blogObject.save()
})

describe('blogs are beign returned + check id', () => {
test('blog is returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are being returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('id is defined', async () => {
const response = await api.get('/api/blogs')
expect(response.body[0].id).toBeDefined()
})
})

describe('chceck missing url/title + default likes is 0 chceck', () => {

test('if likes are missing, give 0', async () => {
const newBlog = {
    title: 'Nothing New',
    author: 'Eva Weber',
    url: 'www.evaweber.com',
}
    await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get(`/api/blogs`)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(response.body[4].likes).toBe(0)
})

test('if url and title are missing, give 400 bad request', async () => {
const newBlog = {
    author: 'Tereza Len',
    likes:3
}
    await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})
})

describe('add, delete, update', () => {
test('a blog entry can be deleted', async () => {
    const blogsAtStart = await api.get(`/api/blogs`)
    const aBlogToBeDeleted = blogsAtStart.body[0]

    await api
    .delete(`/api/blogs/${aBlogToBeDeleted.id}`)
    .expect(204)

    const blogsAtTheEnd = await api.get('/api/blogs')
    expect(blogsAtTheEnd.body).toHaveLength(initialBlogs.length - 1)

    const contents = blogsAtTheEnd.body.map(r => r.title)
    expect(contents).not.toContain(aBlogToBeDeleted.title)

})

test('a valid blog can be posted', async () => {
    const newBlog = {
        title: 'Going home with JS',
        author: 'Lars Ebeling',
        url: 'http://www.martinus.sk',
        likes: 8,
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
        'Going home with JS'
    )
})

test('check if likes are being updated', async () => {
    const blogsAtStart = await api.get(`/api/blogs`)
    const aBlogToBeUpdated = blogsAtStart.body[0]

    await api
    .put(`/api/blogs/${aBlogToBeUpdated.id}`)
    .send({likes:300})
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtTheEnd = await api.get(`/api/blogs`)

    expect(blogsAtTheEnd.body[0].likes).toBe(300)

})
})

describe('check user requiriments when creating user', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('tajneheslo', 10)
        const user = new User ({ username: 'root', passwordHash })

        await user.save()
    })

    const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
    }

    test('return 400, password too short', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'Uriel',
            name: 'Uriel Uro',
            password: 'U'
        }

        await api
        .post(`/api/users`)
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'super',
      password: 'heslo',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})
afterAll(() => {
    mongoose.connection.close()
})