import { configureStore } from "@reduxjs/toolkit"
import signupReducer from "./features/signup/signupSlice"
import otpReducer from "./features/otp/otpSlice"
import headerReducer from "./features/header/headerSlice"
import loginReducer from "./features/login/loginSlice"
import reviewsReducer from "./features/reviews/reviewsSlice"
import offerCounsellingReducer from "./features/offerCounselling/offerCounsellingSlice"
import askCounsellorReducer from "./features/askCounsellor/askCounsellorSlice"
import blogCardsReducer from "./features/blogCards/blogCardsSlice"
import blogDetailsReducer from "./features/blogCards/blogDetailsSlice"
import authenticationReducer from "./features/authentication/authenticationSlice"

//Counsellor Dashboard
import counsellorReducer from "./features/dashboards/counsellor/counsellorSlice"
import counsellorDashboardReducer from "./features/dashboards/counsellor/dashboardSlice"
import counsellorProfileReducer from "./features/dashboards/counsellor/counsellorProfileSlice"
import addBlogReducer from "./features/dashboards/counsellor/addBlogSlice"
import showBlogsReducer from "./features/dashboards/counsellor/showBlogsSlice"
import settingsReducer from "./features/dashboards/counsellor/settingsSlice"

//Admin Dashboard
import profileReducer from './features/dashboards/admin/profile/profileSlice'
import dashboardReducer from './features/dashboards/admin/adminDashboard/dashboardSlice'
import userReportReducer from './features/dashboards/admin/userReport/userReportSlice'
import approveCounsellorsReportReducer from './features/dashboards/admin/counsellorsReport/counsellorsReportSlice'
import approveReviewsReducer from './features/dashboards/admin/approveReviews/approveReviewsSlice'
import approveBlogsReducer from "./features/dashboards/admin/approveBlogs/approveBlogsSlice"
import approveCounsellorsReducer from "./features/dashboards/admin/approveCounsellors/approveCounsellorsSlice"

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        login: loginReducer,
        otp: otpReducer,
        header: headerReducer,
        reviews: reviewsReducer,
        offerCounselling: offerCounsellingReducer,
        askCounsellor: askCounsellorReducer,
        blogsCard: blogCardsReducer,
        blogDetails: blogDetailsReducer,
        authentication: authenticationReducer,
        //Counsellor Dashboard
        counsellor: counsellorReducer,
        counsellorDashboard: counsellorDashboardReducer,
        counsellorProfile: counsellorProfileReducer,
        addBlog: addBlogReducer,
        showBlogs: showBlogsReducer,
        settings: settingsReducer,
        //Admin Dashboard
        profile:profileReducer,
        dashboard:dashboardReducer,
        userReport: userReportReducer,
        approveReviews: approveReviewsReducer,
        approveBlogs: approveBlogsReducer,
        approveCounsellors:approveCounsellorsReducer,
        approveCounsellorsReport:approveCounsellorsReportReducer
        
    }
})