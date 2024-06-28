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
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CounsellorsImage from "../../../assets/images/Dr. Samantha Williams_Image.jpg"
import ApproveBlogsCSS from "../../../assets/styles/dashboards/admin_css/ApproveBlogs.module.css"
import Modal from '@mui/material/Modal';
import { Editor } from '@tinymce/tinymce-react';
import Tooltip from '@mui/material/Tooltip';
import JoditEditor from "jodit-react"
import { useDispatch, useSelector } from "react-redux";
import { getUnapprovedBlogs, 
          setRejectionReason, 
          rejectBlog, 
          handleChange, 
          setSelectedBlog, 
          handleConfirmDelete,
          approveBlog} from '../../../features/dashboards/admin/approveBlogs/approveBlogsSlice';



const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'title', label: 'Blog Title', minWidth: 200 },
  { id: 'author_name', label: 'Author Name', minWidth: 150 },
  { id: 'created_at', label: 'Issue Date', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];


export default function ApproveBlogs() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [openApproveModal, setApproveOpenModal] = useState(false);
  const editorRef = useRef(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const editor = React.useRef(null)

  const {rows, rejectionReason, selectedBlog} =  useSelector((state) => state.approveBlogs);
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(getUnapprovedBlogs())
    }
  }, [dispatch])

  const handleOpenModal = (row) => {
    setSelectedBlog(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteBlog = (row) => {
    setSelectedBlog(row);
    setDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    // Close delete confirmation modal without deleting
    setDeleteConfirmationOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleApprovalToggle = () => {
    setApproveOpenModal(true)
  };
  const handleApproveClose = () => {
    setApproveOpenModal(false);
  };

  const sendMessage = (data) =>
  {
   if (editorRef.current) {
          console.log(editorRef.current.getContent());
        }
        setApproveOpenModal(false);
  }

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setSelectedImage('');
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
                  style={{ minWidth: column.minWidth, fontWeight: "bold", fontSize: 17 }}
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
                          <Tooltip title = "View Detail of Blog">
                            <i
                              className={`fa fa-eye ${ApproveBlogsCSS.icon} ${ApproveBlogsCSS['icon-eye']}`}
                              aria-hidden="true"
                              onClick={() => 
                                {
                                  dispatch(setSelectedBlog(row))
                                  handleOpenModal(row)
                                }}
                            ></i>
                            </Tooltip>
                            <Tooltip title = "Reject Blog">
                            <i
                              className={`fa-solid fa-times mx-2 ${ApproveBlogsCSS.icon} ${ApproveBlogsCSS['icon-trash']}`}
                              aria-hidden="true"
                           
                              onClick={() => 
                                {
                                  dispatch(setSelectedBlog(row))
                                  handleDeleteBlog(row)
                                }}
                            ></i>
                            </Tooltip>
                            <Tooltip title = "Approve Blog">
                            <i
                              className={`fa-solid fa-check ${ApproveBlogsCSS.icon} ${ApproveBlogsCSS['icon-approval']}`}
                              onClick={() => 
                                {
                                  dispatch(setSelectedBlog(row))
                                  handleApprovalToggle()
                                }}
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

      {/* Blog Details Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Blog Detail</DialogTitle>
        <DialogContent>
          {selectedBlog && (
            <div>
              <p><strong>Title: </strong> {selectedBlog.title}</p>
              <p><strong>Author Name: </strong>{selectedBlog.author_name}</p>
              <p><strong>Issue Date: </strong> {selectedBlog.created_at}</p>
              <img  className={ApproveBlogsCSS.certImage} src={`../../../../../career_counselling_portal/Counsellors/${selectedBlog.counsellor_email}/Blogs/${selectedBlog.cover_image}`} alt="Blog Image" 
                  onClick={() => handleImageClick(`../../../../../career_counselling_portal/Counsellors/${selectedBlog.counsellor_email}/Blogs/${selectedBlog.cover_image}`)}/>
              <p style = {{marginTop: 20}} dangerouslySetInnerHTML={{ __html: selectedBlog.description }}></p>
            </div>
          )}
          <Button onClick={handleCloseModal}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              cursor: 'pointer',
              borderRadius: '4px',
              backgroundColor: '#741ac2',
              color: '#fff',
              border: '1px solid yellowgreen',
              fontSize: '16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
            }}>Close</Button>
        </DialogContent>
      </Dialog>
      {/* Modal for Image */}
      <Modal
      open={openImageModal}
      onClose={handleCloseImageModal}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
    >
      <div className={ApproveBlogsCSS.imageModalContainer}>
        <div className={ApproveBlogsCSS.imageModalContent}>
          <img src={selectedImage} alt="Enlarged Image" className={ApproveBlogsCSS.enlargedImage} />
        </div>
        <button onClick={handleCloseImageModal} className={ApproveBlogsCSS.closeButton}>
          Close
        </button>
      </div>
    </Modal>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          {selectedBlog && (
            <div>
              <p>Are you sure you want to delete this blog?</p>
              <p><strong>ID:</strong> {selectedBlog.id}</p>
              <p><strong>Blog Title: </strong>{selectedBlog.title}</p>
              
              {/* rejection reason module */}
            </div>
          )}

          <Button 
              onClick={() => 
                {
                  dispatch(
                    setSelectedBlog(selectedBlog.id)
                  )
                  dispatch(
                    handleConfirmDelete()
                  )
                  handleCancelDelete()
                  dispatch(
                    rejectBlog({blog_id: selectedBlog.id, counsellor_email: selectedBlog.counsellor_email})
                  )
                }} 
              style={{
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
          <Button onClick={handleCancelDelete}style={{
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

       {/*for Approval or Rejection Modal*/ }
       <Modal
  open={openApproveModal}
  onClose={handleApproveClose}
  aria-labelledby="modal-modal-title1"
  aria-describedby="modal-modal-description1"
>
  {/* The modal content */}
  <div className={ApproveBlogsCSS.modalContainer}>
    {selectedBlog && (
      <div className={ApproveBlogsCSS.modalContent}>
        <h2>Do you want  to approve this blog?</h2>
        <p>Blog Title: <strong>{selectedBlog.title}</strong></p>
        <p>Author Name: {selectedBlog.author_name}</p>
        
        <div>
          {/* <Editor
              onInit={(evt, editor) => editorRef.current = editor}
              apiKey='c6i2i2x2pk5zi9xvmylesgph4u0kzmxzdg51sr03dhgjzskp'
         init={{
           height: 200,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       /> */}
        </div>
        <div className={ApproveBlogs.modalActions}>
          <button onClick={handleApproveClose} className= {ApproveBlogsCSS.buttonStyle}>Close</button>
          <button onClick={() =>{
                    dispatch(
                      setSelectedBlog(selectedBlog.id)
                    )
                    dispatch(
                      handleConfirmDelete()
                    )
                    handleApproveClose()
                    dispatch(
                      approveBlog({blog_id: selectedBlog.id})
                    )
                  }
                }
                  className= {`${ApproveBlogsCSS.buttonStyle} mx-2`} >
              Approve
          </button>
        </div>
      </div>
    )}
  </div>
</Modal>

    </Paper>
  );
}
