import { configureStore } from "@reduxjs/toolkit"
import signupReducer from "./features/signup/signupSlice"
import loginReducer from "./features/login/loginSlice"
import reviewsReducer from "./features/reviews/reviewsSlice"

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        login: loginReducer,
        reviews: reviewsReducer
    }
})