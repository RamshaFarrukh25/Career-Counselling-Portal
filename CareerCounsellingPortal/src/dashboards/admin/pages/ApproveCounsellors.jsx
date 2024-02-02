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
import Modal from '@mui/material/Modal';
import CounsellorsImage from "../../../assets/images/Dr. Samantha Williams_Image.jpg"
import ApproveCounsellorsCSS from '../../../assets/styles/dashboards/admin_css/ApproveCounsellors.module.css';
import { Editor } from '@tinymce/tinymce-react';
import Tooltip from '@mui/material/Tooltip';


const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'cnic', label: 'CNIC', minWidth: 100 },
  { id: 'education', label: 'Education Level', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170 },
];

function createData(
  id,
  name,
  email,
  cnic,
  education,
  approvalStatus,
  details = {} // Additional counselor details
) {
  return { id, name, email, cnic, education, approvalStatus, details };
}

const initialRows = [
  createData(1, 'Hira Asghar', 'janedoe@example.com', '0987654321', 'Master\'s', 1, {
    gender: 'Female',
    cnicFrontImage: CounsellorsImage,
    cnicBackImage: CounsellorsImage,
    fieldOfStudy: 'Psychology',
    transcriptImage: CounsellorsImage,
    workingExperience: [
      {
        instituteName: 'ABC Institute',
        startYear: 2016,
        endYear: 2020,
        certificationImage: [CounsellorsImage],
      },
      {
        instituteName: 'DEF Institute',
        startYear: 2021,
        endYear: 2023,
        certificationImage: [CounsellorsImage],
      },
    ],
  }),
  createData(2, 'Umair Saleem', 'janedoe@example.com', '0987654321', 'Master\'s', 1, {
    gender: 'Female',
    cnicFrontImage: CounsellorsImage,
    cnicBackImage: CounsellorsImage,
    fieldOfStudy: 'Psychology',
    transcriptImage: CounsellorsImage,
    workingExperience: [
      {
        instituteName: 'ABC Institute',
        startYear: 2016,
        endYear: 2020,
        certificationImage: [CounsellorsImage],
      },
      {
        instituteName: 'DEF Institute',
        startYear: 2021,
        endYear: 2023,
        certificationImage: [CounsellorsImage],
      },
    ],
  }),
  createData(3, 'Kalsom Asghar', 'janedoe@example.com', '0987654321', 'Master\'s', 1, {
    gender: 'Female',
    cnicFrontImage: CounsellorsImage,
    cnicBackImage: CounsellorsImage,
    fieldOfStudy: 'Psychology',
    transcriptImage: CounsellorsImage,
    workingExperience: [
      {
        instituteName: 'ABC Institute',
        startYear: 2016,
        endYear: 2020,
        certificationImage: [CounsellorsImage],
      },
      {
        instituteName: 'DEF Institute',
        startYear: 2021,
        endYear: 2023,
        certificationImage: [CounsellorsImage],
      },
    ],
  }),
  createData(4, 'Subhan Asghar', 'janedoe@example.com', '0987654321', 'Master\'s', 1, {
    gender: 'Female',
    cnicFrontImage: CounsellorsImage,
    cnicBackImage: CounsellorsImage,
    fieldOfStudy: 'Psychology',
    transcriptImage: CounsellorsImage,
    workingExperience: [
      {
        instituteName: 'ABC Institute',
        startYear: 2016,
        endYear: 2020,
        certificationImage: [CounsellorsImage],
      },
      {
        instituteName: 'DEF Institute',
        startYear: 2021,
        endYear: 2023,
        certificationImage: [CounsellorsImage],
      },
    ],
  })
];

