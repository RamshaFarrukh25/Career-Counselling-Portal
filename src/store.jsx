import { configureStore } from "@reduxjs/toolkit"
import signupReducer from "./features/signup/signupSlice"
import loginReducer from "./features/login/loginSlice"
import offerCounsellingReducer from "./features/offerCounselling/offerCounsellingSlice"

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        login: loginReducer,
        offerCounselling: offerCounsellingReducer
    }
})