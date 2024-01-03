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
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CounsellorsImage from "../../assets/images/Dr. Samantha Williams_Image.jpg"
import ShowBlogsCSS from "../../assets/styles/dashboards/counsellor_css/ShowBlogs.module.css"
import Modal from '@mui/material/Modal';
import { Editor } from '@tinymce/tinymce-react';
import Tooltip from '@mui/material/Tooltip';



const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'blogName', label: 'Blog Name', minWidth: 200 },
  { id: 'authorName', label: 'Author Name', minWidth: 150 },
  { id: 'issueDate', label: 'Issue Date', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];

// Sample data for the table
const initialRows = [
  { id: 1, blogName: 'Sample Blog 1', authorName: 'Author A', issueDate: '2023-01-01', image: CounsellorsImage, content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.', blogApprovalStatus:0},
  { id: 2, blogName: 'Sample Blog 2', authorName: 'Author B', issueDate: '2023-01-05', image: CounsellorsImage, content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.' , blogApprovalStatus :1},
  // Add more rows as needed...
];

export default function ShowBlogs() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [rows, setRows] = useState(initialRows);
  const [openApproveModal, setApproveOpenModal] = useState(false);
  const editorRef = useRef(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

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

  const handleConfirmDelete = () => {
    if (selectedBlog) {
      const updatedRows = rows.filter((row) => row.id !== selectedBlog.id);
      setRows(updatedRows);
      setSelectedBlog(null);
    }
    setDeleteConfirmationOpen(false);
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

  const handleApprovalToggle = (blog) => {
    setSelectedBlog(blog);
    setApproveOpenModal(true)
    const updatedRows = rows.map((row) => {
      if (row.id === blog.id) {
        return {
          ...row,
          blogApprovalStatus: row.blogApprovalStatus === 1 ? 0 : 1,
        };
      }
      return row;
    });
    setRows(updatedRows);
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
                              className={`fa fa-eye ${ShowBlogsCSS.icon} ${ShowBlogsCSS['icon-eye']}`}
                              aria-hidden="true"
                              onClick={() => handleOpenModal(row)}
                             
                            ></i>
                            </Tooltip>
                            <Tooltip title = "Delete Blog">
                            <i
                              className={`fa fa-trash mx-2 ${ShowBlogsCSS.icon} ${ShowBlogsCSS['icon-trash']}`}
                              aria-hidden="true"
                           
                              onClick={() => handleDeleteBlog(row)}
                            ></i>
                            </Tooltip>
                            <Tooltip title = "Approve/Reject Blog">
                            <i
                              className={`fa-solid  ${
                                row.blogApprovalStatus === 1 ? 'fa-check' : 'fa-times'
                              } ${ShowBlogsCSS.icon} ${ShowBlogsCSS['icon-approval']}`}
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

      {/* Blog Details Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Blog Details</DialogTitle>
        <DialogContent>
          {selectedBlog && (
            <div>
              <p><strong>Blog Name:</strong> {selectedBlog.blogName}</p>
              <p><strong>Author Name: </strong>{selectedBlog.authorName}</p>
              <p><strong>Issue Date:</strong> {selectedBlog.issueDate}</p>
              <img  className={ShowBlogsCSS.certImage} src={selectedBlog.image} alt="Blog Image" 
                  onClick={() => handleImageClick(selectedBlog.image)}/>
              <p style = {{marginTop: 20}}>{selectedBlog.content}</p>
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
      <div className={ShowBlogsCSS.imageModalContainer}>
        <div className={ShowBlogsCSS.imageModalContent}>
          <img src={selectedImage} alt="Enlarged Image" className={ShowBlogsCSS.enlargedImage} />
        </div>
        <button onClick={handleCloseImageModal} className={ShowBlogsCSS.closeButton}>
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
              <p><strong>Blog Name: </strong>{selectedBlog.blogName}</p>
             
            </div>
          )}
          <Button onClick={handleConfirmDelete} style={{
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
  <div className={ShowBlogsCSS.modalContainer}>
    {selectedBlog && (
      <div className={ShowBlogsCSS.modalContent}>
        <h2>{selectedBlog.blogName}</h2>
        <p>Author Name: {selectedBlog.authorName}</p>
        <hr />
        <div>
          <Editor
              onInit={(evt, editor) => editorRef.current = editor}
      apiKey='5ywgvw0w1l7a1mchsxqbpmi62o54vmb0bss3bo4020kxre28'
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
       />
        </div>
        <div className={ShowBlogsCSS.modalActions}>
          <button onClick={handleApproveClose} className= {ShowBlogsCSS.buttonStyle}>Close</button>
          <button onClick={() => sendMessage(selectedBlog)} className= {`${ShowBlogsCSS.buttonStyle} mx-2`} >Submit</button>
        </div>
      </div>
    )}
  </div>
</Modal>

    </Paper>
  );
}
