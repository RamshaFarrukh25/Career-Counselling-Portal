import { configureStore } from "@reduxjs/toolkit"
import signupReducer from "./features/signup/signupSlice"
import otpReducer from "./features/otp/otpSlice"
import loginReducer from "./features/login/loginSlice"


export const store = configureStore({
    reducer: {
        signup: signupReducer,
        otp: otpReducer,
        login: loginReducer
    }
})