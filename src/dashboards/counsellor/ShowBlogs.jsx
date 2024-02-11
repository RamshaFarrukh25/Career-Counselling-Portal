import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ShowBlogsCSS from "../../assets/styles/dashboards/counsellor_css/ShowBlogs.module.css"
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getCounsellorBlogs, handleDeleteBlog, deleteBlog, handleCancelDelete} from "../../features/dashboards/counsellor/showBlogsSlice"

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'title', label: 'Blog Title', minWidth: 200 },
  { id: 'author_name', label: 'Author Name', minWidth: 150 },
  { id: 'created_at', label: 'Issue Date', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];

export default function ShowBlogs() {
  const dispatch = useDispatch();
  const { selectedBlog, deleteConfirmationOpen, rows } = useSelector((store) => store.showBlogs);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    async function fetchCounsellorBlogs() {
      await dispatch(getCounsellorBlogs())
    }
    fetchCounsellorBlogs()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = rows
    ? rows.filter((row) =>
        Object.values(row).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ margin: '20px', borderBottom: '1px solid #692D94' }}
      />
      {rows && ( 
        <TableContainer className={ShowBlogsCSS.table} sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            {/* Table Header */}
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: 'bold',
                      fontSize: 17,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align="center">
                          {column.id === 'actions' ? (
                            <>
                              <Tooltip title="View Detail of Blog">
                                <Link to={`/counsellor/showBlogs/${row.id}`}>
                                  <i
                                    className={`fa fa-eye ${ShowBlogsCSS.icon} ${ShowBlogsCSS['icon-eye']}`}
                                  ></i>
                                </Link>
                              </Tooltip>
                              <Tooltip title="Delete Blog">
                                <i
                                  className={`fa fa-trash mx-2 ${ShowBlogsCSS.icon} ${ShowBlogsCSS['icon-trash']}`}
                                  aria-hidden="true"
                                  onClick={(event) =>
                                    dispatch(handleDeleteBlog({ data: row }))
                                  }
                                ></i>
                              </Tooltip>
                              <Tooltip title="Edit Blog">
                                <Link to={`/counsellor/addBlog/${row.id}`}>
                                  <i
                                    className={`fa-solid fa-pen-to-square ${ShowBlogsCSS.icon} ${ShowBlogsCSS['icon-eye']}`}
                                  ></i>
                                </Link>
                              </Tooltip>
                            </>
                          ) : (
                            row[column.id]
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Table Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteConfirmationOpen} onClose={(event) => dispatch(handleCancelDelete())}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          {selectedBlog && (
            <div>
              <p>Are you sure you want to delete this blog?</p>
              <p><strong>ID:</strong> {selectedBlog.id}</p>
              <p><strong>Blog Name: </strong>{selectedBlog.title}</p>
            </div>
          )}
          <Button onClick={(event) => dispatch(deleteBlog(selectedBlog.id))} style={{
              margin: '10px',
              padding: '8px 16px',
              cursor: 'pointer',
              borderRadius: '4px',
              backgroundColor: '#e00',
              color: '#fff',
              border: '1px solid #e00',
              fontSize: '16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
            }}>Delete</Button>

          <Button onClick={(event) => dispatch(handleCancelDelete())} style={{
              margin: '10px',
              padding: '8px 16px',
              cursor: 'pointer',
              borderRadius: '4px',
              backgroundColor: '#741ac2',
              color: '#fff',
              border: '1px solid yellowgreen',
              fontSize: '16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
            }}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}

