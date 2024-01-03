import React from 'react';
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
import profile from  "../../assets/images/Profile_ProfilePic.jpeg"
import cnicFront from "../../assets/images/Profile_Cnic_Front.jpg"
import cnicBack from  "../../assets/images/Profile_Cnic_Back.jpeg"
import working_experience from "../../assets/images/Profile_Working_Experience.png"
import transcript from "../../assets/images/Profile_Transcript.jpg"

export default function Profile() {
  return (
    <section className={ProfileCSS.profileSection}>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className={` ${ProfileCSS.header} rounded-3 p-3 mb-4 shadow` }>
              <MDBBreadcrumbItem className={ProfileCSS.title}>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={profile}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '200px' }}
                  fluid />
                <p className="text-muted mb-1">Counsellor</p>
                <p className="text-muted mb-4">Ramsha Farrukh</p>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardImage
                      src={cnicFront}
                      alt="avatar"
                      className=""
                      style={{ width: '300px' }}
                    fluid />
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <MDBCardImage
                      src={cnicBack}
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
                    <MDBCardText className="text-muted">Ramsha Farrukh</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">ram25@gmail.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">+92-3144383634</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>CNIC</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">35202-5385812-0</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Female</MDBCardText>
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
                        <MDBCardText className="text-muted">PHD</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="2">
                        <MDBCardText>Area of Field</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="10">
                        <MDBCardText className="text-muted">Computer Science</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBCardImage
                      src={transcript}
                      alt="avatar"
                      className=""
                      style={{ width: '350px' }}
                    fluid />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="12" className='mt-5'>
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody className="text-center">
                    <MDBCardText c className={`mb-5 ${ProfileCSS.peronsalDetails}`}><span className="font-italic me-1 mb-5">Working Experience</span></MDBCardText>
                    <MDBRow>
                      <MDBCol sm="2">
                        <MDBCardText>Insitute</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="10">
                        <MDBCardText className="text-muted">University of the Punjab</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="2">
                        <MDBCardText>Starting Year</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="10">
                        <MDBCardText className="text-muted">2020</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="2">
                        <MDBCardText>Ending Year</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="10">
                        <MDBCardText className="text-muted">2024</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBCardImage
                      src={working_experience}
                      alt="avatar"
                      className=""
                      style={{ width: '350px' }}
                    fluid />
                    
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}