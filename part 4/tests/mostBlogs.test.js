const listHelper = require('../utils/list_helper')

describe('most popular blog is', () => {
    const blogList = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },

      {
        _id: '5a422aa71b54a676234d5566',
        title: 'This is the end',
        author: 'Bruno Jano',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 19,
        __v: 0
      },

      {
        _id: '5a422aa71b54a676234d3344',
        title: 'Where is ?',
        author: 'Maria M',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1,
        __v: 0
      },

      {
        _id: '5a422aa71b54a676234d1122',
        title: 'Going through the valley',
        author: 'Emil Lajcak',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 9,
        __v: 0
      },

      {
        _id: '5a422aa71b54a676234d1122',
        title: 'Going through the valley 2',
        author: 'Emil Lajcak',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
      },

      {
        _id: '5a422aa71b54a676234d1111',
        title: 'Go To Statement Considered Harmful',
        author: 'Laco Maly',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 33,
        __v: 0
      },
    ]
  
    test('favourite blog is', () => {
        const result = listHelper.mostBlogs(blogList)
        expect(result).toEqual(["Emil Lajcak", 2])
    })
  })