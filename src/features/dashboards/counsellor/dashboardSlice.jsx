import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    approvedBlogs: null,
    pendingApprovalBlogs: null,
    averageRating: null
}

export const getCounsellorCardsData = createAsyncThunk('dashboardSlice/getCounsellorCardsData', async() => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/getCounsellorCardsData")
        return response.data
    } catch(error){
        throw error
    }
})

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getCounsellorCardsData.pending, (state) => {
                //console.log("getCounsellorCardsData Pending")
            })
            .addCase(getCounsellorCardsData.fulfilled, (state, action) => {
                //console.log("getCounsellorCardsData fulfilled")
                state.approvedBlogs = action.payload.counsellorCards.approvedBlogs
                state.pendingApprovalBlogs = action.payload.counsellorCards.pendingApprovalBlogs
                state.averageRating = action.payload.counsellorCards.averageRating
            })
            .addCase(getCounsellorCardsData.rejected, (state, action) => {
                //console.log("getCounsellorCardsData Rejected")
            })
    }
})

export default dashboardSlice.reducer