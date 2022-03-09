const res = require("express/lib/response");
const { contentType } = require("express/lib/response")
const _ = require("lodash");

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => max && max.likes > blog.likes ? max : blog, [])
}

const mostBlogs = (blogs) => {
    let author = blogs.map(blog => blog.author)
    let copyAuhtor = [...author]
    let result = _.chain(copyAuhtor).countBy().toPairs().maxBy(_.last).value()
    
    return result
    //returns name and number of blogs
}




module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}