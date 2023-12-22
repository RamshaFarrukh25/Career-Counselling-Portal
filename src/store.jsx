import { configureStore } from "@reduxjs/toolkit"
import signupReducer from "./features/signup/signupSlice"
import otpReducer from "./features/otp/otpSlice"
import loginReducer from "./features/login/loginSlice"
import offerCounsellingReducer from "./features/offerCounselling/offerCounsellingSlice"


export const store = configureStore({
    reducer: {
        signup: signupReducer,
        otp: otpReducer,
        login: loginReducer,
        offerCounselling: offerCounsellingReducer
    }
})