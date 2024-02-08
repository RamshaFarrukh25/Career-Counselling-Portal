import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    name: "",
    email: "",
    profilePic: "",
}

export const getCounsellorData = createAsyncThunk('counsellorSlice/getCounsellorData', async(id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/getCounsellorData/${id}`)
        return response.data
    } catch(error){
        throw error
    }
})

const counsellorSlice = createSlice({
    name: 'counsellor',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getCounsellorData.pending, (state) => {
                //console.log("getCounsellorData Pending")
            })
            .addCase(getCounsellorData.fulfilled, (state, action) => {
                //console.log("getCounsellorData fulfilled")
                state.name = action.payload.counsellorData.name
                state.email = action.payload.counsellorData.email
                state.profilePic = action.payload.counsellorData.profile_pic
            })
            .addCase(getCounsellorData.rejected, (state, action) => {
                //console.log("getCounsellorData Rejected")
            })
    }
})

export default counsellorSlice.reducer