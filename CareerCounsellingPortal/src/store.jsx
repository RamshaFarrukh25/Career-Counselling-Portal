import { configureStore } from "@reduxjs/toolkit"
import signupReducer from "./features/signup/signupSlice"
import otpReducer from "./features/otp/otpSlice"
import loginReducer from "./features/login/loginSlice"
import reviewsReducer from "./features/reviews/reviewsSlice"
import offerCounsellingReducer from "./features/offerCounselling/offerCounsellingSlice"
import profileReducer from './features/dashboards/admin/profile/profileSlice'
import blogCardsReducer from "./features/blogCards/blogCardsSlice"
import blogDetailsReducer from "./features/blogCards/blogDetailsSlice"

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        login: loginReducer,
        otp: otpReducer,
        reviews: reviewsReducer,
        offerCounselling: offerCounsellingReducer,
        profile:profileReducer,
        blogsCard:blogCardsReducer,
        blogDetails:blogDetailsReducer
        
    }
})