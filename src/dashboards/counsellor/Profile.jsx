import React, { useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit'
import ProfileCSS from "../../assets/styles/dashboards/counsellor_css/Profile.module.css"
import {getCounsellorProfileData} from "../../features/dashboards/counsellor/counsellorProfileSlice"
import { useDispatch,useSelector } from 'react-redux';


export default function Profile() {
  const dispatch = useDispatch()
  const {counsellorProfileData} = useSelector((store)=>store.counsellorProfile)
 
  useEffect(() => {
    dispatch(getCounsellorProfileData())
  }, [])


  return (
    <section className={ProfileCSS.profileSection}>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className={` ${ProfileCSS.header} rounded-3 p-3 mb-4 shadow` }>
              <MDBBreadcrumbItem className={ProfileCSS.title}>Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
        
        {counsellorProfileData && <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={`../../career_counselling_portal/Counsellors/${counsellorProfileData['counsellor_id']['email']}/${counsellorProfileData['profile_pic']}`}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '200px' }}
                  fluid />
                <p className="text-muted mb-1">Counsellor</p>
                <p className="text-muted mb-4">{counsellorProfileData['counsellor_id']['name']}</p>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush="true" className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardImage
                      src={`../../career_counselling_portal/Counsellors/${counsellorProfileData['counsellor_id']['email']}/${counsellorProfileData['cnic_front_img']}`}
                      alt="avatar"
                      className=""
                      style={{ width: '300px' }}
                    fluid />
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <MDBCardImage
                      src={`../../career_counselling_portal/Counsellors/${counsellorProfileData['counsellor_id']['email']}/${counsellorProfileData['cninc_back_img']}`}
                      alt="avatar"
                      style={{ width: '300px' }}
                    fluid />
                    
                  </MDBListGroupItem>
                 
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4 ">
              <MDBCardBody className="text-center">
              <MDBCardText className={`mb-5 ${ProfileCSS.peronsalDetails}`}>Personal Details</MDBCardText>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{counsellorProfileData['counsellor_id']['name']}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{counsellorProfileData['counsellor_id']['email']}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{counsellorProfileData['phone_no']}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>CNIC</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{counsellorProfileData['cnic']}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{counsellorProfileData['gender']}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <MDBRow>
              <MDBCol md="12" className='mt-3'>
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody className="text-center">
                    <MDBCardText  className={`mb-5 ${ProfileCSS.peronsalDetails}`}><span className="font-italic me-1 mb-3">Qaulification</span></MDBCardText>
                   
                    <MDBRow >
                      <MDBCol sm="2">
                        <MDBCardText>Qualification</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="10">
                        <MDBCardText className="text-muted">{counsellorProfileData['qualification']['qualification']}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="2">
                        <MDBCardText>Area of Field</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="10">
                        <MDBCardText className="text-muted">{counsellorProfileData['qualification']['field_of_study']}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBCardImage
                      src={`../../career_counselling_portal/Counsellors/${counsellorProfileData['counsellor_id']['email']}/${counsellorProfileData['qualification']['transcript_img']}`}
                      alt="avatar"
                      className=""
                      style={{ width: '350px' }}
                    fluid />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              {counsellorProfileData &&
                counsellorProfileData['working_experiences'].map((counsellorData, index) => (
              <MDBCol md="12" className='mt-5' key={index}>
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody className="text-center">
                    <MDBCardText className={`mb-5 ${ProfileCSS.peronsalDetails}`}><span className="font-italic me-1 mb-5">Working Experience</span></MDBCardText>
                    <MDBRow>
                      <MDBCol sm="2">
                        <MDBCardText>Insitute</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="10">
                        <MDBCardText className="text-muted">{counsellorData['institute_name']}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="2">
                        <MDBCardText>Starting Year</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="10">
                        <MDBCardText className="text-muted">{counsellorData['starting_year']}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="2">
                        <MDBCardText>Ending Year</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="10">
                        <MDBCardText className="text-muted">{counsellorData['ending_year']}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBCardImage
                      src={`../../career_counselling_portal/Counsellors/${counsellorProfileData['counsellor_id']['email']}/WorkingExperience/${counsellorData['certificates_image']}`}
                      alt="avatar"
                      className=""
                      style={{ width: '350px' }}
                    fluid />
                    
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>))}
            </MDBRow>
          </MDBCol>
        </MDBRow>}
      </MDBContainer>
    </section>
  );
}