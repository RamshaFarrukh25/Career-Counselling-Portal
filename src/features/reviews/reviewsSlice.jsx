import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import RatingLogo from "../../assets/images/Reviews_RatingLogo.png"
import RevLogoA from "../../assets/images/Reviews_reviewColored.png"



const initialState = {
    showReviewForm: true, // State to track which form to show
    changeReviewImage: RevLogoA,
    changeRatingImage: RatingLogo,
    latestReviews: "",
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
    isSave: null,
    counsellorList: ""
}

// API THAT Saves Review
const apiUrl = "http://127.0.0.1:8000/saveReviews";



// export const saveReviews = createAsyncThunk('reviewsSlice/saveReviews', async ({reviewsForm}) => {
//     try{
//       const response = await axios.post(apiUrl, {reviewsForm} );
      
//       const channel = pusher.subscribe('Career_Counselling_portal-development');
//       console.log(channel)
//       channel.bind('demo', function(data) {
//         console.log(data)
//         alert(JSON.stringify(data));
//       });
//       return response.data;
//     } 
//     catch (error) {
//       throw error;
//     }
// });


export const saveReviews = createAsyncThunk('reviewsSlice/saveReviews', async ({ reviewsForm }) => {
  try {
    const response = await axios.post(apiUrl, { reviewsForm });

    return response.data;
  } catch (error) {
    throw error;
  }
});

// API THAT GETS LATEST REVIEWS
const  getLatestReviewsApi = "http://127.0.0.1:8000/getReviews";


export const getReviews = createAsyncThunk('reviewsSlice/getReviews', async() =>{
    try{
        const response = await axios.get(getLatestReviewsApi);
        return response.data;
    }
    catch (error){
        throw error;
    }
});

// API THAT GETS COUNSELLORS LIST
const getApiUrl = "http://127.0.0.1:8000/getCounsellorsByUID";

export const getCounsellorsByUID = createAsyncThunk("reviewsSlice/getCounsellorsByUID", async ()=>{
    try{
        const response = await axios.get(getApiUrl);
        return response.data;
    }
    catch (error) {
        throw error;
    }
});

// API THAT SAVES RATINGS
const saveRatingsAPI = "http://127.0.0.1:8000/saveRatings";


export const saveRatings = createAsyncThunk('reviewsSlice/saveRatings', async ({reviewsForm}) => {
    try{
      const response = await axios.post(saveRatingsAPI, {reviewsForm} );
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
        },
        clearRatings: (state) => {
            state.reviewsForm = {
                selectedOption: "",
                counsellorReview: "",
                rating: 0
            }
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(saveReviews.pending, (state) => {
            //console.log("reviews pending");
          })
          .addCase(saveReviews.fulfilled, (state) => {
            //console.log("reviews saved successfully");
            state.isSave = true
          })
          .addCase(saveReviews.rejected, (state) => {
            //console.log("reviews rejected");
            state.isSave = false
          })
          .addCase(getReviews.pending, (state) => {
            //console.log("latest reviews pending");
          })
          .addCase(getReviews.fulfilled, (state,action) => {
            //console.log("latest reviews recieved")
            state.latestReviews = action.payload.reviewsData
          })
          .addCase(getReviews.rejected, (state) => {
            //console.log("latest reviews rejected");
          })
          .addCase(getCounsellorsByUID.pending, (state) => {
            //console.log("counsellors list pending");
          })
          .addCase(getCounsellorsByUID.fulfilled, (state,action) => {
            //console.log("counsellors list recieved")
            state.counsellorList = action.payload.counsellorsList
            //console.log("counsellors: ", state.counsellorList)
          })
          .addCase(getCounsellorsByUID.rejected, (state) => {
            //console.log("counsellors list rejected");
          })
          .addCase(saveRatings.pending, (state) => {
            //console.log("ratings pending");
          })
          .addCase(saveRatings.fulfilled, (state) => {
            //console.log("ratings saved successfully");
            state.isSave = true
          })
          .addCase(saveRatings.rejected, (state) => {
            //console.log("ratings rejected");
            state.isSave = false
          })
    },
})


export const{handleChange, 
            setShowReviewForm, 
            setChangeReviewImage, 
            setChangeRatingImage,
            setRating, clearReview,
            clearRatings} = reviewsSlice.actions
export default reviewsSlice.reducer