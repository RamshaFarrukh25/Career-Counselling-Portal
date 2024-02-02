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
    }
}

// API THAT Saves Review
const apiUrl = "http://127.0.0.1:8000/saveReviews";


export const saveReviews = createAsyncThunk('reviewsSlice/saveReviews', async (reviewsData) => {
    try {
      const response = await axios.post(apiUrl, {'reviewsData':reviewsData} );
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
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(saveReviews.pending, (state) => {
            console.log("reviews pending");
          })
          .addCase(saveReviews.fulfilled, (state) => {
            console.log("reviews saved successfully");
          })
          .addCase(saveReviews.rejected, (state) => {
            console.log("reviews rejected");
          });
    },
})


export const{handleChange, 
            setShowReviewForm, 
            setChangeReviewImage, 
            setChangeRatingImage,
            setRating} = reviewsSlice.actions
export default reviewsSlice.reducer