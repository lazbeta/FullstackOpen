import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//css mui
import { TableContainer, Table, TableRow, TableBody, Paper } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'

const Users = () => {

  const users = useSelector(state => state.users)
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
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
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}
        sx={{ width: '75%', margin: 'auto' }}>
        <Table>
          <TableBody>
            {users.map(user => (
              <StyledTableRow key={user.id}>
                <StyledTableCell align="left">
                  <Link className='link' to={`/users/${user.id}`}>{user.name}</Link>
                </StyledTableCell>
                <StyledTableCell align="left">
                </StyledTableCell>
                <StyledTableCell align="right">
                  {user.blogs.length}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users