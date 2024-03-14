import OTPCSS from "../assets/styles/OTP.module.css"
import { useDispatch, useSelector } from "react-redux"
import {
    decrementSeconds, 
    handleChange,
    setOtp,
    setValidate,
    clearForm,
    displayError,
    registerUser
} from "../features/otp/otpSlice"
import { registerCounsellor, sendVerificationEmail } from "../features/offerCounselling/offerCounsellingSlice"
import React from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../assets/images/Loading.gif"

export default function OTP(props){
    const dispatch = useDispatch()
    const { seconds, otp, validate, enteredOTP, errorMsg } = useSelector((store) => store.otp)
    const buttonRef = React.useRef()
    const closeButtonRef = React.useRef()
    const inputRefs = [React.useRef(), React.useRef(), React.useRef(), React.useRef()]
    const navigate = useNavigate()
    const otpCode = props.otp
    const role = props.role
    const { isLoading } = useSelector((store) => store.offerCounselling)
    
    React.useEffect(() => {
        buttonRef.current.click()
        const intervalId = setInterval(() => {
            dispatch(decrementSeconds())
        }, 1000)
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    function checkOTP(){
        if(enteredOTP === otpCode){
            return true
        }
        else{
            dispatch(displayError())
            dispatch(setValidate())
            return false
        }
    }
    
    React.useEffect(() => {
        const fetchData = async () => {
            if (validate && checkOTP()) {
                if (role === "user") {
                    const signUpData = props.data
                    await dispatch(registerUser(signUpData))
                } else {
                    const offerCounsellorForm = props.offerCounsellorForm
                    const images = props.images
                    //console.log("Images", images)
                    //console.log("OfferCounsellorForm", offerCounsellorForm)
                    const formData = new FormData()
    
                    formData.append('offerCounsellorForm', JSON.stringify(offerCounsellorForm))
                    formData.append('profilePic', images.profilePic)
                    formData.append('cnicFrontImg', images.cnicFrontImg)
                    formData.append('cnicBackImg', images.cnicBackImg)
                    formData.append('transcript', images.transcript)
                    //console.log("images.certificates", images.certificates)
                    images.certificates.forEach((certificate, index) => {
                        formData.append(`certificates[${index}]`, certificate)
                    })
                    await dispatch(registerCounsellor(formData))
                    await dispatch(sendVerificationEmail(
                        {'email': offerCounsellorForm.email, 'name': offerCounsellorForm.name}))
                    navigate("/signupSuccess", { replace: true })
                }
                
                window.location.reload()
            }
        }
        fetchData()
    }, [validate])

    function focusInput(index, event) {
        if (index < 3 && event.key !== "Backspace") {
            inputRefs[index + 1].current.focus();
            return
        }
    }

    function getEnteredOTP() {
        return inputRefs.map((ref) => ref.current.value).join('');
    }
    
    return (
        <>
             <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#otp"
                ref={buttonRef}
                style={{display: "none"}}
            >
            </button>

            <div className="modal fade" id="otp" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="otpLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="d-flex flex-row justify-content-center">
                                <h6 className={`text-center ${OTPCSS.heading}`}>
                                    Please enter OTP to verify your account
                                </h6>
                                <button 
                                    type="button" 
                                    className="close" 
                                    data-bs-dismiss="modal" 
                                    aria-label="Close"
                                    style={{display: "none"}}
                                    ref={closeButtonRef}>
                                </button>
                            </div>
                           
                            <form 
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    const enteredOTP = getEnteredOTP();
                                    dispatch(setOtp(enteredOTP))
                                    dispatch(setValidate())
                                }}>
                                <div className="d-flex flex-row justify-content-center mt-3">
                                    <input
                                        ref={inputRefs[0]} 
                                        className={`m-2 text-center form-control rounded ${OTPCSS.input}`} 
                                        name={0} 
                                        type="text" 
                                        maxLength="1" 
                                        onChange={(event) => {
                                            dispatch(handleChange(
                                                {
                                                    name: event.target.name, 
                                                    value: event.target.value,
                                                }
                                            ))
                                        }}
                                        onKeyUp={(event) => focusInput(0, event)}
                                        value={otp[0]}
                                        required />
                                    <input
                                        ref={inputRefs[1]} 
                                        className={`m-2 text-center form-control rounded ${OTPCSS.input}`} 
                                        name={1}
                                        type="text" 
                                        maxLength="1"
                                        onChange={(event) => {
                                            dispatch(handleChange(
                                                {
                                                    name: event.target.name, 
                                                    value: event.target.value,                          
                                                }
                                            )) 
                                        }}
                                        onKeyUp={(event) => focusInput(1, event)}
                                        value={otp[1]} 
                                        required />
                                    <input
                                        ref={inputRefs[2]}  
                                        className={`m-2 text-center form-control rounded ${OTPCSS.input}`}  
                                        name={2} 
                                        type="text" 
                                        maxLength="1"
                                        onChange={(event) => {
                                            dispatch(handleChange(
                                                {
                                                    name: event.target.name, 
                                                    value: event.target.value,                           
                                                }
                                            ))
                                        }}
                                        onKeyUp={(event) => focusInput(2, event)}
                                        value={otp[2]} 
                                        required />
                                    <input 
                                        ref={inputRefs[3]} 
                                        className={`m-2 text-center form-control rounded ${OTPCSS.input}`}  
                                        name={3} 
                                        type="text"
                                        maxLength="1"
                                        onChange={(event) => {
                                            dispatch(handleChange(
                                                {
                                                    name: event.target.name, 
                                                    value: event.target.value,                         
                                                }
                                            ))
                                        }}
                                        onKeyUp={(event) => focusInput(3, event)}
                                        value={otp[3]} 
                                        required />
                                </div>
                                {errorMsg && <div className={OTPCSS.errorMsg}>Entered otp is invalid</div>}
                                <div className="mt-3 text-center pb-2">
                                    <button 
                                        className={`btn px-3 w-50 ${OTPCSS.validateBtn}`}
                                        disabled={isLoading && true} 
                                    >Validate
                                    </button>
                                </div>
                                {isLoading && 
                                    <div className={OTPCSS.loadingDiv}>
                                        <img src={Loading} className={OTPCSS.loading} alt="loading"/>
                                    </div>
                                }
                            </form>
                            {/* {validate == false && <p className={OTPCSS.error}> Invalid OTP</p>} */}
                            {seconds === 0 && window.location.reload()}
                            <p 
                                className={OTPCSS.time}>
                                {seconds >= 10 ? `00:${seconds}` : `00:0${seconds}`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}