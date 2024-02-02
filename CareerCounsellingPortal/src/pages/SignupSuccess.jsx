import React from "react"
import SuccessCSS from "../assets/styles/SignupSuccess.module.css"
import TickMark from "../assets/images/SignupSuccess_TickMark.gif"

export default function SignupSuccess(){
    return (
        <>
            <div className={SuccessCSS.thanksContainer}>
                <h1 className={SuccessCSS.thanksHeading}>THANK YOU!</h1>
                <div className={SuccessCSS.thanksDiv}>
                    <img className={SuccessCSS.checkMark} src={TickMark} alt=""/>
                    <p className={SuccessCSS.thanksParagraph}>
                        Thank you for registering. After verification, a confirmation email will be sent to you. Stay Tuned.
                    </p>
                </div>
            </div>
        </>
    )
}