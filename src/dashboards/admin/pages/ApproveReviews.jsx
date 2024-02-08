import React, { useState, useRef, useEffect } from 'react';
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
import { useDispatch, useSelector } from "react-redux";
import { getUnapprovedReviews, 
        setSelectedRow, 
        handleDeleteReview, 
        handleConfirmDelete, 
        handleCancelDelete,
        deleteReview,
        handleApproveModal,
        approveReview} from '../../../features/dashboards/admin/approveReviews/approveReviewsSlice';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'reviewer_name', label: 'User Name', minWidth: 150 },
  { id: 'reviewer_email', label: 'Gmail', minWidth: 150 },
  { id: 'reviewer_description', label: 'Reviews', minWidth: 200 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];



export default function ApproveReviews() {

  const dispatch = useDispatch()
  const {rows, selectedRow, deleteConfirmationOpen, approveModalOpen} = useSelector((store) => store.approveReviews)

  useEffect(() => {
    return () => {
      dispatch(getUnapprovedReviews())
    }
  }, [dispatch])

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const handlingCancelDelete = () => {
    dispatch(handleCancelDelete());
  }

  const handlingApproveModal = () => {
    dispatch(handleApproveModal(false));
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
                                onClick={() => { 
                                  dispatch(
                                    setSelectedRow(row.id)
                                  )
                                  dispatch(
                                    handleDeleteReview(true)
                                  )
                                }}>
                              </i>
                            </Tooltip>
                            <Tooltip title="Click Here To Approve Review">
                              <i
                                className={`fa-solid fa-check 
                                ${ApproveReviewsCSS.icon} ${ApproveReviewsCSS['icon-approval']}`}
                                onClick={() => {
                                  dispatch(
                                    setSelectedRow(row.id)
                                  )
                                  dispatch(
                                    approveReview(
                                      { 'selectedRow' : row.id }
                                    )
                                  )
                                  dispatch(
                                    handleConfirmDelete()
                                  )
                                  dispatch(
                                    handleApproveModal(true)
                                  )
                                }}>
                              </i>
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
        rowsPerPageOptions={[5, 10, 25]}
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
  onClose={handlingCancelDelete}
  className={ApproveReviewsCSS.deleteConfirmationModal}
>
  <div className={ApproveReviewsCSS.modalContent}>
    {selectedRow && (
      <div>
        <h2>Delete Confirmation</h2>
        <p>Are you sure you want to delete this review?</p>
        
            <Button
                onClick={() => {
                  dispatch(
                    handleCancelDelete()
                  )}
                }
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

        <Button 
          onClick={() => {
            dispatch(
              handleConfirmDelete()
            )
            dispatch(
              handleCancelDelete()
            )
            dispatch(
              deleteReview(
                {
                  'selectedRow' : selectedRow
                }
              )
            )
          }}
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

{/* Approve Confirmation Modal */}
<Modal
  open={approveModalOpen}
  onClose={handlingApproveModal}
  className={ApproveReviewsCSS.deleteConfirmationModal}
>
  <div className={ApproveReviewsCSS.modalContent}>
    
      <div>
        <h2>Review Approved Successfully!!</h2>
            <Button
                onClick={() => {
                  dispatch(
                    handleApproveModal(false)
                  )}
                }
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
              Close
                  {/* <i className="fa-solid fa-undo" aria-hidden="true" style={{marginRight: '10px'}}></i>
                  Undo Approval */}
            </Button>
      </div>
    
  </div>
</Modal>
    </Paper>
  );
}
