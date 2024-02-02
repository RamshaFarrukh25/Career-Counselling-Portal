import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
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
    },
    isSave: null
}

// API THAT Saves Review
const apiUrl = "http://127.0.0.1:8000/saveReviews";


export const saveReviews = createAsyncThunk('reviewsSlice/saveReviews', async ({reviewsForm,user_id}) => {
    try{
      const response = await axios.post(apiUrl, {reviewsForm,user_id} );
      return response.data;
    } 
    catch (error) {
      throw error;
    }
});

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
        },
        clearReview: (state) => {
            state.reviewsForm = {
                name: "",
                email: "",
                comments: ""
            }
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(saveReviews.pending, (state) => {
            console.log("reviews pending");
          })
          .addCase(saveReviews.fulfilled, (state) => {
            console.log("reviews saved successfully");
            state.isSave = true
          })
          .addCase(saveReviews.rejected, (state) => {
            console.log("reviews rejected");
            state.isSave = false
          });
    },
})


export const{handleChange, 
            setShowReviewForm, 
            setChangeReviewImage, 
            setChangeRatingImage,
            setRating, clearReview} = reviewsSlice.actions
export default reviewsSlice.reducer