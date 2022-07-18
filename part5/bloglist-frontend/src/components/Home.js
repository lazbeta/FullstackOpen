import React from 'react'
import { Typography, Box } from '@mui/material'

const Home = () => (
  <>
    <Typography variant="div"><h1>Blog list app</h1></Typography>
    <Box>
      <Typography>
      A blog is a discussion or informational website published on the World Wide Web
       consisting of discrete, often informal diary-style text entries.
        Posts are typically displayed in reverse chronological order, so that the most recent post appears first,
         at the top of the web page
      </Typography>
      <br/>
      <Typography>
        The collective community of all blogs and blog authors, particularly notable and widely read blogs, is known as the blogosphere. Since all blogs are on the internet by definition, they may be seen as interconnected and socially networked, through blogrolls, comments, linkbacks (refbacks, trackbacks or pingbacks), and backlinks. Discussions in the blogosphere were occasionally used by the media as a gauge of public opinion on various issues.
      </Typography >
      <Typography>
        <br/> Because new, untapped communities of bloggers and their readers can emerge in the space of a few years, Internet marketers pay close attention to trends in the blogosphere
      </Typography>
      <Typography variant="body1"><a href='https://en.wikipedia.org/wiki/Blog'>WIKI</a></Typography>
    </Box>
  </>
)

export default Home