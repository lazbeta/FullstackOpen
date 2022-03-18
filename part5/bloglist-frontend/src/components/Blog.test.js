import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  beforeEach( () => {
    container = render (
      <Blog
        blog={blog}
        updateLikesFunction={likeHandler}
      />,
    ).container
  })

  const blog = {
    author: 'autor',
    title: 'title',
    url: 'url',
    likes: 1
  }
  const likeHandler = jest.fn()

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

  test('like', () => {
    const button = container.querySelector('.like')

    userEvent.click(button)
    userEvent.click(button)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })

})
