import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#da291c',
      color: '#FFFFFF'
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const columns = [
  { id: 'word', label: 'Word', minWidth: 100 },
  {
    id: 'wordCount',
    label: 'Post appearance count',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'postCount',
    label: 'Word appearance count',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'averageSentiment',
    label: 'Average sentiment',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(word, postCount, wordCount, averageSentiment) {
  return { word, wordCount, postCount, averageSentiment };
}

const rows = [
  createData('fire', 438, 582, -0.71),
  createData('burn', 341, 423, -0.52),
  createData('water', 256, 314, -0.53),
  createData('hurt', 241, 414, -0.82),
  createData('hungry', 239, 252, -0.76),
  createData('destroyed', 221, 251, -0.93),
  createData('homeless', 192, 234, -0.89),
  createData('gone', 165, 358, -0.90),
  createData('smoke', 145, 258, -0.75),
  createData('pollution', 132, 158, -0.41),
  createData('mask', 92, 109, -0.44),
];

const useStyles = makeStyles({
  root: {
    width: 700,
    margin: '1em 0em',
  },
  container: {
    maxHeight: 400,
  },
});

export default function WordTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
