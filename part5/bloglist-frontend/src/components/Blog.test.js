import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} updateLikes={likeHandler} />
    ).container
  })

  const likeHandler = jest.fn()

  const blog = {
    author: 'autor',
    title: 'title',
    url: 'url',
    likes: 1,
  }

  test('renders only author and title', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(`${blog.author}`, `${blog.title}`)
  })

  test('clicking this button shows url and number of likes', () => {
    const button = container.querySelector('.showDetails')
    userEvent.click(button)

    const div = container.querySelector('.showUrlAndLikes')
    expect(div).toHaveTextContent(`${blog.url}`, `${blog.likes}`)
  })

  test('like', async () => {
    const button = await container.querySelector('.like')

    userEvent.click(button)
    userEvent.click(button)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })

  test('create new blog', () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const input1 = screen.getByPlaceholderText('author')
    const input2 = screen.getByPlaceholderText('title')
    const input3 = screen.getByPlaceholderText('url')

    const sendButton = screen.getByText('save')

    userEvent.type(input1, 'Jane Doe')
    userEvent.type(input2, 'John Does')
    userEvent.type(input3, 'www.does.com')

    userEvent.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('Jane Doe')
    expect(createBlog.mock.calls[0][0].title).toBe('John Does')
    expect(createBlog.mock.calls[0][0].url).toBe('www.does.com')
  })
})
