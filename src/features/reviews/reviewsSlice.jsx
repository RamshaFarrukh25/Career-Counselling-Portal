import { createSlice } from "@reduxjs/toolkit"
import RatingLogo from "../../assets/images/Reviews_RatingLogo.png"
import RevLogoA from "../../assets/images/Reviews_reviewColored.png"


const initialState = {
    showReviewForm: true, // State to track which form to show
    changeReviewImage: RevLogoA,
    changeRatingImage: RatingLogo,
    reviewsForm: {
        name: "",
        email: "",
        comments: ""
    },
    ratingForm: {
        selectedOption: "",
        counsellorReview: "",
        rating: 0
    }
}

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        handleChange: (state, {payload}) => {
            state.reviewsForm= {
                ...state.reviewsForm,
                [payload.name]: payload.value
            }
        },
        handleSubmit: (state) => {
            console.log(state.reviewsForm)
        },
        setShowReviewForm: (state, action) => {
            state.showReviewForm = action.payload;
        },
        setRating: (state, {payload}) => {
            state.ratingForm.rating = {
                ...state.ratingForm.rating,
                [payload.name]: payload.value
            }
        },
        setChangeReviewImage: (state,action) => {
            state.changeReviewImage = action.payload
        },
        setChangeRatingImage: (state,action) => {
            state.changeRatingImage = action.payload;
        }
    }
})


export const{handleChange, 
            handleSubmit, 
            setShowReviewForm, 
            setChangeReviewImage, 
            setChangeRatingImage,
            setRating} = reviewsSlice.actions
export default reviewsSlice.reducer