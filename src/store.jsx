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

//Counsellor Dashboard
import counsellorReducer from "./features/dashboards/counsellor/counsellorSlice"
import counsellorDashboardReducer from "./features/dashboards/counsellor/dashboardSlice"
import counsellorProfileReducer from "./features/dashboards/counsellor/counsellorProfileSlice"
import addBlogReducer from "./features/dashboards/counsellor/addBlogSlice"
import showBlogsReducer from "./features/dashboards/counsellor/showBlogsSlice"
import settingsReducer from "./features/dashboards/counsellor/settingsSlice"

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
        //Counsellor Dashboard
        counsellor: counsellorReducer,
        counsellorDashboard: counsellorDashboardReducer,
        counsellorProfile: counsellorProfileReducer,
        addBlog: addBlogReducer,
        showBlogs: showBlogsReducer,
        settings: settingsReducer,
    }
})