describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Alzbeta K',
      username: 'alzu',
      password: 'neviem',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'alzu', password: 'neviem' })
    })

    it('login fails with wrong credentials', function () {
      cy.get('#username').type('alzu')
      cy.get('#password').type('zleheslo')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Alzbeta K logged in')
    })
  })

  it('login form is shown', function () {
    cy.contains('blogs')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'alzu', password: 'neviem' })
    })
    it('a blog can be created', function () {
      cy.contains('new blog').click()
      cy.createBlog({
        title: 'some title',
        author: 'some author',
        url: 'www.newblog1.com',
      })

      cy.contains('some title')
      cy.contains('some author')
    })

    describe('Like + Delete', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.createBlog({
          title: 'some title',
          author: 'some author',
          url: 'www.newblog1.com',
        })
      })

      it('liking a blog', function () {
        cy.contains('show details').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      it('deleting blog', function () {
        cy.contains('show details').click()
        cy.contains('delete').click()
      })
    })

    describe('checking order of blogs', function () {
      beforeEach('creating blogs and addinf likes', function () {
        cy.createBlog({
          title: 'new blog1',
          author: 'new author 1',
          url: 'www.newblog1.com',
          likes: '10',
        })

        cy.createBlog({
          title: 'new blog2',
          author: 'new author 2',
          url: 'www.newblog2.com',
          likes: '22',
        })

        cy.createBlog({
          title: 'new blog3',
          author: 'new author 3',
          url: 'www.newblog3.com',
          likes: 72,
        })
      })

      it('should be sorted', () => {
        cy.get('.blogs')
          .should('have.length', 3)
          .then((blogs) => {
            cy.wrap(blogs[0]).should('contain', 'new blog3, new author 3')
            cy.wrap(blogs[1]).should('contain', 'new blog2, new author 2')
            cy.wrap(blogs[2]).should('contain', 'new blog1, new author 1')
          })
      })
    })
  })
})
