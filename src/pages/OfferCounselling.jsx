import OfferCounsellingCSS from "../assets/styles/OfferCounselling.module.css"
import { useDispatch, useSelector } from "react-redux"
import 
{ handleChange,
  handleSubmit,setCount,
  ErrorMsg,resetCount,
  handleFileChange, handleModelChange,addWorkingExperience,
  updateWorkingExperience,removeWorkingExperience,updateWorkingExperienceFile} 
from "../features/offerCounselling/offerCounsellingSlice";
import React from "react";
import {useNavigate} from "react-router-dom"

export default function OfferCounselling(){
  //dispatch
  const dispatch = useDispatch()
  //useRef to manipluate the DOM elements
  const buttonRef = React.useRef()
  const navigate = useNavigate();
  React.useEffect(()=>{
    buttonRef.current.click()
  },[])
  //state parameters from offerCounselling State
  const {offerCounsellorForm,stepCount,errorMsg, showModel,workingExperience} = useSelector((store) => store.offerCounselling)

  return (
    <> 
    {showModel && ( 
      <>
      <button
         type="button" 
         data-bs-toggle="modal" 
         data-bs-target="#policies"
         ref = {buttonRef}
         className={OfferCounsellingCSS.visuallyHidden}
      >
      </button>

      <div className={` ${OfferCounsellingCSS.model} modal fade`} id="policies" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className={` ${OfferCounsellingCSS.modelBody}  modal-content`}>
            <div className="modal-header">
              <h1 className= {` ${OfferCounsellingCSS.modelTitle} modal-title fs-5`} id="policiesLabel">Instructions and Eligibility Crieteria</h1>
            </div>
            <div className="modal-body">
              <h5 className={OfferCounsellingCSS.modelLabels}>Instructions:</h5>
              <p className={OfferCounsellingCSS.modelContent}>
              Once the form is filled out, after verification from the admin side, you will receive an email. This email will confirm that the admin has verified your details.
              Additionally, at the end of the process, your email will be further verified through an OTP sent to your mailbox.
              </p>
              <h5 className={OfferCounsellingCSS.modelLabels}>Eligibility Criteria:</h5>
              <p className={OfferCounsellingCSS.modelContent}>
              The maximum qualification required to act as a counsellor on our website is a master's degree (M.Phil) or a PhD.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className={`${OfferCounsellingCSS.modelAcceptBtn} btn`} data-bs-dismiss="modal"
              onClick={(event)=>{
                dispatch(handleModelChange())
                dispatch(setCount({
                  value:1
                }))
              }}
              >Accept</button>
              <button type="button" className={`${OfferCounsellingCSS.modelRejectBtn} btn`}
               onClick={(event)=>{
                navigate('/')
                location.reload()

              }}
              >Reject</button>
            </div>
          </div>
        </div>
      </div>
      </>
    )}
    
    <div className="form-container">
    <form id={OfferCounsellingCSS.msform}
     onSubmit={(event) => {
      event.preventDefault()
      dispatch(handleSubmit())
      }}
    >
    <ul id= {OfferCounsellingCSS.progressbar}>
      <li className='active'>Perosnal Details</li>
      <li className='active'>Qualification</li>
      <li className='active'>Working Experience</li>
    </ul>
    {stepCount == 1 && (<fieldset>
        <h2 className={`${OfferCounsellingCSS.fsTitle} fs-title`}>Provide your Personal Details</h2>
        <h3 className={`${OfferCounsellingCSS.fsSubTitle} fs-subtitle`}>This is step 1</h3>
        <input className={OfferCounsellingCSS.input}
          type="text" 
          name="name" 
          placeholder="Full Name"
          value={offerCounsellorForm.name}
          onChange={(event) => {
            dispatch(handleChange({
                name: event.target.name,
                value: event.target.value
            }))
          }}
          required
          />
        <input className={OfferCounsellingCSS.input}
          type="email" 
          name="email" 
          placeholder="example@gmail.com"
          value={offerCounsellorForm.email}
          onChange={(event) => {
            dispatch(handleChange({
                name: event.target.name,
                value: event.target.value
            }))
          }}
          required
          />
          <input className={OfferCounsellingCSS.input}
            type="tel"
            name="phoneNo"
            required
            placeholder="Phone number after +92- (e.g., 123456789)"
            pattern="\+\d{1,4}-\d{1,10}"
            title="Enter a valid phone number in the format: +92-number (e.g., +92-123456789)"
            value={offerCounsellorForm.phoneNo}
            onChange={(event) => {
              const enteredNumber = event.target.value.replace(/\+\d{1,4}-/, '');
              const limitedNumber = enteredNumber.slice(0, 10);
              dispatch(handleChange({
                name: event.target.name,
                value: `+92-${limitedNumber}`
              }))
            }}
          />
         <input className={OfferCounsellingCSS.input}
              type="text"
              name="cnic"
              maxLength="15"
              required
              placeholder="CNIC XXXXX-XXXXXXX-X"
              title="Enter CNIC number in the format: XXXXX-XXXXXXX-X"
              value={offerCounsellorForm.cnic}
              onChange={(event) => {
                let enteredValue = event.target.value.replace(/-/g, ''); // Remove existing hyphens
                let formattedValue = '';
                
                // Insert hyphens at appropriate positions
                for (let i = 0; i < enteredValue.length && i < 15; i++) {
                  if (i === 5 || i === 12) {
                    formattedValue += '-';
                    formattedValue += enteredValue.charAt(i);
                  } else {
                    formattedValue += enteredValue.charAt(i);
                  }
                }
                dispatch(handleChange({
                  name: event.target.name,
                  value: formattedValue.slice(0, 15)
                }));
              }}
            />
            <div className={`${OfferCounsellingCSS.genderContainer} mt-2 mb-3  `}>
                <label className={OfferCounsellingCSS.genderLabel}>Gender: </label>

                
                <input className={`${OfferCounsellingCSS.radio} `}
                  type="radio"
                  name="gender"
                  value="male"
                  checked={offerCounsellorForm.gender === 'male'}
                  required
                  onChange={(event) => {
                    dispatch(handleChange({
                      name: event.target.name,
                      value: event.target.value
                    }))
                  }}
                />
                <label className={OfferCounsellingCSS.genderRadioLabel} htmlFor="male">Male</label>
                
                <input className={`${OfferCounsellingCSS.radio} `}
                  type="radio"
                  name="gender"
                  value="female"
                  checked={offerCounsellorForm.gender === 'female'}
                  onChange={(event) => {
                    dispatch(handleChange({
                      name: event.target.name,
                      value: event.target.value
                    }))
                  }}
                  required
                />
                <label className={OfferCounsellingCSS.genderRadioLabel} htmlFor="female">Female</label>
            </div>
           
            <label htmlFor="cnicFrontImg" className={OfferCounsellingCSS.cnicImg}>Upload CNIC Front Image:</label><br/>
            {offerCounsellorForm.cnicFrontImg && (
              <span className={OfferCounsellingCSS.cnicImgTitles}>{offerCounsellorForm.cnicFrontImg}</span>
            )}
            <input className={OfferCounsellingCSS.input}
              type="file"
              required
              accept="image/png, image/jpeg, image/jpg"
              name="cnicFrontImg"
              onChange={(event) => {           
                dispatch(handleFileChange({
                  name: event.target.name,
                  file: event.target.files[0]
                }));
              }}
            />
             
            <label htmlFor="cnicBackImg" className={OfferCounsellingCSS.cnicImg}>Upload CNIC Back Image:</label>
            <br/><br/>
            {offerCounsellorForm.cnicBackImg && (
              <span className={OfferCounsellingCSS.cnicImgTitles}>{offerCounsellorForm.cnicBackImg}</span>
            )}
            <input className={OfferCounsellingCSS.input}
              type="file"
              required
              accept="image/png, image/jpeg, image/jpg"
              name="cnicBackImg"
              onChange={(event) => {
                dispatch(handleFileChange({
                  name: event.target.name,
                  file: event.target.files[0]
                }));
              }}
              
            />
           
        <button className={`${OfferCounsellingCSS.actionButton} next action-button`}
         onClick={(event)=>{
          
          const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if(!emailPattern.test(offerCounsellorForm.email))
          {
            event.preventDefault()
            dispatch(ErrorMsg({
              msg:'Invalid email'
            }))
          }
          else if ((emailPattern.test(offerCounsellorForm.email) && offerCounsellorForm.gender === "male" || offerCounsellorForm.gender === "female") &&
             offerCounsellorForm.name !== "" &&
             offerCounsellorForm.cnic !== "" && offerCounsellorForm.phoneNo !== "" &&
             offerCounsellorForm.cnicFrontImg !== "" && offerCounsellorForm.cnicBackImg !== "")
            {
              dispatch(ErrorMsg({
                msg:''
              }))
              dispatch(setCount({
                value:2
              }))
          }
          else {
            event.preventDefault(); 
            dispatch(ErrorMsg({
              msg:'please fill all the required details'
            }))
          }
         }}
         >Next
        </button>
        <p className={OfferCounsellingCSS.errorMsg}>{errorMsg}</p>
    </fieldset>)}
    {stepCount == 2 && (<fieldset>
      <h2 className={`${OfferCounsellingCSS.fsTitle} fs-title`}>Provide your Qualification Details</h2>
      <h3 className={`${OfferCounsellingCSS.fsSubTitle} fs-subtitle`}>This is step 2</h3>
      <label htmlFor="qualification" className={OfferCounsellingCSS.qualification}>Select your  Qualification</label>
        <br></br>
        <select  className={` ${OfferCounsellingCSS.qualificationdropdown} mt-3 mb-3`}
          name="qualification"
          value={offerCounsellorForm.qualification}
          onChange={(event) => {
            dispatch(handleChange({
                name: event.target.name,
                value: event.target.value
            }))
          }}
          required>
            <option>M.Phil</option>
            <option >PHD</option>
          </select>
        <input className={OfferCounsellingCSS.input}
            type="text" 
            name="fieldOfStudy" 
            placeholder="Field of Study"
            value={offerCounsellorForm.fieldOfStudy}
            onChange={(event) => {
              dispatch(handleChange({
                  name: event.target.name,
                  value: event.target.value
              }))
            }}
            />
        <label htmlFor="transcriptImg" className={OfferCounsellingCSS.transcriptImg}>Upload Transcript Image according to qualification:</label>
        <br/><br/>
        {offerCounsellorForm.transcript && (
              <span className={OfferCounsellingCSS.cnicImgTitles}>{offerCounsellorForm.transcript}</span>
        )}
        <input className= {OfferCounsellingCSS.input}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          name="transcript"
          onChange={(event) => {            
            dispatch(handleFileChange({
              name: event.target.name,
              file: event.target.files[0]
            }));
          }}
        />
         <button className={`${OfferCounsellingCSS.actionButton} previous action-button`}
         onClick={(event)=>{
          event.preventDefault()
          dispatch(ErrorMsg({
            msg:''
          }))
          dispatch(setCount({
            value:1
          }))
         }}
         >Previous
        
        </button>
        <button className={`${OfferCounsellingCSS.actionButton} next action-button`}
         onClick={(event)=>{
          console.log(offerCounsellorForm.transcript, offerCounsellorForm.qualification,
            offerCounsellorForm.fieldOfStudy)
          if (offerCounsellorForm.transcript !== "" && (offerCounsellorForm.qualification !== "M.Phil" || offerCounsellorForm.qualification !== "PHD" ) && offerCounsellorForm.fieldOfStudy !== "")
          {
            event.preventDefault()
            dispatch(ErrorMsg({
              msg:''
            }))
            console.log("hello")
            dispatch(setCount({
              value:3}))
          }
          else {
            event.preventDefault(); 
            dispatch(ErrorMsg({
              msg:'please fill all the required details'
            }))
          }
         }}
         >Next 
        </button>
       
        <p className={OfferCounsellingCSS.errorMsg}>{errorMsg}</p>

    </fieldset>)}

    {stepCount == 3 && (<>
        <fieldset>
        <h2 className={`${OfferCounsellingCSS.fsTitle} fs-title`}>Provide your Working Experience Details</h2>
        <h3 className={`${OfferCounsellingCSS.fsSubTitle} fs-subtitle`}>This is step 3</h3>
        {offerCounsellorForm.workingExperience.map((workingExperienceData, index) => (
                <fieldset key={index} className="mb-3">
                  
                  <div className={` ${OfferCounsellingCSS.workingContainer} d-flex align-items-center`}>
                  <input className={OfferCounsellingCSS.input}
                        type="text"
                        name="institute"
                        id={`institute-${index}`} 
                        value={workingExperienceData.institute}
                        onChange={(e) =>
                            dispatch(
                                updateWorkingExperience({
                                    index,
                                    name: e.target.name,
                                    value: e.target.value,
                                })
                            )
                        }
                        placeholder="Institute"
                    />
                    {index >=1 && (
                       <button type="button" className="btn btn-danger mb-2" id={`remove-${index}`}  
                       onClick={() => dispatch(removeWorkingExperience({ index }))}>
                        <i className="fa fa-trash"></i>
                       </button>
                    )}
                   

                  </div>
                    {/* Add input fields for startingYear, endingYear, certificates */}
                    <div className={`${OfferCounsellingCSS.workingExperienceYearFields} d-flex align-items-center`}>
                    <input  className={OfferCounsellingCSS.input}
                        type="text"
                        name="startingYear"
                        id={`startingYear-${index}`} 
                        value={workingExperienceData.startingYear}
                        onChange={(e) =>
                            dispatch(
                                updateWorkingExperience({
                                    index,
                                    name: e.target.name,
                                    value: e.target.value,
                                })
                            )
                        }
                        placeholder="Starting Year"
                    />
                    <input  className={`${OfferCounsellingCSS.input}` }
                        type="text"
                        name="endingYear"
                        id={`endingYear-${index}`} 
                        value={workingExperienceData.endingYear}
                        onChange={(e) =>
                            dispatch(
                                updateWorkingExperience({
                                    index,
                                    name: e.target.name,
                                    value: e.target.value,
                                })
                            )
                        }
                        placeholder="Ending Year"
                    />
                    </div>
                    <label htmlFor="certificateImg" className={OfferCounsellingCSS.certificateImg}>Upload Certificate Image according to your working experience:</label>
                    <br/>
                    {offerCounsellorForm.workingExperience[index].certificates && (
                          <span className={OfferCounsellingCSS.cnicImgTitles}>{offerCounsellorForm.workingExperience[index].certificates}</span>
                    )}
                    <input  className={OfferCounsellingCSS.input}
                        type="file"
                        name="certificates"
                        id={`certificates-${index}`} 
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) =>
                            dispatch(
                                updateWorkingExperienceFile({
                                    index,
                                    name: e.target.name,
                                    file: e.target.files[0],
                                })
                            )
                        }
                        placeholder="Certificates"
                    />
                    
         </fieldset>))}
         <button className={`${OfferCounsellingCSS.actionButton} previous action-button`}
         onClick={(event)=>{
          
          dispatch(ErrorMsg({
            msg:''
          }))
          dispatch(setCount({
            value:2
          }))
         }}
         >Previous
        </button>
       
        
        <button
          className={`${OfferCounsellingCSS.actionButton} next action-button`}
          onClick={(event) => {
            let allDetailsFilled = true; 
            offerCounsellorForm.workingExperience.forEach((workingExperienceData, index) => {
              console.log(workingExperienceData)
              if (
                workingExperienceData.institute === "" ||
                workingExperienceData.startingYear === "" ||
                workingExperienceData.endingYear === "" ||
                workingExperienceData.certificates === ""
              ) {
                allDetailsFilled = false
              }
            })

            if (allDetailsFilled) {
              dispatch(ErrorMsg({ msg: '' }))
              alert("hello from Ramsha :)))))))))))")
            } else {
              event.preventDefault();
              dispatch(ErrorMsg({ msg: 'please fill all the required details' }))
            }
          }}
        >
        Next
        </button>

       <button type="button"  className={` ${OfferCounsellingCSS.addBtn} btn `} onClick={(e) => {
        dispatch(addWorkingExperience())}}>Add</button>
        <p className={OfferCounsellingCSS.errorMsg}>{errorMsg}</p>
        </fieldset>
       
    </>)}
    </form>
   </div>
  </>
  )
}