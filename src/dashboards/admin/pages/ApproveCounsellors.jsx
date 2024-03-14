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
import Modal from '@mui/material/Modal';
import ApproveCounsellorsCSS from '../../../assets/styles/dashboards/admin_css/ApproveCounsellors.module.css';
import Tooltip from '@mui/material/Tooltip';
import {getCounsellors, deleteCounsellor,handleChange,approveCounsellor,clearReason} from "../../../features/dashboards/admin/approveCounsellors/approveCounsellorsSlice"
import { useDispatch ,useSelector} from 'react-redux';


const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'cnic', label: 'CNIC', minWidth: 100 },
  { id: 'education', label: 'Education', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170 },
];

function createData(id,name,email,cnic,education,approvalStatus,details = {}) 
{
  return { id, name, email, cnic, education, approvalStatus, details};
}

export default function ApproveCounsellors() {
  const dispatch = useDispatch();
  const {counsellorsData,comments} =  useSelector((state) => state.approveCounsellors);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [openApproveModal, setApproveOpenModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  
  // api call that gets unapproved counsellor on initial render
  useEffect(() => {
    const getData = async () => {
      await dispatch(getCounsellors());
    };
    getData();
  }, []);
  React.useEffect(() => {
    return () => {
      dispatch(clearReason())
    }
  }, [dispatch])

  useEffect(() => {
    if (counsellorsData) {
      const updatedRows = counsellorsData.map((counsellor) => {
        return createData(
          counsellor.id,
          counsellor.counsellor_id.name,
          counsellor.counsellor_id.email,
          counsellor.cnic,
          counsellor.qualification.qualification,
          counsellor.is_approved,
          {
            gender: counsellor.gender,
            cnicFrontImage: `../../../../career_counselling_portal/Counsellors/${counsellor.counsellor_id.email}/${counsellor.cnic_front_img}`,
            cnicBackImage:  `../../../../career_counselling_portal/Counsellors/${counsellor.counsellor_id.email}/${counsellor.cninc_back_img}`,
            fieldOfStudy: counsellor.qualification.field_of_study,
            transcriptImage:`../../../../career_counselling_portal/Counsellors/${counsellor.counsellor_id.email}/${counsellor.qualification.transcript_img}`,
            workingExperience: counsellor.working_experiences.map((experience)=>({
                instituteName: experience.institute_name,
                startYear: experience.starting_year,
                endYear: experience.ending_year,
                certificationImage: `../../../../career_counselling_portal/Counsellors/${counsellor.counsellor_id.email}/WorkingExperience/${experience.certificates_image}`
            })),
          }
        );
      });
      setRows(updatedRows);
    }
  }, [counsellorsData]);
  

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
      const deletedRow =  rows.filter((row) => row.id === selectedCounselor.id);
      const updatedRows = rows.filter((row) => row.id !== selectedCounselor.id);
      setRows(updatedRows);
      setSelectedCounselor(null);
      setOpenDeleteModal(false);
      dispatch(deleteCounsellor({ email: deletedRow[0].email, comments }));
    }
  };

  const handleApproval = () => {
    if (selectedCounselor) {
      const approvedRow =  rows.filter((row) => row.id === selectedCounselor.id);
      const updatedRows = rows.filter((row) => row.id !== selectedCounselor.id);
      setRows(updatedRows);
      setSelectedCounselor(null);
      setApproveOpenModal(false);
      dispatch(approveCounsellor({ email: approvedRow[0].email, comments }));
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
                  style={{ minWidth: column.minWidth , fontWeight: 'bold', fontSize: 19}}
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
                              className={`fa-solid  fa-check
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
            <div className={ApproveCounsellorsCSS.modalContainer} style = {{fontSize:"20px"}}>
              {selectedCounselor && (
                <div className={ApproveCounsellorsCSS.modalContent}>
                  <h2>{selectedCounselor.name}</h2>
                <p><strong>Email:</strong> {selectedCounselor.email}</p>
                <p><strong>Gender: </strong>{selectedCounselor.details.gender}</p>
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
                <p className='mt-3'><strong>Field of Study: </strong>{selectedCounselor.details.fieldOfStudy}</p>
                <h5><strong>Transcript Image:</strong></h5>
                <div className={ApproveCounsellorsCSS.cnicImages}>
                <img
                  src={selectedCounselor.details.transcriptImage}
                  alt="Transcript Image"
                  className={ApproveCounsellorsCSS.certImage}
                  onClick={() => handleImageClick(selectedCounselor.details.transcriptImage)}
                />
              </div>
                 <h5><strong>Working Experience</strong></h5>
                  {selectedCounselor.details.workingExperience.map((experience, index) => (
                    <div key={index}>
                    <p><strong>Institute Name:</strong> {experience.instituteName}</p>
                    <p><strong>Start Year:</strong> {experience.startYear}</p>
                    <p><strong>End Year:</strong> {experience.endYear}</p>
                    <img
                        src={experience.certificationImage}
                        alt="experience certificate"
                        className={ApproveCounsellorsCSS.certImage}
                        onClick={() => handleImageClick(certImage)}
                    />
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
                {/* <img src={selectedImage} alt="Enlarged Image" className={ApproveCounsellorsCSS.enlargedImage} /> */}
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
            <form onSubmit={(event) => {
                event.preventDefault()
                handleApproval()     
            }}>
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
                <div className='text-center'>
                  <h2 className={`mt-2 ${ApproveCounsellorsCSS.confirmApprovalnHeading}`}>Confirm Approval</h2>
                  <p>Are you sure you want to approve this counselor?</p>
                  <p><strong>If Yes, Kindly craft a welcoming message to greet the counsellor upon their arrival on BotGuidedPathways:</strong></p>

                  <textarea 
                  className={ApproveCounsellorsCSS.commentBox}
                  value = {comments}
                  name = "comments"
                  onChange = {(event) => {
                      dispatch(handleChange({
                          name: event.target.name,
                          value: event.target.value
                      }))
                  }}
                  required
                  ></textarea>
                </div>
              </div>
                  <div className={ApproveCounsellorsCSS.modalActions}>
                    <button onClick={handleApproveClose} className={ApproveCounsellorsCSS.buttonStyle} >Close</button>
                    <button className={ApproveCounsellorsCSS.approvebuttonStyle}>Approved</button>

                  </div>
                </div>
              )}
            </div>
            </form>
            
          </Modal>


      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        {/* The modal for deletion */}
        <form onSubmit={(event) => {
                event.preventDefault()
                handleDelete()     
            }}>
            <div className= {`${ApproveCounsellorsCSS.modalContainer} text-center`}>
              <h2 className={`mt-2 ${ApproveCounsellorsCSS.confirmDeletionHeading}`}>Confirm Deletion</h2>
              <p>Are you sure you want to Reject this counselor?</p>
              <p><strong>If Yes, Kindly mention the proper reason of Rejection...</strong></p>

              <textarea 
                className={ApproveCounsellorsCSS.commentBox}
                value = {comments}
                name = "comments"
                onChange = {(event) => {
                    dispatch(handleChange({
                        name: event.target.name,
                        value: event.target.value
                    }))
                }}
                required
                >

              </textarea>
              <div className={ ApproveCounsellorsCSS.buttonContainer}>
              <button onClick={handleCloseDeleteModal} className={ApproveCounsellorsCSS.buttonStyle}>
                Cancel
              </button>
              <button style={{ marginLeft: '10px' }}  className={ApproveCounsellorsCSS.deleteButton}>
                Reject
              </button>
              </div>
            </div>
        </form>
        
      </Modal>
    </Paper>
  );
}