export default function ApproveCounsellors() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [rows, setRows] = useState(initialRows);
  const [openApproveModal, setApproveOpenModal] = useState(false);
  const editorRef = useRef(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = (counselor) => {
    setSelectedCounselor(counselor);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = () => {
    if (selectedCounselor) {
      const updatedRows = rows.filter((row) => row.id !== selectedCounselor.id);
      setRows(updatedRows);
      setSelectedCounselor(null);
      setOpenDeleteModal(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleApprovalToggle = (counselor) => {
    setSelectedCounselor(counselor);
    setApproveOpenModal(true)
    const updatedRows = rows.map((row) => {
      if (row.id === counselor.id) {
        return {
          ...row,
          approvalStatus: row.approvalStatus === 1 ? 0 : 1,
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
    console.log(data)
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
    <Paper sx={{ width: '100%' }} className= {ApproveCounsellorsCSS.fontSize}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ margin: '20px' }}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
             
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ minWidth: column.minWidth , fontWeight: 'bold', fontSize: 17}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      if (column.id === 'actions') {
                        return (
                          <TableCell key={column.id} align="center">
                            <Tooltip title="View Detail of Counsellor">
                            <i
                                   className={`fa fa-eye ${ApproveCounsellorsCSS.icon} ${ApproveCounsellorsCSS['icon-eye']}`}
                              aria-hidden="true"
                              onClick={() => handleOpenModal(row)}
                              style={{ cursor: 'pointer' }}
                            ></i>
                            </Tooltip>
                            <Tooltip title="Delete Counsellor">
                            <i
                               className={`fa fa-trash ${ApproveCounsellorsCSS.icon} ${ApproveCounsellorsCSS['icon-trash']}`}
                              aria-hidden="true"
                              onClick={() => {
                                setSelectedCounselor(row);
                                setOpenDeleteModal(true);
                              }}
                              style={{ cursor: 'pointer' }}
                            ></i>
                            </Tooltip>
                            <Tooltip title="Approve/Reject Counsellor">
                            <i
                              className={`fa-solid ${
                                row.approvalStatus === 1 ? 'fa-check' : 'fa-times'
                              } ${ApproveCounsellorsCSS.icon} ${ApproveCounsellorsCSS['icon-approval']}`}
                              onClick={() => handleApprovalToggle(row)}
                            ></i></Tooltip>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align="center">
                          {row[column.id]}
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
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />


        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            
            {/* The modal content */}
            <div className={ApproveCounsellorsCSS.modalContainer} style = {{fontSize:"18px"}}>
              {selectedCounselor && (
                <div className={ApproveCounsellorsCSS.modalContent}>
                  <h2>{selectedCounselor.name}</h2>
                <p><strong>Email:</strong> {selectedCounselor.email}</p>
                <p><strong>CNIC:</strong> {selectedCounselor.cnic}</p>
                <p><strong>CNIC Front and Back Pictures</strong></p>
                <div className={ApproveCounsellorsCSS.cnicImages}>
                <img
            src={selectedCounselor.details.cnicFrontImage}
            alt="CNIC Front"
            className={ApproveCounsellorsCSS.certImage}
            onClick={() => handleImageClick(selectedCounselor.details.cnicFrontImage)}
          />
                  <img
            src={selectedCounselor.details.cnicBackImage}
            alt="CNIC Back"
            className={ApproveCounsellorsCSS.certImage}
            onClick={() => handleImageClick(selectedCounselor.details.cnicBackImage)}
          />
              </div>
                <p><strong>Gender: </strong>{selectedCounselor.details.gender}</p>
                <p><strong>Field of Study: </strong>{selectedCounselor.details.fieldOfStudy}</p>
                <p><strong>Transcript Image:</strong></p>
                <div className={ApproveCounsellorsCSS.cnicImages}>
                <img
                  src={selectedCounselor.details.transcriptImage}
                  alt="Transcript Image"
                  className={ApproveCounsellorsCSS.certImage}
                  onClick={() => handleImageClick(selectedCounselor.details.transcriptImage)}
                />
              </div>
                <h5>Working Experience</h5>
                  {selectedCounselor.details.workingExperience.map((experience, index) => (
                    <div key={index}>
                    <p>Institute Name: {experience.instituteName}</p>
                    <p>Start Year: {experience.startYear}</p>
                    <p>End Year: {experience.endYear}</p>
                    {experience.certificationImage.map((certImage, certIndex) => (
                      <img
                        key={certIndex}
                        src={certImage}
                        alt={`Cert ${certIndex}`}
                        className={ApproveCounsellorsCSS.certImage}
                        onClick={() => handleImageClick(certImage)}
                      />
                    ))}
                    </div>
                  ))}
                  <div className={ApproveCounsellors.modalActions}>
                    <button onClick={handleCloseModal} className={ApproveCounsellorsCSS.buttonStyle}>Close</button>
                  </div>
                </div>
              )}
            </div>
          </Modal>
          <Modal
      open={openImageModal}
      onClose={handleCloseImageModal}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
    >
      <div className={ApproveCounsellorsCSS.imageModalContainer}>
        <div className={ApproveCounsellorsCSS.imageModalContent}>
          <img src={selectedImage} alt="Enlarged Image" className={ApproveCounsellorsCSS.enlargedImage} />
        </div>
        <button onClick={handleCloseImageModal} className={ApproveCounsellorsCSS.closeButton}>
          Close
        </button>
      </div>
    </Modal>

          {/*for Approval or Rejection Modal*/ }
          <Modal
            open={openApproveModal}
            onClose={handleApproveClose}
            aria-labelledby="modal-modal-title1"
            aria-describedby="modal-modal-description1"
          >
            {/* The modal content */}
            <div className={ApproveCounsellorsCSS.modalContainer}>
              {selectedCounselor && (
                <div className={ApproveCounsellorsCSS.modalContent}>
                  <h2>{selectedCounselor.name}</h2>
                <p> <strong>Email:</strong> {selectedCounselor.email}</p>
                <p><strong>CNIC: </strong>{selectedCounselor.cnic}</p>
                <div className={ApproveCounsellorsCSS.cnicImages}>
                <img
                  src={selectedCounselor.details.cnicFrontImage}
                  alt="CNIC Front"
                  className={ApproveCounsellorsCSS.certImage}
                />
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
              </div>
                  <div className={ApproveCounsellorsCSS.modalActions}>
                    <button onClick={handleApproveClose} className={ApproveCounsellorsCSS.buttonStyle} >Close</button>
                    <button onClick={() => sendMessage(selectedCounselor)} className={ApproveCounsellorsCSS.buttonStyle}>Submit</button>

                  </div>
                </div>
              )}
            </div>
          </Modal>


      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        {/* The modal for deletion */}
        <div className= {ApproveCounsellorsCSS.modalContainer}>
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this counselor?</p>
          <div className={ ApproveCounsellorsCSS.buttonContainer}>
          <button onClick={handleCloseDeleteModal} className={ApproveCounsellorsCSS.buttonStyle}>
            Cancel
          </button>
          <button style={{ marginLeft: '10px' }} onClick={handleDelete} className={ApproveCounsellorsCSS.deleteButton}>
            Delete
          </button>
          </div>

        </div>
      </Modal>
    </Paper>
  );
}
