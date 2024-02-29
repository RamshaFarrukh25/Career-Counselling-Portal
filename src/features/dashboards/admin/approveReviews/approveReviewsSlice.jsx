import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
  rows: [],
  selectedRow: null,
  deleteConfirmationOpen: false,
  approveModalOpen: false
}

// API THAT GETS ALL UNAPPROVED REVIEWS
const apiUrl = "http://127.0.0.1:8000/getUnapprovedReviews";

export const getUnapprovedReviews = createAsyncThunk('approveReviewsSlice/getUnapprovedReviews', async() =>{
  try{
      const response = await axios.get(apiUrl);
      return response.data;
  }
  catch (error){
      throw error;
  }
});

// API THAT DELETES A SINGLE REVIEW BY ID
const  deleteUrl = "http://127.0.0.1:8000/deleteReview"

export const  deleteReview = createAsyncThunk("approveReviewsSlice/deleteReview",async(selectedRow)=>{
  try{
      const response = await axios.post(deleteUrl, selectedRow)
      return response.data;
  }
  catch (error){
      throw error;
  }
});

// API THAT APPROVES REVIEW BY ID
const approveURL = "http://127.0.0.1:8000/approveReview"

export const approveReview =  createAsyncThunk("approveReviewsSlice/approveReview", async(selectedRow) => {
    try{
        const response = await axios.put(approveURL, selectedRow)
        return response.data;
    }
    catch (error){
        throw error;
    }
});

const ApproveReviewsSlice = createSlice({
    name: "approveReviews",
    initialState,
    reducers: {
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload;
        },
        handleDeleteReview: (state, action) => {
            state.deleteConfirmationOpen = action.payload;
        },
        handleConfirmDelete: (state) => {
            if (state.selectedRow !== null) {
                const updatedRows = state.rows.filter((row) => row.id !== state.selectedRow);
                state.rows = updatedRows;
                state.selectedRow = null;
            }
        },
        handleCancelDelete: (state) => {
            state.deleteConfirmationOpen = false;
        },
        handleApproveModal: (state, action) => {
            state.approveModalOpen = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getUnapprovedReviews.pending, (state) => {
            // console.log("reviews data pending");
          })
          .addCase(getUnapprovedReviews.fulfilled, (state,action) => {
            // console.log("reviews data recieved")
            state.rows = action.payload.unapprovedReviews
          })
          .addCase(getUnapprovedReviews.rejected, (state) => {
            // console.log("reviews data rejected");
          })
          .addCase(deleteReview.pending, (state) => {
            // console.log("delete review pending");
          })
          .addCase(deleteReview.fulfilled, (state) => {
            // console.log("review delete request recieved")
          })
          .addCase(deleteReview.rejected, (state) => {
            // console.log("reviews delete rejected");
          })
          .addCase(approveReview.pending, (state) => {
            // console.log("approve review pending");
          })
          .addCase(approveReview.fulfilled, (state) => {
            // console.log("approve review request recieved");
          })
          .addCase(approveReview.rejected, (state) => {
            // console.log("reviews approval rejected");
          })
    },
})

export const { setSelectedRow, handleDeleteReview, handleConfirmDelete, handleCancelDelete, handleApproveModal } = ApproveReviewsSlice.actions;
export default ApproveReviewsSlice.reducer;