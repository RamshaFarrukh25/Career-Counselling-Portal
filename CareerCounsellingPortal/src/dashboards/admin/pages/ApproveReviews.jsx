import React, { useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import ApproveReviewsCSS from '../../../assets/styles/dashboards/admin_css/ApproveReviews.module.css'

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'userName', label: 'User Name', minWidth: 150 },
  { id: 'gmail', label: 'Gmail', minWidth: 150 },
  { id: 'reviews', label: 'Reviews', minWidth: 200 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];

// Sample data for the table (reviews)
const initialRows = [
  { id: 1, userName: 'John Doe', gmail: 'johndoe@gmail.com', reviews: 'Great service!', reviewApprovalStatus: 0 },
  { id: 2, userName: 'Jane Smith', gmail: 'janesmith@gmail.com', reviews: 'Awesome experience!', reviewApprovalStatus: 1 },
  // Add more rows as needed...
];

export default function ApproveReviews() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [rows, setRows] = useState(initialRows);
  const [selectedReview, setSelectedReview] = useState(null);
  const [approveRejectModalOpen, setApproveRejectModalOpen] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const editorRef = useRef(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleApprovalToggle = (review) => {
    const updatedRows = rows.map((row) => {
      if (row.id === review.id) {
        return {
          ...row,
          reviewApprovalStatus: row.reviewApprovalStatus === 1 ? 0 : 1,
        };
      }
      return row;
    });
    setRows(updatedRows);
  };
  
  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const handleDeleteReview = (row) => {
    setSelectedReview(row);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedReview) {
      const updatedRows = rows.filter((row) => row.id !== selectedReview.id);
      setRows(updatedRows);
      setSelectedReview(null);
      setDeleteConfirmationOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ margin: '20px' }}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          {/* Table Header */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ minWidth: column.minWidth, fontWeight: 'bold', fontSize: 17 }}
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
                             <Tooltip title="Delete Review">
                              <i
                                className={`fa fa-trash mx-2 ${ApproveReviewsCSS.icon} ${ApproveReviewsCSS['icon-trash']}`}
                                aria-hidden="true"
                                onClick={() => handleDeleteReview(row)}
                              ></i>
                            </Tooltip>
                            <Tooltip title="Approve/Reject Review">
                              <i
                                className={`fa-solid ${
                                  row.reviewApprovalStatus === 1 ? 'fa-check' : 'fa-times'
                                } ${ApproveReviewsCSS.icon} ${ApproveReviewsCSS['icon-approval']}`}
                                onClick={() => handleApprovalToggle(row)}
                              ></i>
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
         <Modal
  open={deleteConfirmationOpen}
  onClose={handleCancelDelete}
  className={ApproveReviewsCSS.deleteConfirmationModal}
>
  <div className={ApproveReviewsCSS.modalContent}>
    {selectedReview && (
      <div>
        <h2>Delete Confirmation</h2>
        <p>Are you sure you want to delete this review?</p>
        
            <Button
                onClick={handleCancelDelete}
            style={{
                margin: '10px',
                padding: '8px 16px',
                cursor: 'pointer',
                borderRadius: '4px',
                fontSize: '16px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                backgroundColor: '#741ac2',
                color: '#fff',
                border: '1px solid yellowgreen',
            }}>
                    Cancel
                
                </Button>

        <Button onClick={handleConfirmDelete}
        style={{
            margin: '10px',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            backgroundColor: '#e00',
            color: '#fff',
            border: '1px solid #d00',
        }}>
          Delete
        </Button>
      </div>
    )}
  </div>
</Modal>
    </Paper>
  );
}
