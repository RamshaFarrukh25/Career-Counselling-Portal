import { configureStore } from "@reduxjs/toolkit"
import signupReducer from "./features/signup/signupSlice"
import otpReducer from "./features/otp/otpSlice"
import loginReducer from "./features/login/loginSlice"
import reviewsReducer from "./features/reviews/reviewsSlice"
import offerCounsellingReducer from "./features/offerCounselling/offerCounsellingSlice"
import askCounsellorReducer from "./features/askCounsellor/askCounsellorSlice"
import blogCardsReducer from "./features/blogCards/blogCardsSlice"
import blogDetailsReducer from "./features/blogCards/blogDetailsSlice"

//Admin Dashboard
import profileReducer from './features/dashboards/admin/profile/profileSlice'
import userReportReducer from './features/dashboards/admin/userReport/userReportSlice'

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        login: loginReducer,
        otp: otpReducer,
        reviews: reviewsReducer,
        offerCounselling: offerCounsellingReducer,
        askCounsellor: askCounsellorReducer,
        blogsCard: blogCardsReducer,
        blogDetails: blogDetailsReducer,
        //Admin Dashboard
        profile:profileReducer,
        userReport: userReportReducer
    }
})