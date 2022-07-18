import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TableContainer, Table, TableRow, TableBody, Paper } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'

const Blogs = ({ blogForm }) => {
  const blogs = useSelector(state => state.blogs)
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      borderRadius: 2
    },
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    },
  }))

  return (
    <>
      <h2>Blogs</h2>
      <TableContainer component={Paper}
        sx={{ width: '75%', margin: 'auto' }}>
        <Table>
          <TableBody>
            {blogs.map(blog => (
              <StyledTableRow key={blog.id}>
                <StyledTableCell align="left">
                  <Link className='link' to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {blog.author}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {blog.user.name}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {blogForm()}
    </>
  )
}

export default Blogs


