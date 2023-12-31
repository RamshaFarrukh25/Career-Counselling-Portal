import OTPCSS from "../assets/styles/OTP.module.css"
import { useDispatch, useSelector } from "react-redux"
import {
    decrementSeconds, 
    handleChange,
    validateOTP,
    clearForm,
} from "../features/otp/otpSlice"
import React from "react"
import { useNavigate } from "react-router-dom"

export default function OTP(){
    const dispatch = useDispatch()
    const { seconds, otp, validate } = useSelector((store) => store.otp)
    const buttonRef = React.useRef()
    const closeButtonRef = React.useRef()
    const inputRefs = [React.useRef(), React.useRef(), React.useRef(), React.useRef()]
    const navigate = useNavigate()

    //The Modal should be closed whenever the component unmounts.
    
    React.useEffect(() => {
        buttonRef.current.click()
        const intervalId = setInterval(() => {
            dispatch(decrementSeconds())
        }, 1000)
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    React.useEffect(() => {
        console.log("I am validate")
        if(validate){
            navigate("/signupSuccess", {replace : true})
        }
    }, [validate])

    function focusInput(index, event) {
        if (index < 3 && event.key !== "Backspace") {
            inputRefs[index + 1].current.focus();
            return
        }
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
                                    dispatch(validateOTP())
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
                                <div className="mt-3 text-center pb-2">
                                    <button 
                                        className={`btn px-3 w-50 ${OTPCSS.validateBtn}`}
                                    >Validate</button>
                                </div>
                            </form>
                            {validate == false && <p className={OTPCSS.error}> Invalid OTP</p>}
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